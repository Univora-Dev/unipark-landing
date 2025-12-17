# UniPark Landing

Official landing page for UniPark built with Nuxt 4.

![Deploy](https://github.com/YOUR_USERNAME/unipark-landing/workflows/Deploy%20to%20Production/badge.svg)
![Tests](https://github.com/YOUR_USERNAME/unipark-landing/workflows/Test%20and%20Lint/badge.svg)

## Tech Stack

- **Framework**: Nuxt 4.2
- **UI**: Vue 3 + TailwindCSS
- **Icons**: Nuxt Icon with Lucide
- **Fonts**: Nuxt Fonts
- **Images**: Nuxt Image
- **Linting**: ESLint
- **Package Manager**: pnpm

## Quick Start

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

## CI/CD

This project uses GitHub Actions for continuous integration and deployment.

### Automated Workflows

- **Deployment**: Automatic deployment to production on push to `main`
- **Testing**: PR validation with linting and build checks
- **Security**: Weekly dependency audits
- **Performance**: Lighthouse checks on PRs

### Setup Instructions

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed CI/CD setup and deployment instructions.

### Quick Deploy

Push to main branch:
```bash
git add .
git commit -m "your changes"
git push origin main
```

Or trigger manually via GitHub Actions UI.

## Project Structure

```
.
├── .github/
│   └── workflows/      # CI/CD workflows
├── app/
│   ├── components/     # Vue components
│   ├── pages/          # Nuxt pages
│   └── public/         # Static assets
├── DEPLOYMENT.md       # Deployment guide
└── nuxt.config.ts      # Nuxt configuration
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm generate` | Generate static site |
| `pnpm exec eslint .` | Run linting |
| `pnpm exec eslint . --fix` | Fix linting issues |

## Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Server setup and CI/CD configuration
- [Workflows README](./.github/workflows/README.md) - GitHub Actions workflows
- [Nuxt Documentation](https://nuxt.com/docs) - Official Nuxt docs

## License

Private project for UniPark.
