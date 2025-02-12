FROM node:22-alpine

WORKDIR /app/

RUN apk update

COPY ./package.json ./
RUN npm install

RUN apk add --no-cache --virtual .codegen \
  openjdk11-jre-headless \
  &&  \
  npm run codegen \
  && \
  apk del .codegen


COPY ./ ./

CMD ["npm", "run", "dev"]
