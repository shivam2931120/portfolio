import { promises as fs } from "fs";
import path from "path";

const VISITOR_SET_KEY = "portfolio:visitors:v1";
const LOCAL_COUNTER_PATH = path.join(process.cwd(), ".visitor-counter.json");

type CounterResult = {
  total: number;
  counted?: boolean;
  source: "upstash" | "local-file";
};

type RedisResponse<T = unknown> = {
  result?: T;
  error?: string;
};

type LocalCounterData = {
  visitors: string[];
};

let localWriteQueue = Promise.resolve();

function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return { url, token };
}

async function upstashCommand<T>(command: Array<string | number>): Promise<T> {
  const config = getUpstashConfig();

  if (!config) {
    throw new Error("Visitor counter storage is not configured.");
  }

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  const payload = (await response.json()) as RedisResponse<T>;

  if (!response.ok || payload.error) {
    throw new Error(payload.error || "Visitor counter storage request failed.");
  }

  return payload.result as T;
}

async function upstashPipeline(commands: Array<Array<string | number>>): Promise<RedisResponse[]> {
  const config = getUpstashConfig();

  if (!config) {
    throw new Error("Visitor counter storage is not configured.");
  }

  const response = await fetch(`${config.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });

  const payload = (await response.json()) as RedisResponse[];

  if (!response.ok) {
    throw new Error("Visitor counter storage request failed.");
  }

  const failedCommand = payload.find((item) => item.error);
  if (failedCommand?.error) {
    throw new Error(failedCommand.error);
  }

  return payload;
}

async function readLocalCounter(): Promise<LocalCounterData> {
  try {
    const raw = await fs.readFile(LOCAL_COUNTER_PATH, "utf8");
    const parsed = JSON.parse(raw) as LocalCounterData;

    if (!Array.isArray(parsed.visitors)) {
      return { visitors: [] };
    }

    return {
      visitors: parsed.visitors.filter((visitor) => typeof visitor === "string"),
    };
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") {
      return { visitors: [] };
    }

    throw error;
  }
}

async function writeLocalCounter(data: LocalCounterData) {
  const tempPath = `${LOCAL_COUNTER_PATH}.tmp`;
  await fs.writeFile(tempPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  await fs.rename(tempPath, LOCAL_COUNTER_PATH);
}

async function withLocalCounterLock<T>(operation: () => Promise<T>): Promise<T> {
  const nextOperation = localWriteQueue.then(operation, operation);

  localWriteQueue = nextOperation.then(
    () => undefined,
    () => undefined
  );

  return nextOperation;
}

async function countLocalVisitor(visitorHash: string): Promise<CounterResult> {
  return withLocalCounterLock(async () => {
    const data = await readLocalCounter();
    const visitors = new Set(data.visitors);
    const sizeBefore = visitors.size;

    visitors.add(visitorHash);

    const nextData = { visitors: Array.from(visitors).sort() };
    await writeLocalCounter(nextData);

    return {
      total: nextData.visitors.length,
      counted: visitors.size > sizeBefore,
      source: "local-file",
    };
  });
}

async function getLocalVisitorTotal(): Promise<CounterResult> {
  const data = await readLocalCounter();
  return {
    total: new Set(data.visitors).size,
    source: "local-file",
  };
}

function shouldUseLocalCounter() {
  return !getUpstashConfig() && process.env.NODE_ENV !== "production";
}

export async function countVisitor(visitorHash: string): Promise<CounterResult> {
  if (getUpstashConfig()) {
    const results = await upstashPipeline([
      ["SADD", VISITOR_SET_KEY, visitorHash],
      ["SCARD", VISITOR_SET_KEY],
    ]);

    return {
      total: Number(results[1].result ?? 0),
      counted: Number(results[0].result ?? 0) === 1,
      source: "upstash",
    };
  }

  if (shouldUseLocalCounter()) {
    return countLocalVisitor(visitorHash);
  }

  throw new Error("Visitor counter storage is not configured.");
}

export async function getVisitorTotal(): Promise<CounterResult> {
  if (getUpstashConfig()) {
    return {
      total: Number(await upstashCommand<number>(["SCARD", VISITOR_SET_KEY])),
      source: "upstash",
    };
  }

  if (shouldUseLocalCounter()) {
    return getLocalVisitorTotal();
  }

  throw new Error("Visitor counter storage is not configured.");
}
