FROM node

ADD . /app

WORKDIR /app

COPY package.json /app

COPY yarn.lock ./app

RUN yarn

COPY . /app

EXPOSE 8080

CMD yarn dev