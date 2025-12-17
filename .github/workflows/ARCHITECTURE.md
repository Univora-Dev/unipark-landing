# CI/CD Architecture

Visual overview of the CI/CD pipeline for UniPark Landing.

## Pipeline Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         DEVELOPER                               │
│                                                                 │
│  git add . → git commit -m "..." → git push origin main        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GITHUB REPOSITORY                            │
│                                                                 │
│  Push to main/master branch detected                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   GITHUB ACTIONS RUNNER                         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  JOB 1: TEST                                             │  │
│  │  ├── Checkout code                                       │  │
│  │  ├── Setup Node.js + pnpm                                │  │
│  │  ├── Install dependencies                                │  │
│  │  ├── Run ESLint ✓                                        │  │
│  │  └── Build application ✓                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         │                                       │
│                         │ Tests passed                          │
│                         ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  JOB 2: DEPLOY (needs: test)                            │  │
│  │  ├── Checkout code                                       │  │
│  │  ├── Setup Node.js + pnpm                                │  │
│  │  ├── Install dependencies                                │  │
│  │  ├── Build application                                   │  │
│  │  ├── SSH to production server ─────────────────┐         │  │
│  │  └── Verify deployment                         │         │  │
│  └─────────────────────────────────────────────────┼─────────┘  │
└────────────────────────────────────────────────────┼─────────────┘
                                                     │
                                                     │ SSH Connection
                                                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                   PRODUCTION SERVER                             │
│                   (unipark.uz)                                  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  DEPLOYMENT SCRIPT                                       │  │
│  │  ├── cd /root/projects/unipark-landing                   │  │
│  │  ├── git pull origin main                                │  │
│  │  ├── pnpm install --frozen-lockfile                      │  │
│  │  ├── pnpm run build                                      │  │
│  │  ├── systemctl restart unipark                           │  │
│  │  └── systemctl status unipark                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         │                                       │
│                         ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  SYSTEMD SERVICE (unipark.service)                       │  │
│  │  ├── Nuxt app running on port 3000                       │  │
│  │  ├── Auto-restart on failure                             │  │
│  │  └── Logs: journalctl -u unipark                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         │                                       │
│                         ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  NGINX REVERSE PROXY                                     │  │
│  │  ├── Listens on port 80/443                              │  │
│  │  ├── Proxies to localhost:3000                           │  │
│  │  ├── Serves static assets                                │  │
│  │  └── Gzip compression enabled                            │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                        END USERS                                │
│                                                                 │
│  Access site at: http://unipark.uz                             │
└─────────────────────────────────────────────────────────────────┘
```

## Workflow Files

### Primary Workflows

```
deploy.yml (Production)
├── Trigger: Push to main/master, manual
├── Jobs:
│   ├── test
│   │   ├── Checkout
│   │   ├── Setup
│   │   ├── Lint (ESLint)
│   │   └── Build
│   └── deploy (needs: test)
│       ├── Build
│       ├── SSH Deploy
│       ├── Verify
│       └── Notify
└── Secrets: SERVER_HOST, SERVER_USER, SSH_PRIVATE_KEY, SERVER_PORT
```

```
test.yml (Pull Requests)
├── Trigger: PRs to main/master, feature branches
├── Jobs:
│   └── lint-and-test
│       ├── Checkout
│       ├── Setup
│       ├── Lint
│       ├── Build
│       └── Comment on PR
└── Secrets: None (uses GITHUB_TOKEN)
```

### Monitoring Workflows

```
lighthouse.yml (Performance)
├── Trigger: PRs, manual
├── Jobs:
│   └── lighthouse
│       ├── Build
│       ├── Start preview
│       ├── Run Lighthouse
│       ├── Upload artifacts
│       └── Comment results
└── Secrets: None
```

```
security.yml (Dependency Audit)
├── Trigger: Weekly schedule, dependency changes
├── Jobs:
│   └── security-check
│       ├── pnpm audit
│       ├── Check outdated
│       ├── Create issue (if vulnerabilities)
│       └── Comment on PR
└── Secrets: None (uses GITHUB_TOKEN)
```

## Deployment Methods Comparison

### Method 1: Git Pull (Current)

```
GitHub Actions Runner          Production Server
─────────────────────         ─────────────────
    Build & Test    ──SSH──►    Git Pull
                                   │
                                   ▼
                                Build App
                                   │
                                   ▼
                              Restart Service
```

**Pros:**
- Less GitHub Actions minutes used
- Smaller data transfer
- Git history on server

**Cons:**
- Slower (builds on server)
- Requires build tools on server
- Longer downtime

### Method 2: Rsync (Alternative)

```
GitHub Actions Runner          Production Server
─────────────────────         ─────────────────
    Build & Test
         │
         ▼
    Build App
         │
         ▼
    Rsync Files  ───SSH──►    Receive Files
                                   │
                                   ▼
                              Restart Service
