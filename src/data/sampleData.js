export const sampleProfile = {
  basics: {
    name: "Alex Johnson",
    label: "Senior Full-Stack Engineer",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    url: "https://alexjohnson.dev",
    summary:
      "Full-stack engineer with 6+ years of experience building scalable web applications and distributed systems. Passionate about clean architecture, developer experience, and shipping products that make a real impact. Strong background in React, Node.js, and cloud infrastructure.",
    profiles: [
      {
        network: "LinkedIn",
        url: "https://linkedin.com/in/alexjohnson",
      },
      {
        network: "GitHub",
        url: "https://github.com/alexjohnson",
      },
    ],
  },
  skills: [
    {
      category: "Languages",
      items: [
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "Python" },
        { name: "Go" },
        { name: "SQL" },
      ],
    },
    {
      category: "Frontend",
      items: [
        { name: "React" },
        { name: "Next.js" },
        { name: "Redux" },
        { name: "Tailwind CSS" },
        { name: "Webpack" },
      ],
    },
    {
      category: "Backend & Infra",
      items: [
        { name: "Node.js" },
        { name: "Express" },
        { name: "PostgreSQL" },
        { name: "Redis" },
        { name: "Docker" },
        { name: "AWS" },
        { name: "Kubernetes" },
      ],
    },
    {
      category: "Tools & Practices",
      items: [
        { name: "Git" },
        { name: "CI/CD" },
        { name: "Jest" },
        { name: "Cypress" },
        { name: "Agile/Scrum" },
      ],
    },
  ],
  work: [
    {
      company: "TechCorp Inc.",
      position: "Senior Full-Stack Engineer",
      url: "https://techcorp.com",
      startDate: "2022-03-01",
      endDate: "Present",
      highlights: [
        {
          full_text:
            "Architected a microservices migration from a monolithic Node.js backend to Docker-ized services on Kubernetes, reducing deployment time by 70% and improving system reliability to 99.95% uptime.",
          tech_stack: ["Node.js", "Docker", "Kubernetes"],
          is_selected: true,
        },
        {
          full_text:
            "Led the re-write of the customer-facing dashboard using React and Next.js, achieving a 45% improvement in Lighthouse performance scores and cutting page load times from 3.2s to 1.1s.",
          tech_stack: ["React", "Next.js"],
          is_selected: true,
        },
        {
          full_text:
            "Implemented a real-time notification system using Redis pub/sub and WebSockets, serving 50K+ concurrent users with sub-100ms latency.",
          tech_stack: ["Redis", "WebSockets"],
          is_selected: true,
        },
        {
          full_text:
            "Mentored a team of 4 junior engineers through code reviews, pair programming, and weekly architecture discussions, accelerating their ramp-up time by 40%.",
          tech_stack: [],
          is_selected: false,
        },
      ],
    },
    {
      company: "StartupXYZ",
      position: "Full-Stack Developer",
      url: "https://startupxyz.io",
      startDate: "2019-06-15",
      endDate: "2022-02-28",
      highlights: [
        {
          full_text:
            "Built the entire frontend from scratch using React, Redux, and TypeScript, supporting 10K+ daily active users across web and mobile platforms.",
          tech_stack: ["React", "Redux", "TypeScript"],
          is_selected: true,
        },
        {
          full_text:
            "Developed a RESTful API layer with Express and PostgreSQL, handling 2M+ requests per day with an average response time of 45ms.",
          tech_stack: ["Express", "PostgreSQL"],
          is_selected: true,
        },
        {
          full_text:
            "Automated CI/CD pipelines using GitHub Actions and Docker, reducing release cycles from bi-weekly to daily deployments.",
          tech_stack: ["CI/CD", "Docker", "GitHub Actions"],
          is_selected: true,
        },
        {
          full_text:
            "Designed and maintained comprehensive test suites with Jest and Cypress, achieving 92% code coverage across all services.",
          tech_stack: ["Jest", "Cypress"],
          is_selected: false,
        },
      ],
    },
    {
      company: "WebAgency Co.",
      position: "Junior Developer",
      url: "https://webagency.co",
      startDate: "2018-01-10",
      endDate: "2019-05-30",
      highlights: [
        {
          full_text:
            "Developed responsive client websites using React and Tailwind CSS, delivering 15+ projects on time and under budget.",
          tech_stack: ["React", "Tailwind CSS"],
          is_selected: true,
        },
        {
          full_text:
            "Integrated third-party APIs (Stripe, SendGrid, Google Maps) into client applications, reducing manual workflows by 60%.",
          tech_stack: ["Stripe", "SendGrid"],
          is_selected: true,
        },
      ],
    },
  ],
  projects: [
    {
      name: "DevMetrics",
      description:
        "Open-source developer productivity dashboard that aggregates data from GitHub, Jira, and Slack to visualize team performance metrics.",
      url: "https://github.com/alexjohnson/devmetrics",
      keywords: ["React", "Node.js", "GraphQL", "D3.js"],
      highlights: [
        {
          full_text:
            "Built with React and D3.js for interactive data visualization, backed by a Node.js GraphQL API aggregating data from 3+ sources.",
          tech_stack: ["React", "D3.js", "Node.js", "GraphQL"],
          is_selected: true,
        },
        {
          full_text:
            "Gained 1.2K GitHub stars and 200+ forks, featured in JavaScript Weekly newsletter.",
          tech_stack: [],
          is_selected: true,
        },
      ],
    },
    {
      name: "CloudDeploy CLI",
      description:
        "A command-line tool written in Go for simplified multi-cloud deployment to AWS, GCP, and Azure.",
      url: "https://github.com/alexjohnson/clouddeploy",
      keywords: ["Go", "AWS", "GCP", "Azure", "CLI"],
      highlights: [
        {
          full_text:
            "Developed in Go with support for AWS ECS, GCP Cloud Run, and Azure Container Instances, unifying deployment under a single workflow.",
          tech_stack: ["Go", "AWS", "GCP", "Azure"],
          is_selected: true,
        },
        {
          full_text:
            "Reduced average deployment setup time from 30 minutes to under 5 minutes for teams with multi-cloud infrastructure.",
          tech_stack: [],
          is_selected: true,
        },
      ],
    },
  ],
  education: [
    {
      institution: "State University",
      area: "Computer Science",
      studyType: "Bachelor of Science",
      startDate: "2014-09-01",
      endDate: "2018-05-15",
      score: "3.8 / 4.0",
    },
  ],
};
