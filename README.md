# NextJS-App-Clada

_NEXTJS-App-Clada_ is a social media platform built with nextjs, next-auth and tailwind.

This project was built in the frame of the CAS Frontend Engineering Advanced course at the [OST Fachhochschule Rapperswil](https://www.ost.ch/de/).

Authors / Developers:

- [Claudio Steffen](https://github.com/claudio-OST)
- [Danijel Malinovic](https://github.com/malinovic)

## Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/a1498a3e-1eda-4697-9686-f603accf93dc/deploy-status)](https://app.netlify.com/sites/mumble-platform-clada/deploys)
[![Lint and verify](https://github.com/ost-cas-fee-adv-23-24/nextjs-app-clada/actions/workflows/1-lint-and-verify.yml/badge.svg)](https://github.com/ost-cas-fee-adv-23-24/nextjs-app-clada/actions/workflows/1-lint-and-verify.yml)
[![Playwright Tests](https://github.com/ost-cas-fee-adv-23-24/nextjs-app-clada/actions/workflows/2-playwright.yml/badge.svg)](https://github.com/ost-cas-fee-adv-23-24/nextjs-app-clada/actions/workflows/2-playwright.yml)

## Local Installation and usage

1. Clone the repository
2. Ensure to have the [correct node version installed](.node-version)
3. Run `npm ci`
4. Create a `.env.local` file with [following contents](https://github.com/ost-cas-fee-adv-23-24/nextjs-app-clada/wiki/Local-Env-Variables)
5. Start the application `npm run dev`
6. Open `http://localhost:3000/`

## Deployment

The application is automatically deployed to [netlify](https://mumble-platform-clada.netlify.app/) on each merged PR into main. For deployment following actions are necessary to succeed:

- Lint and Verify: Lint's code and verifies that a build is possible
- Playwright Testing: Ensures application is tested to a certain degree

### Pull request deployment preview

When creating pull request, netlify will automatically create deployment preview url's. For now, these do not work.
We have agreed that we much rather work the _old fashioned way_, therefore checkout and test the PR locally instead of a configuration on the web.

## Testing

For testing, we use [playwright](https://playwright.dev/). When running tests locally, make sure your configuration is set accordingly to [this wiki page](https://github.com/ost-cas-fee-adv-23-24/nextjs-app-clada/wiki/Local-Env-Variables).

Then run `npm run test`. You can also run `npm run test-interactive` to get playwrights visual interface.

With the `webServer` configuration in the [configuration file](playwright.config.ts) there will be automatically a nextjs instance started when running any of the `test` commands. This also applies for the CI.

### Limitations

All the test's will be running with live data on the live endpoint. We have decided to not mock anything due to time and complexity.
