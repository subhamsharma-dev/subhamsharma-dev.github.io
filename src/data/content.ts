// Centralized content — single source of truth pulled from resume.
// Keeps components clean and lets you update facts in one place.

export const profile = {
  name: 'Subham Sharma',
  shortName: 'Subham',
  initials: 'SS',
  role: 'Software Engineer',
  tagline: 'AI Infrastructure · Cloud Systems · Distributed Backend',
  location: 'Bengaluru, India',
  timezone: 'IST (UTC+5:30)',
  email: 'ksubham.sharma@gmail.com',
  phone: '+91 90511 37398',
  linkedin: 'https://linkedin.com/in/subham-sharma1512',
  github: 'https://github.com/subhamsharma-dev',
  resumeUrl: '/Subham_Sharma_Resume.pdf',
  available: true,
  yearsExperience: '4+',
  // Hero rotating role text
  rotatingRoles: [
    'AI Infrastructure Engineer',
    'Cloud Systems Architect',
    'Distributed Systems Builder',
    'Backend Platform Engineer',
    'HIPAA & SOC 2 Engineer',
  ],
}

export const heroStats = [
  { label: 'Years Experience', value: '4+', sub: 'Full-time at White Blink' },
  { label: 'Records Processed', value: '10M+', sub: 'Identity resolution pipeline' },
  { label: 'Pages OCR', value: '20M+', sub: 'HIPAA legal redaction' },
  { label: 'Repos Migrated', value: '30+', sub: 'CodeCommit → GitHub' },
  { label: 'Production Uptime', value: '99%', sub: 'Post-modernization' },
  { label: 'AWS Cost Reduced', value: '35%', sub: 'FinOps right-sizing' },
]

