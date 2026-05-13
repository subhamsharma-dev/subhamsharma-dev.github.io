// Centralized content — single source of truth.
// Edit this file to update the whole site.

export const profile = {
  name: 'Subham Sharma',
  shortName: 'Subham',
  initials: 'SS',
  role: 'Software Engineer',
  tagline: 'AI · Cloud · Backend · Full Stack',
  location: 'Bengaluru, India',
  timezone: 'IST (UTC+5:30)',
  email: 'ksubham.sharma@gmail.com',
  phone: '+91 90511 37398',
  available: true,
  yearsExperience: '4+',

  // Socials
  github: 'https://github.com/subhamsharma-dev',
  linkedin: 'https://linkedin.com/in/subham-sharma1512',
  twitter: 'https://x.com/ssharma1512',
  medium: 'https://medium.com/@ksubham.sharma',

  // Files
  resumeUrl: '/Subham_Sharma_Resume.pdf',

  // Roles I'm targeting / can fill — used by the hero rotation
  rotatingRoles: [
    'AI Engineer',
    'Gen AI Engineer',
    'Full Stack Engineer',
    'Backend Engineer',
    'Cloud Engineer',
    'DevOps Engineer',
  ],

  // The hero one-liner (option A — full + reflective)
  heroHook:
    "4+ years building production AI and cloud systems. Currently between chapters — learning AI deeply, automating my workflows with Claude Code. Open to what's next.",
}

// Quick numbers shown under the hero
export const heroStats = [
  { label: 'Years building', value: '4+', sub: 'Full-time, shipped' },
  { label: 'Records processed', value: '10M+', sub: 'Identity resolution' },
  { label: 'Pages de-identified', value: '20M+', sub: 'HIPAA pipeline' },
  { label: 'Production uptime', value: '99%', sub: 'After modernization' },
  { label: 'AWS cost reduced', value: '35%', sub: 'Through FinOps' },
  { label: 'LLM tokens served', value: '10M+', sub: 'Agentic platform' },
]

// About section — replaces the old recruiter cards.
// Folded the "why teams reach out" highlights into this narrative.
export const about = {
  // Personal narrative — drafted from your projects + the curious-builder voice.
  // Edit freely.
  paragraphs: [
    "I'm a software engineer based in Bengaluru with 4+ years building production systems — mostly the unglamorous, load-bearing kind. HIPAA-conformant pipelines, AI document platforms, agentic LLMs, multi-cloud infrastructure on AWS and Azure. The kind of work where uptime matters and the failure mode is someone's data.",
    "Lately I've been learning AI deeply — building agents, exploring how far Claude Code can take a curious engineer's workflow, and rethinking what \"productivity\" means when an LLM can write the boilerplate. I'm between chapters right now and looking for the next interesting problem — AI infrastructure, gen AI, full-stack, backend, cloud, DevOps. Anything where the bar is high and the work ships.",
  ],
  // Quick highlights — what shows up next to the narrative
  highlights: [
    { title: 'AI & LLM systems', detail: 'Agentic LLMs, RAG, vector DBs, private LLM platforms' },
    { title: 'Cloud platforms', detail: 'AWS + Azure across 5+ accounts. Serverless, ECS, Spark, Step Functions' },
    { title: 'Backend at scale', detail: 'Python, FastAPI, Java. Event-driven, idempotent, observable' },
    { title: 'Compliance', detail: 'HIPAA, SOC 2. Zero major audit findings' },
    { title: 'IaC + DevOps', detail: 'Terraform, CDK, CloudFormation, Ansible. 100% codified' },
    { title: 'Mentorship', detail: '7+ interns and junior engineers across cohorts' },
  ],
}

export type Experience = {
  role: string
  company: string
  location: string
  period: string
  current?: boolean
  summary: string
  highlights: string[]
  stack: string[]
}

