# GitHub Actions Workflows

This directory contains all CI/CD workflows for the UniPark Landing project.

## Available Workflows

### 1. Deploy to Production (`deploy.yml`)

**Triggers:**
- Push to `main` or `master` branch
- Manual dispatch

**What it does:**
1. Runs ESLint checks
2. Builds the application
3. Connects to production server via SSH
4. Pulls latest code and rebuilds on server
5. Restarts the systemd service
6. Verifies deployment with health check
7. Sends notifications on success/failure

**Required Secrets:**
- `SERVER_HOST` - Production server IP or hostname
- `SERVER_USER` - SSH username (typically `root`)
- `SSH_PRIVATE_KEY` - Private SSH key for authentication
- `SERVER_PORT` - SSH port (optional, defaults to 22)

---

### 2. Test and Lint (`test.yml`)

**Triggers:**
- Pull requests to `main` or `master`
- Push to any branch except `main`/`master`

**What it does:**
1. Runs ESLint code quality checks
2. Builds the application to verify no build errors
3. Comments on PR with results

**No secrets required.**

---

### 3. Lighthouse Performance Check (`lighthouse.yml`)

**Triggers:**
- Pull requests to `main` or `master`
- Manual dispatch

**What it does:**
1. Builds the application
2. Starts preview server
3. Runs Lighthouse performance audit
4. Uploads results as artifacts
5. Comments on PR with summary

**No secrets required.**

---

### 4. Security and Dependency Check (`security.yml`)

**Triggers:**
- Weekly schedule (Mondays at 9:00 UTC)
- Manual dispatch
- Changes to `package.json` or `pnpm-lock.yaml` in PRs

**What it does:**
1. Runs `pnpm audit` to check for security vulnerabilities
2. Checks for outdated dependencies
3. Creates GitHub issue if vulnerabilities found (scheduled runs only)
4. Comments on PR if issues detected

**No secrets required.**

---

### 5. Deploy with Rsync (`deploy-rsync.yml.example`)

**Status:** Example file (not active)

**To activate:**
1. Rename to `deploy-rsync.yml`
2. Disable or delete `deploy.yml`

**What it does:**
1. Builds application on GitHub Actions
2. Syncs built files to server using rsync
3. Restarts service
4. Verifies deployment

**When to use:**
- Faster deployments
- Resource-constrained servers
- Avoid building on production server

**Same secrets required as deploy.yml.**

---

## Setup Instructions

### First Time Setup

1. **Add GitHub Secrets:**
   ```
   Repository Settings → Secrets and variables → Actions
   ```

2. **Required secrets for deployment:**
   - `SERVER_HOST`: Your server IP (e.g., `185.123.45.67`)
   - `SERVER_USER`: SSH user (usually `root`)
   - `SSH_PRIVATE_KEY`: Full private key from `/root/.ssh/id_ed25519`
   - `SERVER_PORT`: SSH port (22 is default)

3. **Test the setup:**
   - Make a small change and push to main branch
   - Check Actions tab to see workflow progress

### Manual Deployment

You can trigger deployments manually:

1. Go to **Actions** tab
2. Select **Deploy to Production**
3. Click **Run workflow**
4. Choose branch and click **Run workflow**

---

## Workflow Status Badges

Add these to your README.md:

```markdown
![Deploy](https://github.com/YOUR_USERNAME/unipark-landing/workflows/Deploy%20to%20Production/badge.svg)
![Tests](https://github.com/YOUR_USERNAME/unipark-landing/workflows/Test%20and%20Lint/badge.svg)
![Security](https://github.com/YOUR_USERNAME/unipark-landing/workflows/Security%20and%20Dependency%20Check/badge.svg)
```

---

## Troubleshooting

### Deployment fails

**SSH connection error:**
- Verify secrets are correctly set in GitHub
- Check SSH key has proper permissions on server
- Ensure public key is in `~/.ssh/authorized_keys`

**Build fails:**
- Check ESLint errors: `pnpm exec eslint .`
- Test build locally: `pnpm run build`

**Service won't start:**
```bash
systemctl status unipark
journalctl -u unipark -n 50
```

### Lint errors

Fix automatically where possible:
```bash
pnpm exec eslint . --fix
```

### Security vulnerabilities

View details:
```bash
pnpm audit
```

Fix automatically:
```bash
pnpm audit --fix
```

---

## Customization

### Change deployment branch

Edit `deploy.yml`:
```yaml
on:
  push:
    branches:
      - production  # Change to your branch name
```

### Adjust security check schedule

Edit `security.yml`:
```yaml
on:
  schedule:
    - cron: '0 9 * * 1'  # Monday 9:00 UTC
    # Change to your preferred schedule
```

### Add deployment environments

You can create additional workflows for staging:
1. Copy `deploy.yml` to `deploy-staging.yml`
2. Update branch triggers and secrets
3. Use different server credentials

---

## Best Practices

✅ **Always test locally before pushing:**
```bash
pnpm exec eslint .
pnpm run build
```

✅ **Use feature branches and PRs:**
- Create branch: `git checkout -b feature/my-feature`
- Push and create PR
- Wait for checks to pass
- Merge to main

✅ **Monitor deployment status:**
- Check Actions tab after pushing
- Verify site is working: http://unipark.uz

✅ **Review security alerts weekly:**
- Check email notifications
- Review created issues
- Update dependencies regularly

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [pnpm Documentation](https://pnpm.io/)
- [Nuxt Deployment Guide](https://nuxt.com/docs/getting-started/deployment)
