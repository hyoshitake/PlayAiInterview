FROM node:22

# Update apt and install vim and yarn
RUN apt-get update && \
    apt-get install -y vim && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

# Expose port (will be defined in docker-compose.yml)
EXPOSE ${FRONTEND_PORT}

# Command to run the application
CMD ["yarn", "dev"]
