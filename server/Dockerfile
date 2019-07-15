FROM node

WORKDIR /server

COPY package*.json /server/

RUN yarn

COPY . /server/

EXPOSE 8000
CMD [ "yarn", "dev"]
