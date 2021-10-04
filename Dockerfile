FROM node:14.18.0 AS builder

# set working directory
WORKDIR /usr/src/app

# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package.json ./
COPY .env ./

# Installs all node packages
RUN npm install 

# Copies everything over to Docker environment
COPY . .

RUN npm run build

#pull the official nginx:1.19.0 base image
FROM nginx:1.21.3-alpine
#copies React to the container directory
# Set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static resources
RUN rm -rf ./*
# Copies static resources from builder stage
RUN ls -la
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]