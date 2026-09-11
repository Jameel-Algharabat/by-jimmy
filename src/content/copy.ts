export const copy = {
  skip: "Skip to content",
  scroll: "Scroll",
  nav: {
    work: "Work",
    services: "Services",
    about: "About",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    kicker: "Creative technology studio",
    title: "RASM",
    line: "Designing what\ncomes next.",
    lead: "RASM designs and builds websites, digital experiences, and AI-powered systems for ambitious companies. Strategy, design, and engineering — made with precision, and built to last.",
    primary: "Start a project",
    secondary: "See the work",
    roles: ["Strategy", "Design", "Engineering", "Intelligence"],
  },
  work: {
    index: "01",
    label: "Selected work",
    title: "A product, built\nas a platform.",
    lead: "Featured engagement — architecture, interface, and engineering, treated as one system.",
    visit: "Visit the live product",
    featured: {
      id: "open",
      name: "open",
      category: "Digital product & platform",
      header: "open — Product and platform, engineered together.",
      subheading: "A high-performance web experience, built to grow with the company.",
      story:
        "We partnered with open to turn an ambitious product vision into a complete digital platform. Architecture, interface, and engineering moved as one system — so the brand, the performance, and the product arrived together.",
      badges: [
        "Product Strategy",
        "Interface Engineering",
        "Full-Stack Development",
        "Performance Systems",
      ],
      website: "https://www.open.cx",
      websiteLabel: "open.cx",
      video: "/work/open-re.mp4",
      poster: "/work/oben-desktop.png",
      videoAlt: "Screen recording of the open website in a browser frame.",
    },
    testimonial: {
      quote:
        "Working with the team was an exceptional experience. They demonstrated world-class standards in product engineering, rapid execution, and the ability to translate complex business needs into an intuitive digital product. I highly recommend them to anyone looking to build a top-tier digital product.",
      name: "Mohammad Gharabat",
      role: "Founder & CEO at open",
      initials: "MG",
      photo: "/work/mohammad-gharabat.jpg",
      contact: "Ask the founder",
      linkedInLabel: "LinkedIn",
      emailLabel: "Email",
      linkedIn: "https://www.linkedin.com/in/gharabat",
      email: "mo@open.cx",
    },
  },
  services: {
    index: "02",
    label: "Services",
    title: "What we make.",
    items: [
      {
        n: "01",
        title: "Websites",
        body: "Premium websites and digital experiences designed around clarity, brand, and conversion.",
      },
      {
        n: "02",
        title: "AI Systems",
        body: "AI-powered workflows, copilots, automation, and custom digital systems.",
      },
      {
        n: "03",
        title: "Product Design",
        body: "Digital products and interfaces designed around real users and business goals.",
      },
      {
        n: "04",
        title: "Brand & Digital Identity",
        body: "Distinctive identities and digital systems for ambitious companies.",
      },
    ],
  },
  about: {
    index: "03",
    label: "About",
    name: "RASM",
    aside: "RASM.STUDIO · Drawing, design, creation",
    title: "RASM exists to make digital work that holds its value.",
    p1: "The name comes from rasm — drawing, design, creation. We combine strategy, design, engineering, and human judgment. Intelligent tools sit inside the process — research, exploration, production — so the work is sharper, not louder.",
    p2: "The collaboration is direct. You speak with the people making the product. Decisions stay close. The work is made to represent a business — local or international — and to help people hire you or buy from you.",
    p3: "We are a lean studio. There is no account layer. If the work is ours to make, we make it. Then we stay with it — testing, refining, keeping the product exact as the business grows.",
  },
  process: {
    index: "04",
    label: "Process",
    title: "From first brief\nto lasting work.",
    steps: [
      {
        n: "01",
        title: "Understand",
        body: "We study the business, the audience, and the constraint. We question the brief before we honor it. No work starts without that.",
      },
      {
        n: "02",
        title: "Shape",
        body: "Strategy becomes a concept. Type, interface, and system — until the product feels inevitable, not assembled.",
      },
      {
        n: "03",
        title: "Build",
        body: "We engineer for speed, clarity, and durability. Intelligent tools sit inside the workflow, so the work moves further without losing care.",
      },
      {
        n: "04",
        title: "Evolve",
        body: "Launch is a beginning. We test, refine, and keep the product exact as the business changes.",
      },
    ],
  },
  why: {
    index: "05",
    label: "Why RASM",
    title: "Quiet confidence.\nExacting work.",
    items: [
      {
        n: "01",
        title: "The people making it.",
        body: "You work with the designers and engineers on the product. No account layer between you and the work.",
      },
      {
        n: "02",
        title: "One system, not a handoff.",
        body: "Design, engineering, and intelligent workflows stay in the same conversation. Nothing is lost between the idea and the build.",
      },
      {
        n: "03",
        title: "Built to last.",
        body: "The site has a job: represent the company, earn trust, and convert. We design for that — then keep it exact.",
      },
    ],
  },
  contact: {
    index: "06",
    label: "Contact",
    title: "Have a project in mind?\nLet’s talk about it.",
    book: "Book a 30-minute discovery call",
    bookAria: "Book a 30-minute discovery call, opens in a new tab",
  },
  footer: {
    email: "hello@rasm.studio",
    line: "RASM.STUDIO",
  },
  notFound: {
    label: "404",
    title: "This page\ndoesn’t exist.",
    lead: "The page you’re looking for may have moved, or the link may be incorrect.",
    home: "Back to Home",
    documentTitle: "Page not found | RASM.STUDIO",
  },
} as const;

export type Copy = typeof copy;
