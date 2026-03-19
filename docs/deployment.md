# MosqueConnect Deployment Guide

This repository now supports a split deployment model:

- **Frontend** deploys to **Vercel** from GitHub Actions.
- **Backend services** are built as **Docker images** and published from GitHub Actions.
- **Stateful dependencies** (Postgres and Redis) run as Docker services alongside the backend stack.

## 1. Deployment topology

### Frontend
- The `frontend` workspace is deployed through `.github/workflows/vercel-deploy.yml`.
- Preview deployments run for pull requests to `main`.
- Production deployments run on pushes to `main`.

### Backend services
- `.github/workflows/docker-images.yml` builds and pushes container images to GHCR.
- `docker-compose.prod.yml` pulls those images and runs the API services with Postgres and Redis.

## 2. Required GitHub secrets

Add these repository secrets before enabling deployments:

### Vercel deployment
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Container registry / runtime
- No extra secret is needed for GHCR when publishing from GitHub Actions with `GITHUB_TOKEN`.
- Your runtime host still needs a `.env` file with production values.

## 3. Vercel configuration

In Vercel, connect the project to this repository and set the **Root Directory** to `frontend`.

Configure these environment variables in Vercel so Next.js rewrites target the backend services:

- `IDENTITY_SERVICE_URL`
- `MOSQUE_SERVICE_URL`
- `PRAYER_EVENT_SERVICE_URL`
- `COMMUNITY_SERVICE_URL`
- `GOVERNANCE_SERVICE_URL`
- `LIBRARY_SERVICE_URL`
- `FINANCE_SERVICE_URL`
- `NEXT_PUBLIC_API_URL`

The frontend rewrite rules are environment-driven so the same app can work locally and on Vercel.

## 4. Backend runtime with Docker Compose

Copy `.env.example` to a production `.env` file on your Docker host and set real values.

Start the backend stack:

```bash
docker compose --env-file .env -f docker-compose.prod.yml up -d
```

This starts:
- Postgres
- Redis
- identity-service
- mosque-service
- prayer-event-service
- community-service
- governance-service
- library-service
- finance-service
- notification-service

## 5. GitHub Actions workflows

### CI
`.github/workflows/ci.yml` runs repository validation on pushes and pull requests.

### Docker publishing
`.github/workflows/docker-images.yml` publishes versioned images for every deployable service to GHCR.

### Vercel deployment
`.github/workflows/vercel-deploy.yml` builds and deploys the frontend using the Vercel CLI.

## 6. Recommended production flow

1. Merge to `main`.
2. GitHub Actions publishes updated backend Docker images.
3. GitHub Actions deploys the frontend to Vercel.
4. Pull the latest backend images on the Docker host:

```bash
docker compose --env-file .env -f docker-compose.prod.yml pull
docker compose --env-file .env -f docker-compose.prod.yml up -d
```

## 7. Notes

- The frontend uses environment-based rewrites instead of hardcoded `localhost` URLs.
- Vercel should host only the Next.js frontend.
- Databases and internal API services should remain on your Docker host or VPS, not inside Vercel.
