#!/bin/bash

# Install dependencies
npm install

# Install the Prisma CLI globally
npm install -g prisma

# Update dependencies
npm update

# Generate the Prisma client library
prisma generate

# Start the server
node app.js