# CI/CD Setup Guide

Quick start guide to configure GitHub Actions for automatic deployment.

## Prerequisites

- GitHub repository with the code
- Production server with SSH access
- Node.js and pnpm installed on server
- Systemd service configured (see [DEPLOYMENT.md](./DEPLOYMENT.md))

## Setup Steps

### 1. Get Server Information

On your production server, run:

```bash
# Get SSH private key
cat /root/.ssh/id_ed25519
```

Copy the entire output including the BEGIN and END lines.

### 2. Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these four secrets:

| Secret Name | Value | Example |
|------------|-------|---------|
| `SERVER_HOST` | Your server IP or domain | `185.123.45.67` or `unipark.uz` |
| `SERVER_USER` | SSH username | `root` |
| `SSH_PRIVATE_KEY` | Full private key from step 1 | Paste entire key content |
| `SERVER_PORT` | SSH port (optional) | `22` |

### 3. Test the Setup

Push any change to the main branch:

```bash
git add .
git commit -m "test: CI/CD setup"
git push origin main
```

### 4. Monitor Deployment

1. Go to **Actions** tab in GitHub
2. Watch the "Deploy to Production" workflow
3. Wait for all steps to complete (usually 2-5 minutes)
4. Check your site at http://unipark.uz

## What Gets Deployed Automatically

✅ Every push to `main` or `master` branch triggers:
- ESLint code quality checks
- Build verification
- Deployment to production server
- Service restart
- Health check
- Deployment notifications

## Available Workflows

### 1. Production Deployment
**File**: [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)
- Triggers: Push to main/master, manual dispatch
- Runs: Tests → Build → Deploy → Verify

### 2. Pull Request Testing
**File**: [`.github/workflows/test.yml`](./.github/workflows/test.yml)
- Triggers: All pull requests
- Runs: Lint → Build → Comment on PR

### 3. Performance Monitoring
**File**: [`.github/workflows/lighthouse.yml`](./.github/workflows/lighthouse.yml)
- Triggers: Pull requests, manual
- Runs: Lighthouse performance audit

### 4. Security Scanning
**File**: [`.github/workflows/security.yml`](./.github/workflows/security.yml)
- Triggers: Weekly schedule, dependency changes
- Runs: Security audit → Create issues if needed

## Manual Deployment

Deploy without pushing code:

1. Go to **Actions** tab
2. Select **Deploy to Production**
3. Click **Run workflow**
4. Select branch and click **Run workflow**

## Troubleshooting

### ❌ "Permission denied (publickey)"

**Problem**: SSH authentication failed

**Solution**:
1. Verify `SSH_PRIVATE_KEY` secret is correct
2. Check public key is in server's authorized_keys:
   ```bash
   cat /root/.ssh/id_ed25519.pub >> /root/.ssh/authorized_keys
   chmod 600 /root/.ssh/authorized_keys
   ```

### ❌ "ESLint failed"

**Problem**: Code quality issues

**Solution**:
```bash
# Fix automatically
pnpm exec eslint . --fix

# Or review and fix manually
pnpm exec eslint .
```

### ❌ "Build failed"

**Problem**: Build errors in code

**Solution**:
```bash
# Test build locally
pnpm run build

# Fix errors shown in output
```

### ❌ "Service restart failed"

**Problem**: Server service won't start

**Solution**:
```bash
# Check service status
systemctl status unipark

# Check logs
journalctl -u unipark -n 50

# Restart manually
systemctl restart unipark
```

### ❌ "Connection timeout"

**Problem**: Can't connect to server

**Solution**:
1. Verify `SERVER_HOST` is correct
2. Check `SERVER_PORT` (should be 22 unless custom)
3. Ensure server firewall allows SSH connections

## Next Steps

### Enable HTTPS

After basic CI/CD is working, secure your site:

```bash
# On server
apt install certbot python3-certbot-nginx -y
certbot --nginx -d unipark.uz -d www.unipark.uz
```

See [DEPLOYMENT.md](./DEPLOYMENT.md#sslhttps-setup) for details.

### Set Up Staging Environment

Create a staging workflow:

1. Copy `.github/workflows/deploy.yml` to `deploy-staging.yml`
2. Change branch trigger to `staging`
3. Add new secrets for staging server
4. Update deployment path

### Enable Slack/Discord Notifications

Add webhook notifications on deployment:

1. Get webhook URL from Slack/Discord
2. Add as GitHub secret: `SLACK_WEBHOOK`
3. Add notification step to workflow

### Add Database Backups

If using a database:

1. Create backup script
2. Add to workflow before deployment
3. Store backups in safe location

## Resources

- [Full Deployment Guide](./DEPLOYMENT.md)
- [Workflows Documentation](./.github/workflows/README.md)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Nuxt Deployment Guide](https://nuxt.com/docs/getting-started/deployment)

## Support

If you encounter issues:

1. Check workflow logs in GitHub Actions tab
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section
3. Check server logs: `journalctl -u unipark -f`
4. Verify all secrets are correctly set

---

**Last Updated**: 2025-12-17
**Status**: ✅ Ready for production use
