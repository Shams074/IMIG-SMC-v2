// src/lib/data.ts
// Central content file — edit here to update the whole site

export const siteConfig = {
  name: "IMIG SMC",
  fullName: "Internal Medicine Interest Group",
  college: "Sindh Medical College",
  university: "Jinnah Sindh Medical University",
  email: "imig.smc@gmail.com",
  instagram: "imig.smc",
  linkedin: "Internal Medicine Interest Group SMC",
  youtube: "https://www.youtube.com/@imigsmc", // TODO: Replace with actual YouTube channel URL
  ref: "Ref/PR/25-26/065",
}

export const navLinks = [
  { label: "Home",             href: "/" },
  { label: "About Us",         href: "/about" },
  { label: "Events",           href: "/events" },
  { label: "Resource Library", href: "/resources" },
  { label: "Research",         href: "/research" },
  { label: "IMpact",           href: "/impact" },
  { label: "Membership",       href: "/membership" },
]

export const heroStats = [
  { value: "1700+", label: "LinkedIn Followers" },
  { value: "3200+", label: "Instagram Followers" },
  { value: "450+",  label: "YouTube Subscribers" },
  { value: "1000+", label: "Registered Members" },
]

export const highlights = [
  {
    icon: "📅",
    title: "Events & Webinars",
    desc: "Guest lectures, workshops, case-based discussions, competitions, and many more.",
    href: "/events",
    cta: "View Calendar",
  },
  {
    icon: "📚",
    title: "Resource Library",
    desc: "Latest guidelines, high-yield infographics, templates and recorded YouTube sessions.",
    href: "/resources",
    cta: "Browse Library",
  },
  {
    icon: "🔬",
    title: "Research",
    desc: "Ongoing projects, publication opportunities, and collaboration requests.",
    href: "/research",
    cta: "Explore Research",
  },
  {
    icon: "📰",
    title: "IMpact - Monthly Newsletter",
    desc: "Monthly newsletter curated by our editorial team. Subscribe for FREE via LinkedIn.",
    href: "/impact",
    cta: "Read Issues",
  },
  {
    icon: "🤝",
    title: "Membership",
    desc: "Join as a SMC Student Member or as a Campus Ambassador.",
    href: "/membership",
    cta: "Apply Now",
  },
  {
    icon: "📸",
    title: "Social Wall",
    desc: "Live feed of IMIG's latest Instagram posts and Reels.",
    href: "/contact",
    cta: "Follow Us",
  },
]

export const events = [
  // Past events — add new past events here
  {
    day: "15",
    month: "Mar",
    year: "2025",
    title: "Cardiology Grand Rounds — Case Presentations",
    desc: "Interactive case-based session with senior physicians from JPMC.",
    tag: "Webinar",
    upcoming: false,
  },
  {
    day: "08",
    month: "Feb",
    year: "2025",
    title: "Clinical Reasoning Quiz Competition – Round 1",
    desc: "Open to all MBBS years. Results announced on LinkedIn.",
    tag: "Competition",
    upcoming: false,
  },
  {
    day: "20",
    month: "Jan",
    year: "2025",
    title: "Research Mentorship Workshop",
    desc: "How to publish your first paper — guided by faculty collaborators.",
    tag: "Workshop",
    upcoming: false,
  },
  {
    day: "10",
    month: "Nov",
    year: "2024",
    title: "Nephrology Webinar — AKI vs CKD",
    desc: "Case-based discussion on acute vs chronic kidney disease management.",
    tag: "Webinar",
    upcoming: false,
  },
  {
    day: "02",
    month: "Oct",
    year: "2024",
    title: "IMpact Newsletter Launch — Issue #1",
    desc: "Live LinkedIn event covering the launch of IMIG SMC's monthly newsletter.",
    tag: "Newsletter",
    upcoming: false,
  },
]

export const teamMembers = [
  { initials: "PR", name: "President", role: "Executive", color: "bg-blue-500" },
  { initials: "VP", name: "Vice President", role: "Executive", color: "bg-blue-500" },
  { initials: "GS", name: "Gen. Secretary", role: "Executive", color: "bg-blue-500" },
  { initials: "JT", name: "Joint Secretary", role: "Executive", color: "bg-blue-500" },
  { initials: "ED", name: "Editorial", role: "Department", color: "bg-blue-200 !text-blue-800" },
  { initials: "RS", name: "Research", role: "Department", color: "bg-blue-200 !text-blue-800" },
  { initials: "EV", name: "Events", role: "Department", color: "bg-blue-200 !text-blue-800" },
  { initials: "MK", name: "Marketing", role: "Department", color: "bg-blue-200 !text-blue-800" },
]

// ---- About Page ----

export const patrons = [
  { name: "Dr. Urooj Lal Rehman",   role: "Patron in Chief" },
  { name: "Prof. Dr. Ambreen Usmani", role: "Principal, SMC" },
]