export const experiences: Experience[] = [
  {
    role: 'Software Development Engineer II',
    company: 'White Blink',
    location: 'Bengaluru, India',
    period: 'Apr 2025 — Present',
    current: true,
    summary:
      'Lead engineer on HIPAA-compliant AI pipelines, identity resolution at scale, and vendor compliance platforms.',
    highlights: [
      'Engineered a HIPAA-compliant legal document redaction pipeline (PoC → prod) processing 1M+ scanned case files / 20M+ pages — AWS Textract OCR, Step Functions orchestrating parallel ECS Fargate tasks, Microsoft Presidio for PII/PHI de-identification.',
      'Provisioned AWS infra for an identity resolution pipeline — EMR Serverless (Apache Spark) + Lambda orchestration — processing 10M+ records.',
      'Architected a vendor compliance portal for 200+ vendors — FastAPI on ECS Fargate, Lambda PDF generation, Terraform IaC. Cut admin time ~60%.',
      'Deployed a private internal GenAI platform on OpenWebUI + Azure OpenAI — adopted by 10+ legal team members with zero third-party data exposure.',
      'Migrated 30+ repos from AWS CodeCommit → GitHub preserving full commit history, metadata, and branch structures.',
      'Mentored 7+ interns, junior devs, and new hires across cohorts.',
    ],
    stack: ['AWS Textract', 'Step Functions', 'ECS Fargate', 'EMR Serverless', 'Spark', 'FastAPI', 'Presidio', 'Terraform', 'Azure OpenAI'],
  },
  {
    role: 'Software Development Engineer I',
    company: 'White Blink',
    location: 'Bengaluru, India',
    period: 'Apr 2022 — Mar 2025',
    summary:
      'Owned serverless architecture, multi-cloud infrastructure, AI knowledge bases, and SOC 2 compliance.',
    highlights: [
      'Engineered a semantic legal knowledge base — LangChain + Pinecone + OpenAI Embeddings — indexing 10+ books into retrievable chunks.',
      'Built a document AI platform on Azure (FastAPI) processing veteran disability records — OCR → chunking → embeddings → structured LLM extraction.',
      'Reduced monthly AWS cost by 35% via Compute Optimizer right-sizing, S3 lifecycle policies, Savings Plans.',
      'Architected & deployed 10+ HA event-driven serverless apps on Lambda — idempotent handlers, DLQs, exponential backoff.',
      'Drove SOC 2 controls — encryption, threat monitoring, audit logging, bastion-host access. Zero major findings.',
      'Led modernization from Elastic Beanstalk → ECS. Production uptime to 99%. Prometheus + Grafana observability.',
      'Deployed a HIPAA-conformant telehealth platform on EC2 with Jitsi + Jibri — 50+ concurrent consultations.',
    ],
    stack: ['AWS Lambda', 'Terraform', 'LangChain', 'Pinecone', 'Azure OpenAI', 'ECS', 'Prometheus', 'Ansible'],
  },
  {
    role: 'Associate Software Engineer',
    company: 'White Blink',
    location: 'Bengaluru, India',
    period: 'Jul 2021 — Mar 2022',
    summary:
      'Built Lambda-based clinical document automation and codified infrastructure.',
    highlights: [
      'Built 20+ AWS Lambda functions (Java + Thymeleaf via CDK) — render aggregated medical records from US EHR systems (Epic, Cerner) into standardized PDFs.',
      'Owned AWS infra across 5+ accounts — codified 100% of resources in CloudFormation + CDK.',
    ],
    stack: ['AWS Lambda', 'Java', 'Thymeleaf', 'AWS CDK', 'CloudFormation', 'Epic', 'Cerner'],
  },
  {
    role: 'Software Engineering Intern',
    company: 'White Blink',
    location: 'Bengaluru, India',
    period: 'May 2020 — Jul 2021',
    summary:
      'Shipped end-to-end product features and built a server-side PDF generation engine.',
    highlights: [
      'Shipped 8+ full-stack features in a PHP/JavaScript product platform.',
      'Built a server-side dynamic PDF generation engine for client-facing rendering.',
    ],
    stack: ['PHP', 'JavaScript', 'PDF Generation'],
  },
]

export type Project = {
  slug: string
  title: string
  tagline: string
  category: ('AI' | 'Cloud' | 'Backend' | 'Full Stack' | 'Data' | 'Healthcare')[]
  year: string
  featured?: boolean
  problem: string
  solution: string
  challenge: string
  impact: string
  scale: string
  stack: string[]
  metrics: { label: string; value: string }[]
  links?: { github?: string; live?: string }
}

