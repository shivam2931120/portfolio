

export const personalInfo = {
  name: "Shivam",
  title: "Full Stack Developer",
  email: "shivam.bgp@outlook.com",
  linkedin: "https://www.linkedin.com/in/shivam-28bbb92ab/",
  github: "https://github.com/shivam2931120",
  githubUsername: "shivam2931120",
  leetcode: "https://leetcode.com/u/Shivam2931120/",
  resume: "https://drive.google.com/file/d/1O6JwA4_Au20Tom0m0liYf4T1nzDqwGSE/view",
};


/* ================= SKILLS ================= */

export const skills = [
  { name: "Bash", icon: "/images/bash.svg" },
  { name: "Python", icon: "/images/python.png" },
  { name: "C++", icon: "/images/cpp.png" },
  { name: "Java", icon: "/images/java.png" },
  { name: "C", icon: "/images/c.png" },
  { name: "MySQL", icon: "/images/mysql.png" },
  { name: "MongoDB", icon: "/images/mongo.svg" },
  { name: "JavaScript", icon: "/images/js.png" },
  { name: "Node.js", icon: "/images/nodejs.png" },
  { name: "React", icon: "/images/react.png" },
  { name: "HTML", icon: "/images/html.png" },
  { name: "CSS", icon: "/images/css.png" },
  { name: "Flask", icon: "/images/flask.svg" },
  { name: "PostgreSQL", icon: "/images/postgresql.svg" },
  { name: "Clerk", icon: "/images/clerk.svg" },
  { name: "Next.js", icon: "/next.svg" },
];


/* ================= ABOUT ================= */

export const aboutParagraphs = [
  "With a strong foundation in multiple programming languages, including C, C++, Python, Java, Ruby, and JavaScript, I possess the versatility to tackle a wide range of software development challenges. My experience spans from low-level systems programming to high-level web applications, allowing me to choose the best tools for each project.",

  "As a skilled front-end developer proficient in HTML, CSS, and React, I excel at creating responsive and user-friendly interfaces. My passion for design and functionality ensures that I deliver visually appealing applications that enhance user experience while adhering to modern web standards.",
];


/* ================= CERTIFICATIONS ================= */

export const certifications = [
  { name: "Programming with JavaScript", image: "/images/jsc.png" },
  { name: "React Basics", image: "/images/reactc.png" },
  { name: "Node.js & MongoDB", image: "/images/node.png" },
  { name: "Data Science with Python", image: "/images/ds.png" },
  { name: "HTML", image: "/images/htmlc.png" },
  { name: "Python3", image: "/images/Python 3.jpeg" },
  { name: "JAVA", image: "/images/javac.png" },
  { name: "Python Advanced", image: "/images/Python Advanced.jpeg" },
  { name: "Computer Vision", image: "/images/Computer Vision.jpeg" },
  { name: "C Programming", image: "/images/C.jpg" },
  { name: "Flask Using Python", image: "/images/Flask Using Python.jpg" },
  { name: "Django", image: "/images/Django.jpg" },
];


/* ================= PROJECTS ================= */

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  tag?: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
  links?: ProjectLink[];
};