export const recruiterCards = [
  {
    title: 'AI / LLM Engineering',
    icon: 'Sparkles',
    blurb: 'Production RAG pipelines, agentic LLMs with LangGraph, vector DBs, and private Azure OpenAI deployments serving real teams.',
    proof: 'Served 10M+ inference tokens',
  },
  {
    title: 'AWS & Azure Expertise',
    icon: 'Cloud',
    blurb: 'Multi-cloud architecture across 5+ accounts. Serverless, event-driven, ECS Fargate, Step Functions, EMR Serverless.',
    proof: '30+ AWS services in production',
  },
  {
    title: 'Backend Systems',
    icon: 'Server',
    blurb: 'Python, FastAPI, Java. Microservices, async processing, idempotency, retry semantics, OAuth2, observability.',
    proof: 'Thousands of Lambda invocations/day',
  },
  {
    title: 'Distributed Architecture',
    icon: 'Network',
    blurb: 'Event-driven systems with SQS, Step Functions, Spark on EMR Serverless. Designed for at-least-once processing.',
    proof: '10M+ records identity resolution',
  },
  {
    title: 'HIPAA / SOC 2',
    icon: 'ShieldCheck',
    blurb: 'PII/PHI de-identification with Presidio. SOC 2 controls — encryption, audit, bastion access. Zero major audit findings.',
    proof: 'HIPAA-conformant telehealth platform',
  },
  {
    title: 'Production Scale',
    icon: 'Activity',
    blurb: 'Lifted uptime to 99% migrating monolith to ECS. Replaced manual workflows for 200+ vendors with custom portal.',
    proof: '~60% admin time saved',
  },
  {
    title: 'Team Mentorship',
    icon: 'Users',
    blurb: 'Mentored 7+ interns and junior developers across cohorts. Owned task assignment, code reviews, onboarding.',
    proof: 'Multi-cohort ownership',
  },
  {
    title: 'DevOps & IaC',
    icon: 'Workflow',
    blurb: 'Terraform, AWS CDK, CloudFormation, Ansible. 100% of resources codified at one role. Blue-green deployments.',
    proof: '30+ repos migrated cleanly',
  },
]

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
      'Lead engineer on HIPAA-compliant AI pipelines, identity resolution at scale, and vendor compliance platforms. Production ownership across AI, infra, and business-critical systems.',
    highlights: [
      'Engineered a HIPAA-compliant legal document redaction pipeline (PoC → prod) processing 1M+ scanned case files / 20M+ pages — AWS Textract for OCR, Step Functions orchestrating parallel ECS Fargate tasks, Microsoft Presidio for PII/PHI de-identification.',
      'Provisioned AWS infra for an identity resolution pipeline — EMR Serverless (Apache Spark) + Lambda job orchestration — processing 10M+ records.',
      'Built a nightly ETL pipeline syncing ~5K rows/day from on-prem MSSQL → AWS RDS analytics, surfaced via Google Data Studio dashboards.',
      'Architected a vendor compliance portal for 200+ vendors — FastAPI on ECS Fargate, Lambda PDF generation, Terraform IaC. Cut admin time ~60%.',
      'Deployed a private internal GenAI platform on OpenWebUI + Azure OpenAI — adopted by 10+ legal team members with zero third-party data exposure.',
      'Migrated 30+ repos from AWS CodeCommit → GitHub preserving full commit history, metadata, and branch structures.',
      'Mentored 7+ interns, junior devs, and new hires across cohorts — code reviews, onboarding, deployment practices.',
    ],
    stack: ['AWS Textract', 'Step Functions', 'ECS Fargate', 'EMR Serverless', 'Spark', 'FastAPI', 'Presidio', 'Terraform', 'Azure OpenAI'],
  },
  {
    role: 'Software Development Engineer I',
    company: 'White Blink',
    location: 'Bengaluru, India',
    period: 'Apr 2022 — Mar 2025',
    summary:
      'Owned serverless architecture, multi-cloud infrastructure, AI knowledge bases, and SOC 2 compliance. Modernized a monolith and shipped 10+ event-driven applications.',
    highlights: [
      'Deployed and maintained self-hosted n8n on AWS EC2 (Ansible + Docker Compose + Caddy TLS) — 10+ workflows for client data pipelines.',
      'Engineered a semantic legal knowledge base — LangChain + Pinecone + OpenAI Embeddings — indexing 10+ books into retrievable chunks with cosine similarity retrieval.',
      'Built a document AI platform on Azure using FastAPI processing veteran disability records — OCR → chunking → embeddings → structured LLM extraction.',
      'Reduced monthly AWS cost by 35% via Compute Optimizer right-sizing, idle resource elimination, S3 lifecycle policies, Savings Plans.',
      'Orchestrated multi-cloud infra across AWS + Azure (5+ accounts) — IAM, Entra ID, VPC/VNet, EC2, ECS, Lambda, App Service.',
      'Architected & deployed 10+ HA event-driven serverless apps on Lambda — API Gateway, WAF, SQS+DLQ, Cognito, idempotent handlers, exponential backoff.',
      'Drove SOC 2 controls — encryption, threat monitoring, audit logging, bastion-host access. Successful audits with no major findings.',
      'Led modernization from Elastic Beanstalk → ECS Services + Scheduled Tasks. Production uptime to 99%. Prometheus + Grafana observability.',
      'Owned frontend dev + deployment for 4 internal SaaS products (HireHoc, FormCue, OnboardFast, CompanyCrunch) — 20+ features shipped.',
      'Deployed a HIPAA-conformant telehealth platform on EC2 with Jitsi + Jibri — 50+ concurrent secure consultations, encrypted S3 recordings.',
      'Eliminated 100% of manual SSL renewals across 15+ domains via Certbot automation — prevented 3 recurring HTTPS outages/year.',
    ],
    stack: ['AWS Lambda', 'Terraform', 'CloudFormation', 'LangChain', 'Pinecone', 'Azure OpenAI', 'ECS', 'Prometheus', 'Grafana', 'Ansible'],
  },
  {
    role: 'Associate Software Engineer',
    company: 'White Blink',
    location: 'Bengaluru, India',
    period: 'Jul 2021 — Mar 2022',
    summary:
      'Built Lambda-based clinical document automation, codified infrastructure, and owned multi-account AWS environments.',
    highlights: [
      'Built 20+ AWS Lambda functions in Java with Thymeleaf templates (provisioned via AWS CDK) — render aggregated medical records from US EHR systems (Epic, Cerner) into standardized PDFs.',
      'Owned AWS infra across 5+ accounts — codified 100% of resources in CloudFormation + CDK. Manual provisioning errors → zero.',
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
      'Built a server-side PHP-based dynamic PDF generation engine for client-facing document rendering.',
    ],
    stack: ['PHP', 'JavaScript', 'PDF Generation'],
  },
]

