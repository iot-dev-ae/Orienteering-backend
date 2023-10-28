#!/bin/bash

# Set the Node.js version
nvm use 16.13.0

# Install dependencies
npm install

# Install the Prisma CLI globally
npm install -g prisma

# Generate the Prisma client library
prisma generate