export const projects: Project[] = [
  // FEATURED
  {
    slug: 'econatlas',
    title: 'EconAtlas',
    tagline: 'Self-hosted market intelligence platform with an agentic LLM',
    category: ['AI', 'Backend', 'Full Stack', 'Data'],
    year: '2026',
    featured: true,
    problem:
      "Retail investors lack a unified, real-time view of stocks, indices, commodities, crypto, IPOs, and macro events — and no existing tool lets you ask natural-language questions over your own watchlist.",
    solution:
      'A self-hosted full-stack platform ingesting ~100K+ data points daily from 10+ APIs, plus Artha — an agentic LLM with function calling, RAG over pgvector, and SSE streaming.',
    challenge:
      'Orchestrating 30+ scheduled jobs at minute-level granularity while keeping the LLM agent responsive — all running on a personal on-prem server, exposed safely via Cloudflare Tunnel with zero open ports.',
    impact:
      'A personal market analyst that pushes notifications throughout the trading day and answers portfolio questions with cited data.',
    scale: '~100K+ data points/day · 2000+ stocks · 6000+ MFs · 10M+ inference tokens',
    stack: [
      'Python', 'FastAPI', 'Asyncio', 'LangGraph', 'PostgreSQL', 'pgvector',
      'SQLAlchemy', 'Alembic', 'Redis', 'Flutter', 'Firebase FCM',
      'Docker', 'Prometheus', 'Grafana', 'Cloudflare Tunnel',
    ],
    metrics: [
      { label: 'Data points / day', value: '100K+' },
      { label: 'Scheduled jobs', value: '30+' },
      { label: 'LLM tokens served', value: '10M+' },
      { label: 'Open ports', value: '0' },
    ],
  },
  {
    slug: 'legal-ai-platform',
    title: 'AI Legal Intelligence Platform',
    tagline: 'Two-phase system: HIPAA de-identification → RAG over the cleaned corpus',
    category: ['AI', 'Cloud', 'Backend', 'Data'],
    year: '2025',
    featured: true,
    problem:
      "Law firms wanted AI-assisted analysis of case outcomes and legal strategy, but couldn't feed raw documents into any LLM without first removing PII and PHI at scale — manually impossible, regulatorily required.",
    solution:
      "Built end-to-end in two phases. Phase 1: a HIPAA-compliant redaction pipeline (Textract OCR → Step Functions → ECS Fargate workers running Microsoft Presidio) that de-identifies 1M+ files / 20M+ pages. Phase 2: a semantic knowledge base over the cleaned corpus using LangChain + Pinecone + OpenAI Embeddings — recursive text splitting, cosine similarity retrieval, natural-language Q&A over the entire body of work.",
    challenge:
      "Designing the redaction pipeline to handle thousands of parallel OCR + de-identification tasks across wildly different document layouts while preserving downstream analytical value. Then tuning the RAG chunking + retrieval to surface the right passage out of hundreds of thousands of candidates.",
    impact:
      "Unlocked AI-driven analysis on a corpus that was previously off-limits. Lawyers query the cleaned corpus in natural language and get cited passages in seconds.",
    scale: '1M+ scanned files · 20M+ pages · 10+ legal reference books indexed · HIPAA end-to-end',
    stack: [
      'AWS Textract', 'AWS Step Functions', 'ECS Fargate', 'Microsoft Presidio',
      'LangChain', 'Pinecone', 'OpenAI Embeddings', 'Python', 'FastAPI', 'Terraform',
    ],
    metrics: [
      { label: 'Pages de-identified', value: '20M+' },
      { label: 'Files', value: '1M+' },
      { label: 'Retrieval', value: 'Cosine sim' },
      { label: 'Compliance', value: 'HIPAA' },
    ],
  },
  {
    slug: 'vendor-compliance-portal',
    title: 'Vendor Compliance Portal',
    tagline: 'Custom portal replacing manual compliance for 200+ vendors',
    category: ['Backend', 'Cloud', 'Full Stack'],
    year: '2025',
    featured: true,
    problem:
      'Compliance tracking for 200+ vendors was manual, error-prone, and slow — the admin team was the bottleneck.',
    solution:
      'FastAPI on ECS Fargate with role-based vendor and admin portals, automated email notifications, Lambda-based PDF generation, fully Terraform-provisioned infra.',
    challenge:
      "Modeling complex compliance workflows so non-technical vendors could self-serve without training.",
    impact:
      'Cut admin processing time by ~60% and gave vendors a self-service path to staying compliant.',
    scale: '200+ vendors · automated PDF + email pipelines',
    stack: ['FastAPI', 'Python', 'ECS Fargate', 'AWS Lambda', 'Terraform', 'PostgreSQL'],
    metrics: [
      { label: 'Vendors', value: '200+' },
      { label: 'Admin time saved', value: '~60%' },
    ],
  },

  // SECONDARY
  {
    slug: 'identity-resolution',
    title: 'Identity Resolution Pipeline',
    tagline: 'EMR Serverless Spark + Lambda orchestration over 10M+ records',
    category: ['Cloud', 'Backend', 'Data'],
    year: '2025',
    problem:
      'Reconciling identities across millions of records from heterogeneous sources for downstream analytics.',
    solution:
      'EMR Serverless running Spark jobs orchestrated by Lambda — scales elastically without managing clusters.',
    challenge:
      'Tuning Spark partitions and Lambda orchestration to balance cost vs. SLA for batch resolution.',
    impact:
      'A reliable, scalable record-matching foundation that became core data infrastructure.',
    scale: '10M+ records processed',
    stack: ['AWS EMR Serverless', 'Apache Spark', 'AWS Lambda', 'Python', 'Terraform'],
    metrics: [
      { label: 'Records', value: '10M+' },
      { label: 'Spark on', value: 'Serverless' },
    ],
  },
  {
    slug: 'claimant-medical-data',
    title: 'Claimant Medical Data Solutions',
    tagline: 'Lambda-based EHR document automation across Epic, Cerner, and external services',
    category: ['Cloud', 'Backend', 'Healthcare'],
    year: '2021-2024',
    problem:
      "Aggregating medical records from US EHR systems (Epic, Cerner) and external services into standardized claimant documents was manual and inconsistent.",
    solution:
      'Owned the AWS infrastructure end to end. Built 20+ Java Lambda functions (with Thymeleaf templates, provisioned via CDK) rendering aggregated EHR data into standardized PDFs, plus 10+ event-driven Python Lambda apps integrating Salesforce, Twilio, SendGrid, and SignalWire.',
    challenge:
      'Guaranteeing at-least-once processing at scale — idempotent handlers, dead-letter queues, exponential backoff — across thousands of invocations per day, with WAF + Cognito protecting the API layer.',
    impact:
      "Codified 100% of resources in CloudFormation + CDK across 5+ AWS accounts. Manual provisioning errors went to zero.",
    scale: 'Thousands of invocations/day · 5+ AWS accounts · 100% IaC coverage',
    stack: ['AWS Lambda (Java + Python)', 'API Gateway', 'SQS', 'Cognito', 'WAF', 'CloudFormation', 'CDK', 'Salesforce', 'Twilio', 'SendGrid'],
    metrics: [
      { label: 'Lambda functions', value: '20+' },
      { label: 'AWS accounts', value: '5+' },
      { label: 'IaC coverage', value: '100%' },
    ],
  },
  {
    slug: 'remote-patient-monitoring',
    title: 'Remote Patient Monitoring',
    tagline: 'HIPAA-conformant telehealth platform + on-prem ETL feeding clinical dashboards',
    category: ['Cloud', 'Backend', 'Healthcare'],
    year: '2023-2024',
    problem:
      'Healthcare clients needed secure remote consultations and unified visibility into patient onboarding, transaction volume, and revenue — without sending PHI through third-party SaaS.',
    solution:
      "Two complementary pieces: (1) a self-hosted HIPAA-conformant telehealth platform on AWS EC2 using Jitsi + Jibri with encrypted S3 session recordings; (2) a nightly ETL pipeline syncing on-prem MSSQL → AWS RDS, surfaced as Google Data Studio dashboards.",
    challenge:
      "Self-hosting telehealth meant owning the full security surface — TLS, encryption, recording storage, access control. The ETL side needed reliable cross-network sync without exposing the on-prem database.",
    impact:
      'Clinical teams got a secure consultation tool with zero PHI leaving their cloud, plus daily dashboards covering patient onboarding, volume, and revenue growth.',
    scale: '50+ concurrent consultations · ~5K rows/day ETL · encrypted recording archive',
    stack: ['AWS EC2', 'Jitsi', 'Jibri', 'S3', 'Microsoft SQL Server', 'AWS RDS', 'Google Data Studio', 'Windows middleware'],
    metrics: [
      { label: 'Concurrent calls', value: '50+' },
      { label: 'Daily ETL rows', value: '~5K' },
      { label: 'PHI leaks', value: '0' },
    ],
  },
  {
    slug: 'attendify',
    title: 'Attendify',
    tagline: 'Cross-platform Flutter attendance & assessment app',
    category: ['Full Stack'],
    year: '2021',
    problem:
      'Schools needed an end-to-end mobile workflow for attendance, leave, and timed assessments — for both students and teachers.',
    solution:
      'Cross-platform Flutter app with role-based access — interactive attendance visualizations, leave workflows, timed MCQ assessments with real-time scoring.',
    challenge:
      'Designing two distinct UX flows (student vs. teacher) on a single codebase with synced session state.',
    impact:
      'A working production-grade student/teacher mobile experience built end-to-end.',
    scale: '2 roles · charts + calendars + assessment engine',
    stack: ['Flutter', 'Dart', 'REST APIs'],
    metrics: [
      { label: 'Platforms', value: 'iOS + Android' },
    ],
  },
]

