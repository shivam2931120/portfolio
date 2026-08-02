import { aboutParagraphs, personalInfo, projects, skills } from "@/lib/data";

function Prompt({ children }: { children: React.ReactNode }) {
  return <div className="prompt"><span>shivam@portfolio</span><b> ~/dev $</b> {children}</div>;
}

function SectionRule() {
  return <div className="section-rule" aria-hidden="true" />;
}

export default function Home() {
  return (
    <>
      <div className="crt-overlay" aria-hidden="true" />
      <div className="terminal-window">
        <header className="terminal-bar">
          <div className="traffic-lights" aria-hidden="true"><i /><i /><i /></div>
          <div className="terminal-path"><strong>shivam</strong><span>@portfolio: ~/dev</span></div>
          <nav className="terminal-nav" aria-label="Primary navigation">
            <a href="#work">~/work</a><a href="#stack">~/stack</a><a href="#contact">~/contact</a>
          </nav>
          <div className="availability"><i /> available for work</div>
        </header>

        <main className="terminal-content">
          <section className="hero" id="top">
            <Prompt>whoami --full</Prompt>
            <h1 className="name-banner">{personalInfo.name.toUpperCase()}<span className="cursor">_</span></h1>
            <p className="role"><span>&gt;</span> {personalInfo.title} <em>&amp; builder</em></p>
            <div className="intro">
              {aboutParagraphs.slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="meta-checks"><span>[x] based in India / UTC+5:30</span><span>[x] shipping since 2020</span><span>[x] open to select work</span></div>
            <div className="command-actions"><a className="command-button primary" href="#work">$ ls ~/projects <span>-&gt;</span></a><a className="command-button" href="#contact">./contact --hire</a></div>
          </section>

          <SectionRule />
          <section className="section" id="about">
            <Prompt>neofetch</Prompt>
            <div className="neo-panel">
              <div className="avatar-panel"><pre>{`       .----.\n      /      \\\n     |  0  0  |\n     |   __   |\n      \\______/\n       /|  |\\\n      /_|__|_\\\n         /\\`}</pre><span>shivam@dev</span></div>
              <div className="identity"><div className="identity-title">shivam@portfolio <span>----------------</span></div><dl>
                <div><dt>OS</dt><dd>Human v10.4 (engineer build)</dd></div><div><dt>Host</dt><dd>Remote, India</dd></div>
                <div><dt>Role</dt><dd>Full-stack developer</dd></div><div><dt>Uptime</dt><dd>3+ years, many shipped</dd></div>
                <div><dt>Shell</dt><dd>zsh, nvim, tmux</dd></div><div><dt>Stack</dt><dd>Python, JS, React, Next</dd></div>
                <div><dt>Focus</dt><dd>products with useful edges</dd></div><div><dt>Status</dt><dd className="amber">available for select work</dd></div>
              </dl><div className="swatches">{["#39ff7a", "#2bbf5c", "#1c7a3c", "#5f8d68", "#eafff1", "#ffd24a", "#143614", "#070b07"].map((color) => <i key={color} style={{ background: color }} />)}</div></div>
            </div>
          </section>

          <SectionRule />
          <section className="section" id="work">
            <Prompt>ls -la ~/projects <small># selected work</small></Prompt>
            <div className="section-kicker">&gt; selected work</div><h2>Things I built and shipped <span>// drwxr-xr-x</span></h2>
            <div className="project-grid">{projects.map((project) => <article className="project-card" key={project.title}>
              <div className="project-top"><h3>{project.title.toLowerCase().replaceAll(" ", "-")}<span>/</span></h3><div className="project-meta"><code>-rwxr-xr-x</code></div></div>
              <p>{project.description}</p><div className="tags">{project.techStack.map((tech) => <span key={tech}>{tech}</span>)}<span className="amber-tag">open source</span></div>
              <div className="project-links">{project.link && <a href={project.link} target="_blank" rel="noreferrer">-&gt; live demo</a>}<a href={project.github} target="_blank" rel="noreferrer">-&gt; source</a></div>
            </article>)}</div>
          </section>

          <SectionRule />
          <section className="section" id="stack"><Prompt>cat stack.txt | sort -r</Prompt><div className="section-kicker">&gt; stack</div><h2>The tools I reach for <span>// always learning, always shipping</span></h2>
            <div className="skills-panel toolbox-panel">{skills.map((skill, index) => <div className="tool-item" key={skill.name}><span className="tool-index">[{String(index + 1).padStart(2, "0")}]</span><img src={skill.icon} alt="" /><span>{skill.name}</span><b>-&gt;</b></div>)}</div>
          </section>

          <SectionRule />
          <section className="contact-section" id="contact"><Prompt>./contact --hire</Prompt><div className="contact-panel"><h2>Let&apos;s build <span>something together.</span></h2><p>Have a useful idea, a tricky problem, or a product that needs shipping?</p><a className="mail-command" href={`mailto:${personalInfo.email}`}>$ mail {personalInfo.email}<i className="cursor-block" /></a><div className="social-pills"><a href={personalInfo.github} target="_blank" rel="noreferrer">-&gt; github</a><a href={personalInfo.linkedin} target="_blank" rel="noreferrer">-&gt; linkedin</a><a href={personalInfo.leetcode} target="_blank" rel="noreferrer">-&gt; leetcode</a><a href={personalInfo.resume} target="_blank" rel="noreferrer">-&gt; CV.pdf</a></div></div></section>

          <footer><div>$ echo &quot;(c) 2026 Shivam, built in the terminal, shipped fast&quot; <i className="cursor-block small" /></div><span>last commit: 2026-05-25 01:06 IST, main@933641b, uptime 99.98%</span></footer>
        </main>
      </div>
    </>
  );
}
