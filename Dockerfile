FROM node:14-alpine AS builder

# Alpine doesn't come with openssh or git, install them
RUN apk add --no-cache openssh-client git

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
COPY ./package*.json ./

# Install all dependencies (with dev ones)
RUN npm install

# Copy all files
COPY ./ ./

# Build app
RUN npm run build


# Base on offical Node.js Alpine image
FROM node:14-alpine

# Alpine doesn't come with openssh or git, install them
RUN apk add --no-cache openssh-client git

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
COPY ./package*.json ./

# Install dependencies
RUN npm install --production

# Get the built application from the first stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/styles styles

RUN mkdir -p .next/cache && chmod -R 777 .next/cache

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node
RUN mkdir -p /app/.next/cache/images

# Run npm start script when container starts
CMD [ "npm", "run", "start" ]