export type TechCategory = {
  id: string
  name: string
  color: string
  items: string[]
}

export const techStack: TechCategory[] = [
  {
    id: 'ai',
    name: 'AI / LLM',
    color: '#a78bfa',
    items: ['LangChain', 'LangGraph', 'RAG', 'AI Agents', 'AWS Bedrock', 'Azure OpenAI', 'OpenRouter', 'Microsoft Presidio', 'Pinecone', 'pgvector', 'OpenAI Embeddings'],
  },
  {
    id: 'aws',
    name: 'AWS',
    color: '#ff9900',
    items: ['Lambda', 'ECS Fargate', 'EMR Serverless', 'Step Functions', 'API Gateway', 'Textract', 'S3', 'RDS', 'DynamoDB', 'Cognito', 'WAF', 'KMS', 'CloudFront', 'EventBridge'],
  },
  {
    id: 'azure',
    name: 'Azure',
    color: '#00a4ef',
    items: ['Azure OpenAI', 'App Service', 'Blob Storage', 'Virtual Machines', 'Entra ID', 'Azure DevOps'],
  },
  {
    id: 'backend',
    name: 'Backend',
    color: '#5cc8ff',
    items: ['Python', 'FastAPI', 'Java', 'TypeScript', 'Microservices', 'Serverless', 'Event-Driven', 'Asyncio', 'OAuth2', 'WebSockets', 'SSE', 'Pydantic'],
  },
  {
    id: 'iac',
    name: 'IaC / DevOps',
    color: '#22d3ee',
    items: ['Terraform', 'AWS CDK', 'CloudFormation', 'Docker', 'Ansible', 'GitHub Actions', 'Nginx', 'Caddy', 'Blue-Green Deploys'],
  },
  {
    id: 'data',
    name: 'Data',
    color: '#34d399',
    items: ['Apache Spark', 'PostgreSQL', 'Redis', 'MSSQL', 'ETL Pipelines', 'Batch Processing', 'pgvector'],
  },
  {
    id: 'observability',
    name: 'Observability',
    color: '#f59e0b',
    items: ['Prometheus', 'Grafana', 'CloudWatch', 'CloudTrail'],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    color: '#f472b6',
    items: ['React', 'Next.js', 'Flutter', 'Tailwind', 'Framer Motion'],
  },
  {
    id: 'security',
    name: 'Security',
    color: '#ef4444',
    items: ['HIPAA', 'SOC 2', 'OWASP', 'JWT', 'IAM', 'KMS', 'WAF', 'PII/PHI De-id', 'Threat Modeling'],
  },
]

