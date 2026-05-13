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
    "Lately I've been learning AI deeply — building agents, exploring how far Claude Code can take a curious engineer's workflow, and rethinking what \"productivity\" means when an LLM can write the boilerplate. Looking for the next interesting problem — AI infrastructure, gen AI, full-stack, backend, cloud, DevOps. Somewhere the work is real and the people are sharp.",
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
      'Owner of HIPAA-compliant AI pipelines, identity resolution at scale, and the vendor compliance platform — architecture through production.',
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
    tagline: 'HIPAA-conformant redaction → two-tier knowledge base with hybrid retrieval',
    category: ['AI', 'Cloud', 'Backend', 'Data'],
    year: '2025',
    featured: true,
    problem:
      "Law firms wanted AI-assisted analysis of case outcomes and legal strategy, but couldn't feed raw documents into any LLM without first removing PII and PHI at scale. And once cleaned, the corpus was still too large for naïve vector search to be useful — legal queries mix keyword precision (statute names, case numbers) with semantic intent.",
    solution:
      "Built end-to-end in two stages. Stage 1: a HIPAA-compliant redaction pipeline (AWS Textract OCR → Step Functions → parallel ECS Fargate workers running Microsoft Presidio) de-identifying 1M+ files / 20M+ pages. Stage 2: a two-tier knowledge base over the cleaned corpus. Lambdas + Bedrock extract structured metadata (case type, outcome, jurisdiction) into Postgres so we pre-filter before any vector search. An ECS batch job hierarchically chunks documents — paragraph-level for embedding precision, parent sections returned to the LLM for context. Embeddings go through Bedrock Titan to keep everything inside the AWS compliance boundary. OpenSearch handles hybrid retrieval (BM25 + semantic). A FastAPI service ties it all together: metadata filter → hybrid search → parent fetch → re-rank → LLM answer.",
    challenge:
      "HIPAA conformance ruled out third-party embedding services, so the whole AI stack had to live inside AWS. Naïve vector search doesn't scale to 20M+ pages — the metadata pre-filter is what makes retrieval tractable. Hybrid BM25+semantic matters because legal queries are neither purely keyword nor purely semantic. Hierarchical chunking gives the embedder focused passages while the LLM still gets enough surrounding context to reason about case outcomes.",
    impact:
      "Lawyers query case outcomes in natural language — \"show me cases like X with outcome Y in jurisdiction Z\" — and get cited passages in seconds. Everything stays within the AWS compliance boundary; nothing leaves.",
    scale: '1M+ files · 20M+ pages · hybrid (BM25 + vector) retrieval · HIPAA end-to-end',
    stack: [
      'AWS Textract', 'AWS Step Functions', 'ECS Fargate', 'Microsoft Presidio',
      'AWS Lambda', 'Amazon Bedrock (Titan)', 'Amazon OpenSearch', 'PostgreSQL',
      'FastAPI', 'Python', 'Terraform',
    ],
    metrics: [
      { label: 'Pages de-identified', value: '20M+' },
      { label: 'Files', value: '1M+' },
      { label: 'Retrieval', value: 'Hybrid' },
      { label: 'Compliance', value: 'HIPAA · AWS-only' },
    ],
  },
  {
    slug: 'vendor-compliance-portal',
    title: 'Vendor Compliance Portal',
    tagline: 'Self-service portal for vendor onboarding, creative approval, and audit-ready PDF reporting',
    category: ['Backend', 'Cloud', 'Full Stack'],
    year: '2025',
    featured: true,
    problem:
      'Compliance and creative-approval workflows for 200+ vendors were spread across email, a single Google Sheet, ad-hoc Google Drive uploads, and manually-linked Asana tasks — with one admin parsing emails and pasting fields into the sheet by hand. No validation, no notifications, no audit trail, no way to scale.',
    solution:
      'Multi-tenant FastAPI portal on ECS Fargate with role-based access (admin + vendor). Vendors sign in, submit Creative Approval Requests with required fields (campaign, source, dates, creative type), and upload multiple files to S3. Admins review in a filterable dashboard (vendor, status, date, type, approver). Bi-directional comment threads handle revisions; the portal emails both sides at every step. On approval or rejection, the record locks for audit and a Lambda generates an audit-ready PDF report (request metadata + creative thumbnails), stored in S3 and listed in a Reports section. Terraform-provisioned end to end.',
    challenge:
      'Modeling the approval workflow so non-technical vendors could self-serve — multi-file uploads, validated submissions, comment loops, revision tracking, all without training. Generating audit-ready PDFs with thumbnails from heterogeneous file types. Email loops that keep both sides synced without spamming.',
    impact:
      'Cut admin processing time by ~60%. Replaced four separate tools (email, Google Sheets, Drive, Asana) with a single source of truth and a searchable, locked audit trail. 200+ vendors now self-serve.',
    scale: '200+ vendors · S3-backed file storage · audit-ready PDF reporting · locked records',
    stack: ['FastAPI', 'Python', 'ECS Fargate', 'AWS Lambda', 'S3', 'PostgreSQL', 'Terraform', 'Role-based auth'],
    metrics: [
      { label: 'Vendors', value: '200+' },
      { label: 'Admin time saved', value: '~60%' },
      { label: 'Tools replaced', value: '4' },
      { label: 'Audit trail', value: 'Locked' },
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
      "Reconciling identities across millions of records from heterogeneous sources — different schemas, conflicting fields, duplicate entries — into a clean reference dataset for downstream analytics and matching workflows.",
    solution:
      'EMR Serverless running Spark jobs orchestrated by Lambda. Elastic scale without managing a cluster, batched partition processing, and a deterministic match layer that survives real-world data drift.',
    challenge:
      "Tuning Spark partition sizing and Lambda orchestration to balance cost vs. SLA on each batch. Validating match quality at scale meant iterating on thresholds against representative edge cases, not just synthetic data.",
    impact:
      "Became foundational data infrastructure — fed analytics, reporting, and downstream business logic that depended on a single source of truth.",
    scale: '10M+ records processed · serverless Spark · cost-tuned batches',
    stack: ['AWS EMR Serverless', 'Apache Spark', 'AWS Lambda', 'Python', 'Terraform'],
    metrics: [
      { label: 'Records', value: '10M+' },
      { label: 'Spark on', value: 'Serverless' },
      { label: 'Cluster mgmt', value: 'Zero' },
    ],
  },
  {
    slug: 'legal-reference-rag',
    title: 'Legal Reference Knowledge Base',
    tagline: 'Earlier RAG over 10+ legal reference books — LangChain + Pinecone',
    category: ['AI', 'Backend'],
    year: '2023',
    problem:
      'Lawyers spent hours searching across reference books for specific precedents — keyword search across PDFs didn\'t cut it.',
    solution:
      'Indexed 10+ legal reference books with LangChain — recursive text splitting into thousands of retrievable chunks, embedded via OpenAI, stored in Pinecone, retrieved by cosine similarity for natural-language Q&A.',
    challenge:
      'Tuning chunk size and retrieval thresholds so the right passage surfaced out of thousands of candidates — without over-fetching unrelated context.',
    impact:
      "An earlier proof-of-concept that proved the value before the team committed to a HIPAA-conformant, in-house architecture for the bigger case-file corpus (see AI Legal Intelligence Platform).",
    scale: '10+ reference books · thousands of retrievable chunks',
    stack: ['LangChain', 'Pinecone', 'OpenAI Embeddings', 'Python', 'FastAPI'],
    metrics: [
      { label: 'Books indexed', value: '10+' },
      { label: 'Retrieval', value: 'Cosine sim' },
    ],
  },
  {
    slug: 'ehr-records-platform',
    title: 'EHR Records Aggregation Platform',
    tagline: 'Lambda-based system aggregating electronic health records from Epic, Cerner, and external services',
    category: ['Cloud', 'Backend', 'Healthcare'],
    year: '2021-2024',
    problem:
      "A healthcare-data client needed to aggregate electronic health records from major EHR systems (Epic, Cerner) and route them into standardized claimant documents — at volumes manual workflows couldn't handle.",
    solution:
      'Owned the AWS infrastructure end to end. Built 20+ Java Lambda functions (with Thymeleaf templates, provisioned via CDK) rendering aggregated EHR data into standardized PDFs, plus 10+ event-driven Python Lambda apps integrating Salesforce, Twilio, SendGrid, and SignalWire.',
    challenge:
      'Guaranteeing at-least-once processing at scale — idempotent handlers, dead-letter queues, exponential backoff — across thousands of invocations per day, with WAF + Cognito protecting the API layer.',
    impact:
      "Codified 100% of resources in CloudFormation + CDK across 5+ AWS accounts. Manual provisioning errors went to zero. The client's records-retrieval product runs on this pipeline.",
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
    tagline: 'Self-hosted HIPAA-conformant telehealth platform on AWS EC2',
    category: ['Cloud', 'Backend', 'Healthcare'],
    year: '2022-2024',
    problem:
      'Healthcare clients needed secure remote consultations without sending PHI through third-party SaaS — and without taking on the operational complexity of a managed telehealth vendor.',
    solution:
      "Built a self-hosted HIPAA-conformant telehealth platform on AWS EC2 using Jitsi (video) + Jibri (server-side recording), with encrypted S3 storage for session recordings and full ownership of TLS, access control, and retention policy.",
    challenge:
      "Self-hosting telehealth means owning the entire security surface — TLS termination, recording encryption, S3 access policies, room authorization, retention. None of the convenience of a managed vendor; all of the responsibility.",
    impact:
      "Clinical teams got a secure consultation tool with zero PHI leaving their cloud boundary. The platform handled the load and held up under audit.",
    scale: '50+ concurrent consultations · encrypted recording archive · HIPAA-conformant',
    stack: ['AWS EC2', 'Jitsi', 'Jibri', 'S3', 'TLS', 'Linux', 'Ansible'],
    metrics: [
      { label: 'Concurrent calls', value: '50+' },
      { label: 'PHI leaks', value: '0' },
      { label: 'Compliance', value: 'HIPAA' },
    ],
  },
  {
    slug: 'pharmacy-analytics-etl',
    title: 'Pharmacy Analytics ETL Pipeline',
    tagline: 'Nightly cross-network sync from on-prem MSSQL → AWS RDS → client dashboards',
    category: ['Cloud', 'Backend', 'Data'],
    year: '2025-Present',
    problem:
      "A pharmacy-chain client needed daily visibility into patient onboarding, transaction volume, and revenue growth — but the source data lived in an on-prem Microsoft SQL Server behind their firewall, with no path to surface it cleanly to leadership.",
    solution:
      "Built a nightly ETL pipeline syncing ~5K rows/day from on-prem MSSQL to an AWS RDS analytics database via scheduled Windows middleware jobs. Connected to Google Data Studio for client-facing dashboards tracking onboarding, transactions, and monthly revenue.",
    challenge:
      "Cross-network sync from a firewalled on-prem database into AWS — without exposing the source DB or punching arbitrary firewall holes. Scheduled jobs that fail closed and surface their status loudly enough that issues get caught the next morning, not the next quarter.",
    impact:
      "Client leadership now opens a dashboard each morning with the prior day's numbers, instead of waiting on a manual export. Onboarding bottlenecks and revenue trends surface in days, not weeks.",
    scale: '~5K rows/day · nightly schedule · client-facing dashboards',
    stack: ['Microsoft SQL Server', 'AWS RDS', 'Windows middleware', 'Google Data Studio', 'Scheduled jobs'],
    metrics: [
      { label: 'Rows / day', value: '~5K' },
      { label: 'Cadence', value: 'Nightly' },
      { label: 'Audience', value: 'Client-facing' },
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
