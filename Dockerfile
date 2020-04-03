FROM node:13.10.1-buster as base
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
LABEL   version="0.1.2-base" \
        description="Frontend in Angular for CRIC Searchable Image Database" \
        maintainer="raniere@rgaiacs.com"

FROM base as build
# Copy ./src
COPY . ./
RUN ng build --prod --build-optimizer

# Build a small nginx image with static website
FROM nginx:alpine as production
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
# --from sets the source location to a previous build stage
COPY --from=build dist/cric /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
LABEL   version="0.1.2"