FROM node:13.10.1-buster as base
LABEL   version="0.1.0" \
        description="Backend in Node.js for CRIC Searchable Image Database" \
        maintainer="raniere@rgaiacs.com"
# Create project directory
WORKDIR /opt/cric/frontend
# Install app dependencies
COPY package*.json ./
RUN npm install && npm install -g @angular/cli && npm cache clean --force
# Set PATH
ENV PATH /opt/cric/frontend/node_modules/.bin:$PATH
# Expose port. Otherwise, we will have "This site can’t be reached"
# https://stackoverflow.com/a/46779529
EXPOSE 4200

FROM base as production
# Copy ./src
COPY . ./