export const presidentsTeam = [
  { name: "Abdul Thawwab",  role: "President",           photo: "/team/thawwab.jpg" }, 
  { name: "Maryam Zubair",  role: "Vice President", photo: "/team/MariumVP.jpg" },  
  { name: "Sundas Ishtiaq", role: "General Secretary", photo: "/team/SundasGS.jpg" },
  { name: "Areej Javed",    role: "Treasurer", photo: "/team/Treasurer.jpg" },
  { name: "Ashbar Wadood",  role: "Assistant Treasurer", photo: "/team/Asst-Treasurer.jpg" },
]

export const directors = [
  { name: "Mohammad Shahzaib", role: "Director – Operations" },
  { name: "Sarah Imran",       role: "Director – Learning" },
  { name: "Irtiza Imam",       role: "Director – Journal Club" },
  { name: "Maheen Siddiqui",   role: "Director – Guidance" },
]

export const departments = [
  {
    name: "Operations Department",
    desc: "Manages logistics, event coordination, and organizational operations.",
    href: "/about/operations",
  },
  {
    name: "Learning Department",
    desc: "Curates educational content, resources, and webinar programmes.",
    href: "/about/learning",
  },
  {
    name: "Guidance Department",
    desc: "Provides mentorship, career guidance, and student support.",
    href: "/about/guidance",
  },
  {
    name: "Journal Club",
    desc: "Coordinates research projects, publication support, and critical appraisal sessions.",
    href: "/about/journal-club",
  },
]

export const timeline = [
  {
    year: "2023",
    title: "IMIG SMC Founded",
    desc: "IMIG SMC was established by a group of passionate SMCians to bridge academics and clinical excellence.",
  },
  {
    year: "2023",
    title: "ACP Registration",
    desc: "Successfully registered as an official student interest group with the American College of Physicians.",
  },
  {
    year: "2024",
    title: "First IMpact Newsletter",
    desc: "Launched the IMpact Monthly Newsletter on LinkedIn, reaching hundreds of medical students.",
  },
  {
    year: "2024",
    title: "1000+ Members",
    desc: "Crossed 1000 registered members milestone, becoming one of SMC's largest student organizations.",
  },
  {
    year: "2025",
    title: "Clinical Language Handbook",
    desc: "Published Pakistan's first multilingual clinical history-taking handbook — free for all students.",
  },
]

// ---- Research Page ----

export const researchTypes = [
  { type: "Systematic Reviews & Meta-Analyses", count: 2, status: "Ongoing" },
  { type: "Cross-Sectional Studies",            count: 3, status: "Ongoing" },
  { type: "Letters to the Editor",              count: 4, status: "Ongoing" },
  { type: "Narrative Reviews",                  count: 2, status: "Ongoing" },
  { type: "Case Reports",                       count: 1, status: "Ongoing" },
]

export const publishedArticles = [
  // Add published articles here: { title, journal, year, href }
  // Example:
  // { title: "Prevalence of Hypertension in Young Adults", journal: "JPMA", year: "2025", href: "https://..." },
]

// ---- Resources Page ----

type ResourceItem = {
  title: string
  type: string
  size?: string
  href?: string
  subtype?: string
}

type ResourceCategory = {
  name: string
  category: string
  icon: string
  subtypes: string[]
  items: ResourceItem[]
  youtubePlaylistId?: string
}

export const resourceCategories: ResourceCategory[] = [
  {
    name: "Clinical Guidelines",
    category: "Clinical Guidelines",
    icon: "📋",
    subtypes: ["Pakistan", "USA", "Australia", "UK"],
    items: [], // Add items: { title, subtype, type, href }
  },
  {
    name: "High-Yield Infographics",
    category: "High-Yield Infographics",
    icon: "📝",
    subtypes: ["KTDs", "Clinical Cases"],
    items: [],
  },
  {
    name: "History Templates",
    category: "History Templates",
    icon: "📄",
    subtypes: [],
    items: [],
  },
  {
    name: "Recorded Sessions",
    category: "Recorded Sessions",
    icon: "🎥",
    subtypes: [],
    youtubePlaylistId: "", // TODO: Add your YouTube playlist ID here
    items: [],
  },
]

export const clinicalHandbook = {
  title: "Clinical Language Handbook",
  subtitle: "Pakistan's First Multilingual Clinical History-Taking Handbook",
  desc: "A free resource for all medical students — available in multiple languages to help you take clinical histories effectively.",
  pdfLink: "#", // TODO: Replace with actual PDF link
}

// ---- Ticker ----

export const tickerItems = [
  "IMpact Newsletter — Latest Issue Now Live on LinkedIn",
  "Membership applications open seasonally — follow us for updates",
  "Campus Ambassador programme — represent IMIG at your batch",
  "Research collaboration requests open — Contact Journal Club",
  "Clinical Language Handbook available for FREE — link in resources",
  "Subscribe to IMIG SMC on YouTube for recorded sessions",
]

// Legacy export for admin page compatibility
export const resources = resourceCategories
