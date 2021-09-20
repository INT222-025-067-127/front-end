FROM node:14.16-alpine3.10 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
# RUN npm install 
COPY . /app
RUN yarn build && yarn install 
CMD ["yarn", "start"]
