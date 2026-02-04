// Portfolio Data

// ❌ Removed unused Next.js internal import

/* ================= PERSONAL INFO ================= */

export const personalInfo = {
  name: "Shivam",
  title: "Full Stack Developer",
  email: "shivam.bgp@outlook.com",
  linkedin: "https://www.linkedin.com/in/shivam-28bbb92ab/",
  github: "https://github.com/shivam2931120",
  githubUsername: "shivam2931120",
  leetcode: "https://leetcode.com/u/Shivam2931120/",
  resume: "/resume.pdf",
};


/* ================= SKILLS ================= */

export const skills = [
  { name: "Bash", icon: "/images/bash.svg" },
  { name: "Python", icon: "/images/python.png" },
  { name: "C++", icon: "/images/cpp.png" },
  { name: "Java", icon: "/images/java.png" },
  { name: "C", icon: "/images/c.png" },
  { name: "Ruby", icon: "/images/ruby.png" },
  { name: "MySQL", icon: "/images/mysql.png" },
  { name: "PHP", icon: "/images/php.png" },
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

export const projects = [
  {
    title: "BB84 Quantum Messenger",
    tag: "Mini Project",
    description:
      "A secure real-time messaging platform featuring end-to-end encryption via a simulated BB84 Quantum Key Distribution protocol. Key features include secure private and group chats, eavesdropping detection simulation, rich media sharing (files, images, voice notes), read receipts, and real-time user presence. Built with a Flask and Socket.IO backend for low-latency communication, coupled with a responsive, dynamic frontend using vanilla JavaScript and CSS.",

    techStack: ["Python", "Flask", "JavaScript", "PostgreSQL"],

    link: "https://bb84-chat.justshivamm.in",
    github: "https://github.com/shivam2931120/bb8_messenger_app",
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
    title: "UNIX System Utility Toolkit",
    description:
      "A lightweight, modular dashboard for Linux power users. Integrates essential system tools—Process Manager, Network Monitor, Service Control, and Algorithmic Simulators—into a single, easy-to-use graphical interface powered by Zenity. Built to demonstrate the power of shell scripting combined with high performance C modules.",

    techStack: ["Bash", "C", "Zenity"],

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
  Clerk: "/images/clerk.svg",
  Bash: "/images/bash.svg",
  C: "/images/c.png",
  Zenity: "/images/zenity.png",
};

export const playlist = [
  {
    title: "Midnight City",
    artist: "M83",
    spotifyUrl: "https://open.spotify.com/track/1eyzqe2QqGZUmfcPZtrIyt",
  },
  {
    title: "Instant Crush",
    artist: "Daft Punk ft. Julian Casablancas",
    spotifyUrl: "https://open.spotify.com/track/2nG54Y4a3sH9YpfxF4yo2q",
  },
  {
    title: "Nightcall",
    artist: "Kavinsky",
    spotifyUrl: "https://open.spotify.com/track/0U0ldCRmgCqhVvD6ksG63j",
  },
  {
    title: "Resonance",
    artist: "Home",
    spotifyUrl: "https://open.spotify.com/track/1TuopWDIuDi1553081zvuU",
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    spotifyUrl: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",
  },
];


