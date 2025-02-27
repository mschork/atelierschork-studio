# Atelier Schork Sanity Studio

Sanity Content Studio for Atelier Schork, an open-source real-time content editing environment connected to the Sanity backend.

## Getting Started

1. Clone this repository
2. Run `npm install` to install dependencies
3. Set up environment variables (see below)
4. Run `npm run dev` to start the development server

## Environment Variables

This project uses environment variables to configure the Sanity Studio. The following files are used:

- `.env`: Contains production environment variables
- `.env.local`: Contains local development environment variables (not committed to Git)

### Setting Up Local Environment

1. Copy the example file: `cp .env.local.example .env.local`
2. Edit `.env.local` with your specific configuration

### Available Variables

- `SANITY_STUDIO_PROJECT_ID`: Your Sanity project ID
- `SANITY_STUDIO_DATASET`: The dataset to use (e.g., 'production', 'development')

## Additional Resources

- [Read "getting started" in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)