export type Project = {
  slug: string
  title: string
  tagline: string
  category: ('AI' | 'Cloud' | 'Backend' | 'Full Stack' | 'Data')[]
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
  {
    slug: 'econatlas',
    title: 'EconAtlas',
    tagline: 'Economic Intelligence Platform — real-time market data, agentic LLM, self-hosted',
    category: ['AI', 'Backend', 'Full Stack', 'Data'],
    year: '2026',
    featured: true,
    problem:
      'Retail investors lack a unified, real-time view of stocks, indices, commodities, crypto, IPOs, and macro events — and existing tools don\'t let you ask natural-language questions over your watchlist.',
    solution:
      'Self-hosted full-stack platform ingesting ~100K+ data points daily from 10+ APIs with an agentic LLM (Artha) that runs function-calling tools over your data.',
    challenge:
      'Orchestrating 30+ scheduled jobs at minute-level granularity while keeping the LLM agent responsive with SSE token streaming and RAG over a pgvector store — all running on a single on-prem desktop exposed safely via Cloudflare Tunnel.',
    impact:
      'A personal analyst that ships push notifications throughout the trading day and answers complex portfolio questions with cited data.',
    scale: '~100K+ data points/day · 2000+ stocks · 6000+ MFs · 10M+ inference tokens served',
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
    slug: 'legal-redaction',
    title: 'HIPAA Legal Redaction Pipeline',
    tagline: 'PoC → prod pipeline de-identifying 20M+ pages of legal documents',
    category: ['AI', 'Cloud', 'Data'],
    year: '2025',
    featured: true,
    problem:
      'Law firms need to de-identify PII/PHI from millions of scanned case files before any AI analysis — manually impossible, regulatorily mandatory.',
    solution:
      'Parallel pipeline: AWS Textract OCR → Step Functions orchestration → ECS Fargate workers running Microsoft Presidio for PII/PHI detection and redaction.',
    challenge:
      'Coordinating thousands of parallel OCR+redaction tasks across heterogeneous document types while maintaining HIPAA-conformant data handling end-to-end.',
    impact:
      'Unlocked AI-driven analysis of case outcomes and legal strategy on a corpus that was previously off-limits.',
    scale: '1M+ scanned files · 20M+ pages · HIPAA-compliant end-to-end',
    stack: ['AWS Textract', 'AWS Step Functions', 'ECS Fargate', 'Microsoft Presidio', 'Python', 'Terraform'],
    metrics: [
      { label: 'Pages processed', value: '20M+' },
      { label: 'Files', value: '1M+' },
      { label: 'Compliance', value: 'HIPAA' },
    ],
  },
  {
    slug: 'identity-resolution',
    title: 'Identity Resolution Pipeline',
    tagline: 'EMR Serverless Spark + Lambda orchestration over 10M+ records',
    category: ['Cloud', 'Backend', 'Data'],
    year: '2025',
    featured: true,
    problem:
      'Reconciling identities across millions of records from heterogeneous sources for analytics and matching.',
    solution:
      'EMR Serverless running Spark jobs orchestrated by Lambda — scales elastically without managing clusters.',
    challenge:
      'Tuning Spark partitions and Lambda job orchestration to keep cost low while delivering on SLA for batch resolution.',
    impact:
      'Reliable, scalable record-matching that became a foundational data asset.',
    scale: '10M+ records processed',
    stack: ['AWS EMR Serverless', 'Apache Spark', 'AWS Lambda', 'Python', 'Terraform'],
    metrics: [
      { label: 'Records', value: '10M+' },
      { label: 'Spark on', value: 'Serverless' },
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
      'Compliance tracking for 200+ vendors was manual, error-prone, and slow.',
    solution:
      'FastAPI on ECS Fargate with role-based vendor and admin portals, automated email notifications, Lambda-based PDF generation, Terraform-provisioned infra.',
    challenge:
      'Modeling complex compliance workflows while keeping the UX simple for non-technical vendors.',
    impact:
      'Cut admin processing time by ~60% and gave vendors a self-service path to compliance.',
    scale: '200+ vendors · automated PDF + email pipelines',
    stack: ['FastAPI', 'Python', 'ECS Fargate', 'AWS Lambda', 'Terraform', 'PostgreSQL'],
    metrics: [
      { label: 'Vendors', value: '200+' },
      { label: 'Admin time saved', value: '~60%' },
    ],
  },
  {
    slug: 'legal-knowledge-base',
    title: 'AI Legal Knowledge Base',
    tagline: 'Semantic RAG over 10+ legal reference books',
    category: ['AI', 'Backend'],
    year: '2023',
    problem:
      'Lawyers spend hours searching across reference books for specific precedents — keyword search doesn\'t cut it.',
    solution:
      'LangChain + Pinecone + OpenAI Embeddings — recursive text splitting, cosine similarity retrieval, natural-language Q&A over the corpus.',
    challenge:
      'Chunking strategy and retrieval tuning to surface the right passage out of thousands of candidates.',
    impact:
      'Lawyers now query the corpus in natural language and get relevant passages in seconds.',
    scale: '10+ legal reference books · thousands of retrievable chunks',
    stack: ['LangChain', 'Pinecone', 'OpenAI Embeddings', 'Python', 'FastAPI'],
    metrics: [
      { label: 'Books indexed', value: '10+' },
      { label: 'Retrieval', value: 'Cosine sim' },
    ],
  },
  {
    slug: 'attendify',
    title: 'Attendify',
    tagline: 'Cross-platform Flutter attendance & assessment app',
    category: ['Full Stack'],
    year: '2021',
    problem:
      'Schools needed an end-to-end mobile workflow for attendance, leave, and timed assessments — both for students and teachers.',
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
