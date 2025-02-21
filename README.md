# Expo Starter

This project is a barebones starter for Expo apps written in React Native.

## What's inside?

- [React Native](https://reactnative.dev/) with [TypeScript](https://www.typescriptlang.org/)
- [Expo](https://docs.expo.dev/)
- [React Query](https://react-query.tanstack.com/)
- [NativeWind](https://nativewind.dev/)
- [Gluestack UI](https://gluestack.dev/)
- [Biome](https://biomejs.dev/)
- [Supabase](https://supabase.com/)
- [FlashList](https://shopify.github.io/flash-list/docs/)
- [Zustand](https://github.com/pmndrs/zustand)

## Getting started

### 1. Setup your local environement

Follow the instructions in the [setup guide](https://reactnative.dev/docs/set-up-your-environment).
Make sure you have Node.js version 18.18 or newer installed.

### 2. Install the dependencies

```bash
npm install
```

### 3. Setup git-flow

Git-flow is a popular branching model that helps you manage your codebase. Follow the instructions in the [setup guide](https://danielkummer.github.io/git-flow-cheatsheet/index.html) to set up git-flow on your local machine.

### 3. Configure environment variables

Copy the `.env.example` file to `.env` and fill in the values.

### 4. Run the app

```bash
npm run start
```

or start the app on Android

```bash
npx expo run:android
```

or start the app on iOS

```bash
npx expo run:ios
```

### 5. Install EAS (Expo Application Services)

EAS is a set of tools that help you build and deploy your Expo app.

Install the latest version of EAS CLI:

```bash
npm install -g eas-cli
```

Login into your Expo account:

```bash
eas login
```

### 6. Setup your local Supabase project

Follow the instructions in the [setup guide](https://supabase.com/docs/guides/self-hosting/docker) to setup your local Supabase project with Docker.

The easiest way to run Docker is to use the [Docker Desktop](https://www.docker.com/products/docker-desktop/) application.

```bash
# Get the code
git clone --depth 1 https://github.com/supabase/supabase

# Go to the docker folder
cd supabase/docker

# Copy the fake env vars
cp .env.example .env

# Pull the latest images
docker compose pull

# Start the services (in detached mode)
docker compose up -d
```

Default port to access the Supabase API is `8000`.

To generate the types from the Supabase database go to the Supabase dashboard > API Docs > Tables & Views > Introduction  and click on the "Generate and download types" button. You can then copy the contents of this file into the `database.types.ts` file.


## Generating native code for each platform

To generate native code for each platform, run the following command:

```bash
npx expo prebuild --clean
```

## Building and deploying the app

To build the app on EAS for a specific profile, run the following command:

```bash
eas build --profile development
```

To build the app on EAS for a specific platform, run the following command:

```bash
eas build --platform android
```

You can combine the `--profile` and `--platform` flags to build for a specific profile and platform.
You can find the available profiles in the `eas.json` file.

## Linting and formatting

To lint and format the code, run the following command:

```bash
npm run lint
```

If you want to fix the linting errors, run the following command:

```bash
npm run lint:fix
```


