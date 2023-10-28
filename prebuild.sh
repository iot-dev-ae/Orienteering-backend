#!/bin/bash

# Install the Prisma CLI globally with Node.js 16.13
nvm use 16.13.0
npm install -g prisma

# Generate the Prisma client library
prisma generate