```

**Pros:**
- Faster deployment
- No build tools needed on server
- Consistent builds

**Cons:**
- More GitHub Actions minutes
- Larger data transfer
- No git history on server

## Security Flow

```
┌────────────────────────────────────────────────────────────┐
│  SSH Authentication                                        │
│                                                            │
│  GitHub Secrets                                            │
│  ├── SSH_PRIVATE_KEY (encrypted at rest)                  │
│  │                                                         │
│  └── Loaded into Actions Runner ──────┐                   │
│                                        │                   │
│                                        ▼                   │
│  ┌─────────────────────────────────────────────┐         │
│  │  SSH Connection                              │         │
│  │  ├── Private key from secret                 │         │
│  │  ├── Authorized_keys on server               │         │
│  │  ├── Connection established                  │         │
│  │  └── Commands executed securely              │         │
│  └─────────────────────────────────────────────┘         │
└────────────────────────────────────────────────────────────┘
```

## Notification Flow

```
Deployment Status
       │
       ├─── Success ──►  Commit Comment ✅
       │                 Deployment Summary
       │                 Site URL
       │
       └─── Failure ──►  Commit Comment ❌
                        Error Details
                        Logs Link
```

## Monitoring Points

```
┌──────────────────────────────────────────────────────────────┐
│  Monitoring & Alerts                                         │
│                                                              │
│  ┌────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │  Code Quality  │  │  Performance    │  │  Security    │ │
│  │                │  │                 │  │              │ │
│  │  • ESLint      │  │  • Lighthouse   │  │  • pnpm      │ │
│  │  • Build test  │  │  • Metrics      │  │    audit     │ │
│  │                │  │  • Report       │  │  • Issues    │ │
│  └────────────────┘  └─────────────────┘  └──────────────┘ │
│                                                              │
│  ┌────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │  Deployment    │  │  Service Health │  │  Logs        │ │
│  │                │  │                 │  │              │ │
│  │  • Status      │  │  • HTTP check   │  │  • GitHub    │ │
│  │  • Duration    │  │  • Service up   │  │    Actions   │ │
│  │  • Comments    │  │  • Response     │  │  • systemd   │ │
│  └────────────────┘  └─────────────────┘  └──────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

## Rollback Strategy

```
Issue Detected
      │
      ├─── Quick Fix Available? ─── Yes ──► Push fix ──► Auto-deploy
      │
      └─── No ──► Manual Rollback
                       │
                       ├─── Git: git revert HEAD
                       │         git push
                       │
                       └─── Or Manual:
                              cd /root/projects/unipark-landing
                              git reset --hard <previous-commit>
                              pnpm run build
                              systemctl restart unipark
```

## Scaling Considerations

### Current Setup (Single Server)
```
GitHub Actions ──► Production Server (All-in-one)
```

### Future: Multiple Environments
```
GitHub Actions ──┬──► Staging Server
                 │
                 └──► Production Server
```

### Future: Load Balanced
```
GitHub Actions ──► Load Balancer ──┬──► Server 1
                                    │
                                    ├──► Server 2
                                    │
                                    └──► Server 3
```

## Environment Variables

```
GitHub Secrets (Encrypted)
├── SERVER_HOST ────────► Used for SSH connection
├── SERVER_USER ────────► SSH username
├── SSH_PRIVATE_KEY ────► Authentication
└── SERVER_PORT ────────► SSH port (optional)

Server Environment
├── PNPM_HOME ──────────► pnpm installation path
├── PATH ───────────────► Command search path
└── NODE_ENV ───────────► production
```

## Workflow Triggers Summary

| Event | deploy.yml | test.yml | lighthouse.yml | security.yml |
|-------|-----------|----------|----------------|--------------|
| Push to main | ✅ | ❌ | ❌ | ❌ |
| Push to feature | ❌ | ✅ | ❌ | ❌ |
| Pull Request | ❌ | ✅ | ✅ | Conditional |
| Schedule | ❌ | ❌ | ❌ | ✅ (Weekly) |
| Manual | ✅ | ❌ | ✅ | ✅ |
| Dependency Changes | ❌ | ❌ | ❌ | ✅ |

## Performance Metrics

Typical deployment timeline:

```
0:00 ─ Trigger received
0:10 ─ Runner assigned
0:30 ─ Dependencies installed
1:00 ─ Lint complete
2:00 ─ Build complete (GitHub Actions)
2:10 ─ SSH connection established
2:15 ─ Git pull complete
2:30 ─ Dependencies installed (server)
4:00 ─ Build complete (server)
4:05 ─ Service restarted
4:10 ─ Health check passed
4:15 ─ Deployment complete ✅

Total: ~4-5 minutes
```

---

**Related Documentation:**
- [Workflows README](./README.md) - Detailed workflow descriptions
- [CI/CD Setup Guide](../../CI-CD-SETUP.md) - Setup instructions
- [Deployment Guide](../../DEPLOYMENT.md) - Server configuration
