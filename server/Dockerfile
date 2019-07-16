FROM node

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . /app

EXPOSE 8000

CMD yarn dev