export const projects: Project[] = [
  {
    title: "Cross-Market Disclosure Analysis",
    tag: "Major Project",
    description:
      "A full-stack financial research dashboard that compares US SEC and Indian NSE/BSE corporate disclosures. It combines FastAPI, Next.js, Supabase pgvector retrieval, Gemini embeddings, and Groq-powered extraction, sentiment, risk, ratio, and chat workflows across matched companies.",

    techStack: ["Next.js", "Python", "PostgreSQL", "React"],

    link: "https://major-project-new-plum.vercel.app",
    github: "https://github.com/Hrudai-Nirmal/MajorProject-new",
  },

  {
    title: "Hybrid CNN + Transformer Object Detection",
    tag: "Major Project",
    description:
      "A lightweight autonomous-driving object-detection project using the KITTI dataset. It compares a CNN-only baseline with a CNN + Transformer detector, adds confidence-based refinement for uncertain detections, and evaluates both models with mAP@0.5.",

    techStack: ["Python"],

    github: "https://github.com/shivam2931120/MajorProject",
  },

  {
    title: "Nexus",
    description:
      "A connected team workspace that brings communication, project and task management, documents, meetings, and shared workflows into one platform. Its Phase 1 vertical slice includes a Spring Boot modular backend, organization-scoped PostgreSQL data, JWT authentication, REST chat, WebSocket foundations, and a responsive Next.js shell.",

    techStack: ["Next.js", "React", "Java", "PostgreSQL"],

    link: "https://nexus-nine-drab-77.vercel.app",
    github: "https://github.com/shivam2931120/Nexus",
  },

  {
    title: "BB84 Quantum Messenger",
    tag: "Mini Project",
    description:
      "College mini project: a secure real-time messaging platform featuring end-to-end encryption via a simulated BB84 Quantum Key Distribution protocol, private and group chats, eavesdropping detection, media sharing, read receipts, and live presence.",

    techStack: ["Python", "Flask", "JavaScript", "PostgreSQL"],

    link: "https://bb84-chat.justshivamm.in",
    github: "https://github.com/shivam2931120/bb8_messenger_app",
  },

  {
    title: "SecureVault",
    description:
      "A web application for securely storing and managing encrypted vault items. Built with a security-first architecture, encrypted persistence, authentication, password generation, and a focused desktop vault experience.",

    techStack: ["Next.js", "React", "PostgreSQL"],

    link: "https://securevault.justshivamm.in",
    github: "https://github.com/shivam2931120/SecureVault",
  },
  {
    title: "TheMovie",
    description:
      "A cutting-edge movie discovery and tracking application built with Next.js 16 and React 19. Features AI recommendations using Flask, Scikit-learn. Includes OMDB integration, Clerk auth, and Tailwind + Framer Motion UI.",

    techStack: ["Next.js", "React", "Clerk"],

    link: "https://themovie.justshivamm.in",
    github: "https://github.com/shivam2931120/TheMovie",
  },

  {
    title: "Neo",
    description:
      "Your Personal Voice Assistant for system control, web search, weather, QR generation, screen recording, and monitoring.",

    techStack: ["Python"],

    github: "https://github.com/shivam2931120/Neo",
  },

  {
    title: "Shikshan - College Management System",
    description:
      "Flask-based college ERP system with portals, attendance analytics, fee management, library, and exams.",

    techStack: ["Python", "Flask", "PostgreSQL"],

    link: "https://shikshan.justshivamm.in",
    github: "https://github.com/shivam2931120/sms",
  },

  {
    title: "Attendify",
    description:
      "React-based attendance management app with analytics, timetable, bulk marking, and holiday management.",

    techStack: ["JavaScript", "React", "CSS"],

    link: "https://attendify.justshivamm.in",
    github: "https://github.com/shivam2931120/attendance-tracker",
  },
  {
    title: "EventHub",
    description:
      "A full-stack event management and ticketing platform for organizers and attendees. It supports event publishing, ticket registration, secure QR ticket generation, payment flow tracking, staff check-in dashboards, duplicate scan prevention, and signed ticket token validation backed by PostgreSQL.",

    techStack: ["Next.js", "React", "PostgreSQL"],

    link: "https://eventhub.justshivamm.in",
    github: "https://github.com/shivam2931120/EventHub",
  },
  {
    title: "Editorial",
    description:
      "A realtime collaborative document workspace inspired by Google Docs. It includes rich text editing, shared folders, comments, version history, document search, reusable templates, export flows, and live multi-user editing so teams can draft, review, and organize writing in one place.",

    techStack: ["React", "Node.js", "PostgreSQL"],

    link: "https://editorial.justshivamm.in",
    github: "https://github.com/shivam2931120/realtime_collab",
  },
  {
    title: "UNIX System Utility Toolkit",
    description:
      "A lightweight, modular dashboard for Linux power users. Integrates essential system tools—Process Manager, Network Monitor, Service Control, and Algorithmic Simulators—into a single, easy-to-use graphical interface powered by Zenity. Built to demonstrate the power of shell scripting combined with high performance C modules.",

    techStack: ["Bash", "C", "Zenity"],

    links: [
      {
        label: "Release",
        href: "https://github.com/shivam2931120/unix_mini_project/releases/tag/v1.0.0",
      },
      {
        label: "Ubuntu package",
        href: "https://github.com/shivam2931120/unix_mini_project/releases/download/v1.0.0/unix-utility-suite_1.0.0_amd64.deb",
      },
      {
        label: "Snap package",
        href: "https://github.com/shivam2931120/unix_mini_project/releases/download/v1.0.0/unix-utility-suite_1.0.0_amd64.snap",
      },
      {
        label: "GNOME extension",
        href: "https://github.com/shivam2931120/unix_mini_project/releases/download/v1.0.0/unix-toolkit-launcher@shivam2931120.github.io.shell-extension.zip",
      },
      {
        label: "Flatpak",
        href: "https://github.com/shivam2931120/unix_mini_project/releases/download/v1.0.0/io.github.shivam2931120.UnixToolkitLauncher.flatpak",
      },
    ],
    github: "https://github.com/shivam2931120/unix_mini_project.git",
  },
];



export const techStackIcons: Record<string, string> = {
  Python: "/images/python.png",
  MongoDB: "/images/mongo.svg",
  HTML: "/images/html.png",
  CSS: "/images/css.png",
  JavaScript: "/images/js.png",
  React: "/images/react.png",
  "Node.js": "/images/nodejs.png",
  Flask: "/images/flask.svg",
  PostgreSQL: "/images/postgresql.svg",
  "Next.js": "/next.svg",
  Java: "/images/java.png",
  Clerk: "/images/clerk.svg",
  Bash: "/images/bash.svg",
  C: "/images/c.png",
  Zenity: "/images/zenity.png",
};
