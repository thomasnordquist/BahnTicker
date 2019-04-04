FROM node:10

VOLUME /app
WORKDIR /app

CMD yarn && yarn start

EXPOSE 3000
