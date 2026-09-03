# Evgeni Gordeev

**Principal Engineer** · Java · DevOps · AWS · Kubernetes · Python

Minneapolis, MN | [(612) 352-0233](tel:+16123520233) | [evgeni.gordeev@gmail.com](mailto:evgeni.gordeev@gmail.com) | [linkedin.com/in/egordeev](https://www.linkedin.com/in/egordeev) | [github.com/EvgeniGordeev](https://github.com/EvgeniGordeev)

## Professional Summary

Principal Engineer, 18 years' experience. Progressed from Senior Java Developer to sole technical owner of AWS and Kubernetes infrastructure and reliability across three product lines.

Cut AWS spend by 42% (~$275K/year) with no incidents. Took legacy monolith upgrade cycles from 6 months to 6 weeks to 2 weeks. Created an automation framework that reduced post-upgrade defects from 60 to zero and enabled QA Engineers to write tests in plain English. Ran every migration alongside the live system until DNS cutover, completing nine years of upgrades with zero downtime.

Drives projects from conception through production, with a focus on automation, reliability, optimization, and continuous improvement.

## Technical Skills

**Core:** AWS, Kubernetes (EKS), GitLab, GitHub, Java / Spring Boot, Python

**Platform & Reliability:** Karpenter, Helm, Docker, CloudFormation / Terraform, Elasticsearch / Kibana APM, Sentry, Keycloak (OIDC / SSO), AWS API Gateway, AWS WAF, Twingate, SonarQube

**Backend & Data:** Hibernate, Maven, Gradle, REST, MySQL, Postgres / Aurora, Redis / Valkey, RabbitMQ, Oracle DB, Tomcat, JBoss / WildFly, Jetty

**Frontend:** JavaScript, ReactJS, AngularJS, NodeJS, HTML5 / CSS3, Bootstrap

**Tooling:** Cursor, Claude, IntelliJ, Jira, Git

## Professional Experience

### [Traction AG](https://tractionag.com)

**Principal Infrastructure and Site Reliability Engineer** | 01/2024 - Present

In charge of: Conservis / Granular farm management and Traction accounting: AWS and EKS, GitLab CI/CD, observability, disaster recovery, cost, and security posture (zero-trust VPN, endpoint protection, WAF).

#### [Post-acquisition Platform Consolidation](https://tractionag.com)

- Cut the AWS bill 42% (about $275K per year) across three product lines with rightsizing, Karpenter in every environment and spot instances for lower environments and production workers; no incidents
- Consolidated three product lines onto one GitLab CI/CD and EKS foundation; 3 EKS upgrades since with zero downtime, 2 to 3 per year
- Took over Granular Infrastructure, an IP acquisition with no staff, on Jenkins and EKS 1.23; upgraded it to 1.31 and onto the shared pipelines without a handover
- Migrated Traction business from Bitbucket and ECS (manual production deploys) to GitLab and EKS, with Redis to Valkey and RDS 16 to Aurora 17, via parallel environments and a DNS switch; no downtime
- Added Elasticsearch APM and logs collection to about 15 Traction business services in 2 weeks
- Replaced AWS Client VPN with Twingate, cutting VPN cost 55%
- Built a Claude Code skill that maps every environment and cluster (logs, Elasticsearch, Datadog, EKS events) so any Engineer can triage production

*Tools:* GitLab, AWS, EKS, Karpenter, Twingate, CrowdStrike, Elastic | *Tech:* Spring Boot, NodeJS, Python, CloudFormation/Terraform, Aurora, Valkey, Keycloak

**Open source:** [Karpenter drain flow for singleton pods (proposed upstream)](https://github.com/aws/karpenter-provider-aws/pull/9158), [Karpenter drain strategy (proposed upstream)](https://github.com/kubernetes-sigs/karpenter/pull/3013)

### [Conservis (acquired by Traction AG in December 2023)](https://conservis.ag)

**Principal Software Engineer** | 06/2017 - 12/2023

In charge of: Tech Lead for the Java farm-management platform (row crops, permanent crops, analytics) with teams in Minneapolis and Europe; DevOps and SRE from 2020 for about 15 Engineers, covering AWS, Kubernetes, CI/CD, observability, identity and security.

#### [Platform Modernization (RowCrop & PermCrop)](https://conservis.ag/farm-management-software/row-crop-management-software/)

- Led the 2017 Spring Boot upgrade of a ~1M-line monolith unpatched since 2012 (Java 7 to 8, about 100 end-of-life dependencies) and split it into 3 repositories; 6 months, shipped on plan
- Cut new-developer onboarding from 1.5 weeks to about 2 hours (Docker Compose) and replaced manual WAR deploys with blue-green CI/CD and CloudFormation, enabling daily zero-downtime releases
- Introduced SonarQube and tests with every merge across all repositories, raising coverage from 20% to 40%; later upgrades took 6 weeks (2019, zero QA tickets versus 60) and 2 weeks (2021)
- Migrated Elastic Beanstalk to EKS (1.12 to 1.16, no downtime), Bamboo and GitHub to GitLab CI, and Redis, RabbitMQ and ActiveMQ to AWS managed services
- Extracted analytics into a standalone service on Postgres logical replication, refreshing reports in minutes instead of nightly; still in production in 2026
- Replaced New Relic (4 Java apps, production only) with self-hosted Elasticsearch logs and APM for 15 apps in every environment at 87% lower cost; 2 months
- Integrated Sentry, AWS WAF and AWS Client VPN platform-wide, and released kube-asg-node-drainer for zero-downtime node rotation of single-replica workloads

*Tools:* GitLab, AWS, Kubernetes, Helm, Elasticsearch, Sentry | *Tech:* Spring Boot, ReactJS, Django, Postgres

#### QA Automation Framework

- Built a BDD (Behave) framework driven by CSV fixtures so QA Engineers without coding experience could write regression tests; 40 to 45% of regression automated in year one, 80 to 85% later, running nightly
- Brought the release cadence from 4 to 6 weeks down to 2; the next dependency upgrade produced zero QA tickets, down from 60

#### Identity, SSO and Partner API

- Proposed Keycloak SSO with a 2019 proof of concept, led the build at 25% of my time with a developer at 50%, and migrated 12 web apps (2022) and 6 mobile apps (2023) with login-time user migration; no downtime; upgraded Keycloak yearly since 2022
- Delivered a stateless partner API on AWS API Gateway that resolves API keys to SSO users and roles via token-exchange grant type, with tokens and routing managed internally
- Designed multi-grower login so support staff no longer re-authenticates per customer

**Open source:** [django-oidc-provider (merged)](https://github.com/juanifioren/django-oidc-provider/pull/329), [oauth2-proxy (merged)](https://github.com/oauth2-proxy/oauth2-proxy/pulls?q=is%3Apr+author%3AEvgeniGordeev), [Keycloak issues](https://github.com/keycloak/keycloak/issues?q=is%3Aissue+author%3AEvgeniGordeev+), [kube-asg-node-drainer](https://github.com/Conservis/kube-asg-node-drainer), [docker-bind](https://github.com/cytopia/docker-bind/issues/20), [aws-sam-cli](https://github.com/aws/aws-sam-cli/issues/6546#issuecomment-4106882891), [pipeline-trigger](https://gitlab.com/finestructure/pipeline-trigger/-/merge_requests?scope=all&utf8=%E2%9C%93&state=closed&author_username=egordeev)

### [Coherent Solutions Inc.](https://coherentsolutions.com)

**Application Architect** | 07/2014 - 06/2017

Responsibilities: Application design and delivery across client engagements; architectural assessments, proofs of concept, sales support, CI/CD ownership, code quality standards, code review, team and risk management.

#### Client Platforms

- Architected and bootstrapped Spring Boot / JHipster platforms on AWS with CI/CD for ServeMinnesota Reading Corps (36,000 children a year) and for Element Consulting with Twin Cities Orthopedics
- Led the Graco Matrix migration from a Swing client to a web UI and from Spring 2 to Spring Boot
- Ran the architectural assessment of NMDP (Be The Match) in-house systems, producing a refactoring roadmap and introduced Docker as deployable artifact

### [Coherent Solutions Inc.](https://coherentsolutions.com)

**Team Lead** | 06/2011 - 06/2014

Responsibilities: Design, development and legacy maintenance for finance, energy and telematics clients (Spring, Hibernate, GWT); team management, code review and mentoring.

#### API Outsourcing, Intercap, Datalogics, PeopleNet

- Built a configurable web-form engine, an HTML5 responsive UI and cached table navigation for a finance and accounting outsourcing platform; forked Hibernate Audit with custom fixes
- Delivered energy monitoring (Intercap), account management (Datalogics) and vehicle telematics (PeopleNet) applications on Spring, Hibernate and GWT

### Information Technology Alliance (ITA)

**Senior Java Developer** | 08/2010 - 05/2011

Responsibilities: GWT user interface for a Standard Bank of South Africa CRM application; led up to 3 developers.

### Navagate Inc.

**Java Developer** | 01/2008 - 07/2010

Responsibilities: Agility 3.1 to 4.0, a CRM server for the insurance business, including the JDBC-to-Hibernate and JSF transitions, customization and integration; mentored a team of 3.

### Navagate Inc.

**QA Engineer** | 06/2007 - 12/2007

Responsibilities: Smoke, functional and regression testing and test case design for Agility CRM customizations (NY Life).

## Education

**University of Informatics and Radioelectronics (BSUIR)** | 2006 - 2010 | Programming in Economics

**Minsk State Linguistic University** | 2003 - 2008 | Translation & Interpretation (German, English, Dutch)

## Certifications

- **AWS Certified SysOps Administrator - Associate** | Amazon Web Services | 04/2017
- **AWS Certified Developer - Associate** | Amazon Web Services | 03/2017
- **AWS Certified Solutions Architect - Associate** | Amazon Web Services | 10/2016
- **[Oracle Certified Professional, Java EE 5 Web Component Developer](https://www.youracclaim.com/badges/ec755c8b-49e2-4e0e-8029-fbd39d246866)** | Oracle | 04/2011
- **Sun Certified Java Programmer, Java SE 6 (SCJP)** | Sun Microsystems | 10/2009

## Languages

- English: ███████████████████░ 97%
- German: ████████████░░░░░░░░ 60%
- Dutch: ████████░░░░░░░░░░░░ 40%
- Russian: ████████████████████ 99%
