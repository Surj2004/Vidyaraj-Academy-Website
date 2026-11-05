/* =========================================================================
   VIDYARAJ ACADEMY — SITE CONTENT & CONFIGURATION
   -------------------------------------------------------------------------
   Edit this single file to update phone numbers, programs, statistics,
   features and other copy. The UI components read everything from here.
   ========================================================================= */

window.SITE = {
  brand: {
    name: "Vidyaraj Academy",
    wing: "IN-TUiTiON-S",
    wingLabel: "Tuition Wing",
    description:
      "Vidyaraj Academy's tuition wing, IN-TUiTiON-S, offers structured, personalised academic support for Class 5 to Class 12 students following the Kerala State Board and CBSE curricula in Melangot, Kanhangad.",
  },

  contact: {
       phones: [
      { display: "+91 8921694692", tel: "+918921694692" },
      { display: "+91 8075797929", tel: "+918075797929" },
    ],
    // Number used for WhatsApp enquiries (digits only, with country code)
    whatsapp: "918921694692",
    email: "vidyarajacademy@gmail.com",
    location: "Melangot / Kanhangad, Kerala, India",
    locationShort: "Melangot, Kanhangad",
    // Replace with the exact Google Maps embed URL of the centre when available
    mapEmbed:
      "https://www.google.com/maps?q=12.3249064,75.0930097&z=18&output=embed",
        mapLink: "https://www.google.com/maps/dir/?api=1&destination=12.3249064,75.0930097",
  },

  // Social links — replace "#" with real profile URLs (leave "#" to keep as placeholder)
  social: [
    { name: "Facebook", icon: "facebook", url: "https://www.facebook.com/p/Vidyaraj-Academy-61558696930802/" },
    { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/vidyarajacademy/" },
    { name: "YouTube", icon: "youtube", url: "https://www.youtube.com/@VidyarajAcademyeducation" },
  ],

  nav: [
    { label: "Home", href: "#top" },
    { label: "Programs", href: "#programs" },
    { label: "Teaching Approach", href: "#approach" },
    { label: "Why Us", href: "#why" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  heroTrust: [
    { icon: "tutor", label: "Experienced Tutors" },
    { icon: "target", label: "Personalised Attention" },
    { icon: "clipboard", label: "Regular Assessments" },
    { icon: "chart", label: "Student Progress Tracking" },
  ],

  trust: [
    { icon: "layers", title: "Structured Academic Support", text: "A planned syllabus flow for every term." },
    { icon: "tutor", title: "Experienced & Seasoned Tutors", text: "Teachers who know the curriculum well." },
    { icon: "target", title: "Personalised Student Attention", text: "Every learner is seen and supported." },
    { icon: "clipboard", title: "Regular Tests & Assessments", text: "Consistent checks on understanding." },
    { icon: "chart", title: "Progress Monitoring", text: "Clear view of how each student is growing." },
    { icon: "chat", title: "Parent Communication", text: "You stay informed at every stage." },
  ],

  /* =======================================================================
     PRICING — exact annual fees (INR). Edit ONLY here; cards & form update.
     Combo prices are for the full two-year program.
     ======================================================================= */
  pricing: {
    stateBoard: { class5: 8000, class6: 9000, class7: 10000, class8: 11000, class9: 12000, class10: 13000, class11: 14000, class12: 15000, combo: 25000 },
    cbse:       { class5: 10000, class6: 11000, class7: 12000, class8: 13000, class9: 14000, class10: 15000, class11: 17000, class12: 18000, combo: 30000 },
  },

  /* Board gateway (Choose Your Board) */
  boardOptions: [
    {
      key: "stateBoard", slug: "state", name: "Kerala State Board", formValue: "Kerala State Board",
      subtitle: "State Syllabus", mono: "KS",
      description: "Structured academic support aligned with the Kerala State Board curriculum.",
      classes: "Classes 5–12",
      benefits: ["Chapter-wise teaching aligned to the textbook", "Regular practice with curriculum-style questions", "Revision planned around the school calendar"],
      cta: "Explore State Board Programs",
      packagesTitle: "Kerala State Board Packages",
    },
    {
      key: "cbse", slug: "cbse", name: "CBSE", formValue: "CBSE",
      subtitle: "CBSE Curriculum", mono: "CB",
      description: "Concept-focused academic support aligned with the CBSE curriculum.",
      classes: "Classes 5–12",
      benefits: ["Concept-first explanations for every topic", "Consistent practice to strengthen application", "Assessments that mirror the CBSE pattern"],
      cta: "Explore CBSE Programs",
      packagesTitle: "CBSE Tuition Packages",
    },
  ],

  /* Class packages — shared for both boards; price comes from `pricing` */
  packageBenefits: ["All Core Subjects", "Study Materials Included", "Parent Progress Reports", "Doubt Clearing Sessions", "Personal Mentor"],
  packages: [
    { key: "class5",  name: "Class 5",  formClass: "Class 5",  level: "Foundation Year",  description: "A confident start to upper-primary learning with clear explanations and steady study routines." },
    { key: "class6",  name: "Class 6",  formClass: "Class 6",  level: "Foundation Year",  description: "Strengthening fundamentals as subjects deepen, with guided practice after every topic." },
    { key: "class7",  name: "Class 7",  formClass: "Class 7",  level: "Foundation Year",  description: "Problem-solving skills and topic-wise revision that prepare students for high school." },
    { key: "class8",  name: "Class 8",  formClass: "Class 8",  level: "High School",      description: "A smooth transition into high-school concepts with close attention to learning gaps." },
    { key: "class9",  name: "Class 9",  formClass: "Class 9",  level: "High School",      description: "Deeper subject understanding that lays the groundwork for the Class 10 board year." },
    { key: "class10", name: "Class 10", formClass: "Class 10", level: "High School",      description: "Focused board-exam preparation with complete syllabus coverage, revision cycles and model tests.", highlight: true },
    { key: "class11", name: "Class 11", formClass: "Class 11", level: "Higher Secondary", description: "Structured support for the step up to Higher Secondary, where concepts become more demanding." },
    { key: "class12", name: "Class 12", formClass: "Class 12", level: "Higher Secondary", description: "Intensive, well-planned board-exam preparation with regular assessments and targeted revision.", highlight: true },
    { key: "combo",   name: "Class 11 + 12 Combo", formClass: "Class 11", packageLabel: "Class 11 + 12 Combo", level: "Higher Secondary", combo: true,
      badge: "Premium 2-Year Program",
      description: "Continuous two-year guidance across Higher Secondary for consistent progress into the board exams.",
      benefits: ["Both years of Higher Secondary", "All Core Subjects", "Study Materials Included", "Parent Progress Reports", "Doubt Clearing Sessions", "Personal Mentor"] },
  ],

  boards: [
    {
      id: "state", name: "Kerala State Board", tag: "SCERT Curriculum",
      text: "Structured learning based on the prescribed State Board curriculum.",
      points: ["Chapter-wise teaching aligned to the textbook", "Regular practice with curriculum-style questions", "Revision planned around the school calendar"],
    },
    {
      id: "cbse", name: "CBSE", tag: "NCERT Curriculum",
      text: "Curriculum-aligned academic support with emphasis on conceptual understanding and consistent practice.",
      points: ["Concept-first explanations for every topic", "Consistent practice to strengthen application", "Assessments that mirror the CBSE pattern"],
    },
  ],

  steps: [
    { num: "01", title: "Understand", text: "Build strong conceptual foundations.", icon: "bulb" },
    { num: "02", title: "Learn", text: "Explain concepts clearly through structured teaching.", icon: "book" },
    { num: "03", title: "Practice", text: "Reinforce learning through questions, assignments and practice.", icon: "pen" },
    { num: "04", title: "Assess", text: "Regularly measure progress and identify areas for improvement.", icon: "clipboard" },
  ],

  personalised: [
    { icon: "target", title: "Individual attention", text: "Each student's pace and style are understood." },
    { icon: "search", title: "Identifying learning gaps", text: "Weak areas are spotted early and addressed." },
    { icon: "chat", title: "Doubt clarification", text: "Questions are welcomed and answered patiently." },
    { icon: "pen", title: "Additional practice", text: "Extra work where a student needs reinforcement." },
    { icon: "chart", title: "Progress monitoring", text: "Growth is tracked through regular assessment." },
    { icon: "compass", title: "Academic guidance", text: "Direction on study habits and exam preparation." },
  ],

  features: [
    { icon: "tutor", title: "Experienced & Seasoned Tutors", text: "Tutors with a deep understanding of the syllabus who explain concepts with clarity and patience." },
    { icon: "target", title: "Personalised Attention", text: "Teaching adapted to how each child learns, so no student is left behind in class." },
    { icon: "clipboard", title: "Regular Tests & Assessments", text: "Scheduled tests that build exam confidence and show exactly where to improve." },
    { icon: "book", title: "Structured Study Materials", text: "Organised notes and practice material that make revision focused and efficient." },
    { icon: "chart", title: "Student Progress Tracking", text: "Continuous tracking of performance across topics, tests and terms." },
    { icon: "chat", title: "Parent Communication", text: "Regular updates so parents always know how their child is progressing." },
  ],

  /* STATISTICS — Please verify these figures before publishing.
     Replace values/labels here; the counters update automatically. */
  stats: [
    { value: 15, suffix: "+", label: "Years of Academic Excellence" },
    { value: 98, suffix: "%", label: "Consistent Success Rate" },
    { value: 5000, suffix: "+", label: "Students Empowered" },
  ],

  environment: [
    "Comfortable learning environment",
    "Focused classroom experience",
    "Academic discipline",
    "Interactive learning",
    "Student engagement",
  ],

  form: {
    classOptions: ["Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"],
    boardOptions: ["Kerala State Board", "CBSE"],
    packageOptions: ["Class 5 Package", "Class 6 Package", "Class 7 Package", "Class 8 Package", "Class 9 Package", "Class 10 Package", "Class 11 Package", "Class 12 Package", "Class 11 + 12 Combo Package", "Not sure yet – please advise"],
    consent: "I agree to receive admission updates and callbacks on my WhatsApp/phone number.",
    // Optional: set to a form endpoint (e.g. Formspree) to also POST enquiries. Leave "" to use WhatsApp only.
    endpoint: "",
  },
};
