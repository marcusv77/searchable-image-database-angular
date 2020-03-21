FROM node:13.10.1-buster
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
# We don't copy ./src because it will be mapped by docker-compose