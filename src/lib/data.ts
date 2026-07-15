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
  { label: "Departments",      href: "/departments" },
  { label: "IMpact",           href: "/impact" },
  { label: "Membership",       href: "/membership" },
  { label: "Social Wall",      href: "/social-wall" },
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
    title: "Departments",
    desc: "Operations, Learning, Guidance, and Journal Club.",
    href: "/departments",
    cta: "Explore Departments",
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
    desc: "Follow IMIG's social handles to keep up to date",
    href: "/social-wall",
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
    name: "Academic & Mentorship",
    desc: "Curates educational content, resources, guest talks, hands-on experiences, and career guidance.",
    href: "/departments/academic-mentorship",
  },
  {
    name: "Journal Club",
    desc: "Coordinates research projects, publication support, and critical appraisal sessions.",
    href: "/departments/journal-club",
  },
  {
    name: "Media & Marketing",
    desc: "Manages social media handling, marketing, and creative design.",
    href: "/departments/media-marketing",
  },
  {
    name: "Social & Logistics",
    desc: "Manages event logistics, planning, and on-ground coverage.",
    href: "/departments/social-logistics",
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
    title: "ACP Affiliation",
    desc: "Successfully registered all our members with the American College of Physicians.",
  },
  {
    year: "2024",
    title: "First Outreach Event",
    desc: "Organized the first external collaborative suturing workshop.",
  },
  {
    year: "2024",
    title: "1000 Followers",
    desc: "Crossed 1000 followers on Instagram before the end of the first term.",
  },
  {
    year: "2025",
    title: "Launched IMpact Newsletter",
    desc: "Launched the IMpact Monthly Newsletter on LinkedIn, reaching thousands of medical students and faculty around the world.",
  },
  {
    year: "2025",
    title: "2000 Followers",
    desc: "Reached 2000 followers on Instagram, creating tremendous momentum.",
  },
  {
    year: "2026",
    title: "Launched imig.smc.pk",
    desc: "Officially launched the website of IMIG SMC.",
  },
  {
    year: "2026",
    title: "3000 Followers",
    desc: "Crossed 3000 followers on Instagram, continuing the annual streak.",
  },
  {
    year: "2026",
    title: "Clinical Language Handbook",
    desc: "Published Pakistan's first multilingual clinical history-taking handbook.",
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
    items: [
      { title: "Pakistan Guidelines", type: "Link", subtype: "Pakistan", href: "https://www.cpsp.edu.pk/clinical-guideline.php" },
      { title: "USA Guidelines", type: "Link", subtype: "USA", href: "https://www.acponline.org/clinical-information/clinical-guidelinesrecommendations" },
      { title: "Australia Guidelines", type: "Link", subtype: "Australia", href: "https://www.racgp.org.au/clinical-resources/clinicalguidelines/key-racgp-guidelines/view-all-racgp-guidelines" },
      { title: "UK Guidelines", type: "Link", subtype: "UK", href: "https://www.nice.org.uk/guidance" },
    ],
  },
  {
    name: "High-Yield Infographics",
    category: "High-Yield Infographics",
    icon: "📝",
    subtypes: ["KTDs", "Clinical Cases"],
    items: [
      { title: "Know The Differences Season 1", type: "Highlight", subtype: "KTDs", href: "#" },
      { title: "Know The Differences Season 2", type: "Highlight", subtype: "KTDs", href: "#" },
      { title: "Clinical Cases 2023", type: "Highlight", subtype: "Clinical Cases", href: "#" },
      { title: "Clinical Cases 2024", type: "Highlight", subtype: "Clinical Cases", href: "#" },
      { title: "Clinical Cases 2025", type: "Highlight", subtype: "Clinical Cases", href: "#" },
      { title: "Clinical Cases 2026", type: "Highlight", subtype: "Clinical Cases", href: "#" },
    ],
  },
  {
    name: "History Templates",
    category: "History Templates",
    icon: "📄",
    subtypes: [],
    items: [
      { title: "PDFs coming soon", type: "Placeholder" }
    ],
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
  desc: "A clinical guide for all medical students, clinicians and healthcare practitioners — available for FREE to help you take clinical histories effectively and to understand your patient very well.",
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
