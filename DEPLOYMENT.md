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

### Required GitHub Secrets

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

1. **SERVER_HOST**: Your server IP address or hostname
2. **SERVER_USER**: SSH username (typically `root`)
3. **SSH_PRIVATE_KEY**: Private SSH key for authentication
4. **SERVER_PORT**: SSH port (optional, defaults to 22)

### Getting the SSH Private Key

The private key is located at `/root/.ssh/id_ed25519`. To get it:

```bash
cat /root/.ssh/id_ed25519
```

Copy the entire output (including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`) and add it as the `SSH_PRIVATE_KEY` secret in GitHub.

### Deployment Methods

Two deployment workflows are available:

#### Method 1: Git Pull (default - deploy.yml)
- Pulls code on the server
- Builds on the server
- Best for: Servers with adequate resources
- Slower but uses less GitHub Actions minutes

#### Method 2: Rsync (deploy-rsync.yml.example)
- Builds on GitHub Actions
- Syncs only the built files
- Best for: Faster deployments, resource-constrained servers
- To use: Rename `deploy-rsync.yml.example` to `deploy-rsync.yml` and delete/disable `deploy.yml`

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
