FROM node

WORKDIR /client

COPY package*.json /client/

RUN yarn

COPY . /client/

EXPOSE 8080
CMD [ "yarn", "build"]