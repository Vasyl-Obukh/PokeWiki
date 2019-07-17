FROM node

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . /app

EXPOSE 8040

CMD yarn dev
