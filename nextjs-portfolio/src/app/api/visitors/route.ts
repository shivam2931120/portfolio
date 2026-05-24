import { createHash, randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { countVisitor, getVisitorTotal } from "@/lib/visitorCounter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE_NAME = "portfolio_visitor_id";
const VISITOR_ID_PATTERN = /^[a-zA-Z0-9_-]{16,128}$/;
const ONE_YEAR = 60 * 60 * 24 * 365;

function normalizeVisitorId(visitorId: unknown) {
  if (typeof visitorId !== "string") {
    return null;
  }

  const trimmed = visitorId.trim();
  return VISITOR_ID_PATTERN.test(trimmed) ? trimmed : null;
}

function hashVisitorId(visitorId: string) {
  return createHash("sha256").update(visitorId).digest("hex");
}

function createUnavailableResponse() {
  return NextResponse.json(
    {
      success: false,
      total: null,
      message: "Visitor counter storage is not configured.",
    },
    {
      status: 503,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

function setVisitorCookie(response: NextResponse, visitorId: string) {
  response.cookies.set(COOKIE_NAME, visitorId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_YEAR,
    path: "/",
  });
}

async function readVisitorId(request: NextRequest) {
  const cookieVisitorId = normalizeVisitorId(request.cookies.get(COOKIE_NAME)?.value);

  if (cookieVisitorId) {
    return cookieVisitorId;
  }

  const body = await request.json().catch(() => null);
  const bodyVisitorId = normalizeVisitorId(body?.visitorId);

  return bodyVisitorId ?? randomUUID();
}

export async function GET() {
  try {
    const result = await getVisitorTotal();

    return NextResponse.json(
      {
        success: true,
        total: result.total,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Visitor counter read failed:", error);
    return createUnavailableResponse();
  }
}

export async function POST(request: NextRequest) {
  try {
    const visitorId = await readVisitorId(request);
    const result = await countVisitor(hashVisitorId(visitorId));

    const response = NextResponse.json(
      {
        success: true,
        total: result.total,
        counted: result.counted ?? false,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    setVisitorCookie(response, visitorId);

    return response;
  } catch (error) {
    console.error("Visitor counter update failed:", error);
    return createUnavailableResponse();
  }
}