export const achievements = [
  {
    title: "Director's Choice Award",
    org: 'Institute of Engineering and Management (IEM)',
    date: 'Jul 2021',
    note: 'Overall Student Performance',
  },
  {
    title: 'Winner — Yi InnovIndia 2020',
    org: 'Yi Kolkata, Confederation of Indian Industry (CII)',
    date: 'Jul 2020',
    note: 'National innovation contest',
  },
  {
    title: 'Winner — Ureckon Hackathon',
    org: 'University of Engineering and Management (UEM)',
    date: 'Feb 2020',
    note: 'Inter-college hackathon',
  },
  {
    title: 'Top 10 Finalist — Semicolon Hackathon',
    org: 'SAP',
    date: 'Oct 2019',
    note: 'National hackathon finalist',
  },
  {
    title: 'Winner — Nirvana 2019, Wennovare',
    org: 'Institute of Engineering and Management (IEM)',
    date: 'Apr 2019',
    note: 'Innovation showcase',
  },
]

export const education = {
  degree: 'Bachelor of Computer Applications (BCA)',
  institution: 'Institute of Engineering and Management (IEM)',
  university: 'Maulana Abul Kalam Azad University of Technology (MAKAUT)',
  location: 'Kolkata, India',
  period: 'Aug 2018 — Jul 2021',
  cgpa: '8.51 / 10',
}
