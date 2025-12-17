# Deployment Guide for UniPark Landing

## Server Setup

The application is deployed on the production server with the following configuration:

### Services
- **Nuxt Application**: Runs on port 3000 (systemd service: `unipark`)
- **Nginx**: Reverse proxy on port 80/443
- **Domain**: unipark.uz

### File Locations
- Application: `/root/projects/unipark-landing`
- Nginx config: `/etc/nginx/sites-available/unipark.uz`
- Systemd service: `/etc/systemd/system/unipark.service`

## Manual Deployment

To deploy manually:

```bash
cd /root/projects/unipark-landing
git pull
export PNPM_HOME="/root/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"
pnpm install
pnpm run build
systemctl restart unipark
```

## CI/CD Setup with GitHub Actions

### Workflow Overview

The project includes three GitHub Actions workflows:

1. **deploy.yml** - Production deployment on push to main/master
   - Runs build tests
   - Builds the application
   - Deploys to production server
   - Verifies deployment
   - Sends notifications

2. **test.yml** - Testing for pull requests and feature branches
   - Runs on all PRs and non-main branches
   - Validates build process
   - Comments on PRs with results

3. **deploy-rsync.yml.example** - Alternative deployment method
   - Uses rsync instead of git pull
   - Faster for large builds

### Required GitHub Secrets

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

1. **SERVER_HOST**: Your server IP address or hostname (e.g., `185.123.45.67` or `unipark.uz`)
2. **SERVER_USER**: SSH username (typically `root`)
3. **SSH_PRIVATE_KEY**: Private SSH key for authentication
4. **SERVER_PORT**: SSH port (optional, defaults to 22)

### Step-by-Step Secret Setup

#### 1. Get the SSH Private Key

On your server, retrieve the private key:

```bash
cat /root/.ssh/id_ed25519
```

Copy the entire output (including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`).

#### 2. Add Secrets to GitHub

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret:
   - Name: `SERVER_HOST`, Value: your server IP or hostname
   - Name: `SERVER_USER`, Value: `root`
   - Name: `SSH_PRIVATE_KEY`, Value: paste the entire private key
   - Name: `SERVER_PORT`, Value: `22` (or your custom port)

#### 3. Verify Setup

After adding secrets, push a commit to main/master branch to trigger a deployment:

```bash
git add .
git commit -m "test: trigger deployment"
git push
```

Watch the deployment progress in the **Actions** tab on GitHub.

### Deployment Methods

Two deployment workflows are available:

#### Method 1: Git Pull (default - deploy.yml) ✅ Current
- Runs build tests before deployment
- Pulls code on the server
- Builds on the server
- Verifies deployment health
- Sends deployment notifications
- Best for: Servers with adequate resources
- Slower but uses less GitHub Actions minutes

#### Method 2: Rsync (deploy-rsync.yml.example)
- Builds on GitHub Actions
- Syncs only the built files
- Best for: Faster deployments, resource-constrained servers
- To use: Rename `deploy-rsync.yml.example` to `deploy-rsync.yml` and delete/disable `deploy.yml`

### Automated Features

The CI/CD pipeline includes:

✅ **Automated Testing**
- Build verification
- Pre-deployment validation

✅ **Smart Deployment**
- Only deploys if all tests pass
- Automatic service restart
- Health check verification

✅ **Notifications**
- Commit comments on success/failure
- Deployment summary in GitHub Actions
- PR comments for pull requests

✅ **Manual Trigger**
- Deploy on-demand via GitHub Actions UI
- Go to Actions → Deploy to Production → Run workflow

### Workflow Triggers

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| deploy.yml | Push to main/master | Production deployment |
| deploy.yml | Manual dispatch | On-demand deployment |
| test.yml | Pull requests | Code review validation |
| test.yml | Push to feature branches | Development testing |

### Troubleshooting CI/CD

#### Deployment fails with SSH error

Check that your secrets are correctly set:
```bash
# On server, verify SSH key exists
ls -la /root/.ssh/id_ed25519
```

Make sure the public key is in authorized_keys:
```bash
cat /root/.ssh/id_ed25519.pub >> /root/.ssh/authorized_keys
```

#### Build fails on GitHub Actions

Check the Actions logs for specific errors. Common issue:
- Build errors: Test build locally with `pnpm run build`

#### Service restart fails

Check service status on the server:
```bash
systemctl status unipark
journalctl -u unipark -n 50
```

#### Manual deployment override

If CI/CD is failing but you need to deploy urgently:
```bash
cd /root/projects/unipark-landing
git pull
pnpm install --frozen-lockfile
pnpm run build
systemctl restart unipark
```

## SSL/HTTPS Setup

Currently, the site runs on HTTP only. To enable HTTPS:

### Using Let's Encrypt (Recommended)

```bash
# Install certbot
apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
certbot --nginx -d unipark.uz -d www.unipark.uz

# Certbot will automatically configure nginx
# Certificates will auto-renew
```

### Manual SSL Configuration

If you have your own SSL certificates, edit `/etc/nginx/sites-available/unipark.uz` and uncomment the HTTPS server block:

```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name unipark.uz www.unipark.uz;

    ssl_certificate /path/to/your/fullchain.pem;
    ssl_certificate_key /path/to/your/privkey.pem;

    # ... rest of config
}
```

Then reload nginx:

```bash
nginx -t
systemctl reload nginx
```

## Service Management

### Start/Stop/Restart the application

```bash
# Check status
systemctl status unipark

# Start
systemctl start unipark

# Stop
systemctl stop unipark

# Restart
systemctl restart unipark

# View logs
journalctl -u unipark -f
```

### Nginx

```bash
# Test configuration
nginx -t

# Reload
systemctl reload nginx

# Restart
systemctl restart nginx

# View access logs
tail -f /var/log/nginx/unipark.uz.access.log

# View error logs
tail -f /var/log/nginx/unipark.uz.error.log
```

## Troubleshooting

### Application won't start

```bash
# Check service status
systemctl status unipark

# View detailed logs
journalctl -u unipark -n 100 --no-pager

# Check if port 3000 is in use
netstat -tlnp | grep 3000
```

### Nginx errors

```bash
# Test configuration
nginx -t

# Check error logs
tail -f /var/log/nginx/unipark.uz.error.log
```

### DNS not resolving

Make sure your domain's DNS records point to your server's IP:

```
A    unipark.uz      → YOUR_SERVER_IP
A    www.unipark.uz  → YOUR_SERVER_IP
```

## Performance Optimization

### Enable HTTP/2 (after SSL setup)

HTTP/2 is already configured in nginx but requires HTTPS.

### Caching

Static assets are cached for 1 year. The configuration includes:
- Gzip compression
- Browser caching for static files
- Proxy headers for proper request forwarding

## Monitoring

### Check if site is accessible

```bash
# Local check
curl -I http://127.0.0.1:3000

# Through nginx
curl -I http://unipark.uz
```

### Monitor system resources

```bash
# Check memory usage
free -h

# Check disk usage
df -h

# Check CPU usage
top
```

## Backup

### Application files

```bash
# Backup the entire application
tar -czf unipark-backup-$(date +%Y%m%d).tar.gz /root/projects/unipark-landing

# Exclude node_modules and .git
tar -czf unipark-backup-$(date +%Y%m%d).tar.gz \
  --exclude='node_modules' \
  --exclude='.git' \
  /root/projects/unipark-landing
```

### Database (if applicable)

If you add a database later, include backup commands here.

## Updates

The application will automatically deploy when you push to the main/master branch on GitHub.

To update manually, see the "Manual Deployment" section above.
