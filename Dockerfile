FROM node:14.4.0-alpine

ENV NODE_ENV production

WORKDIR /app/

ADD package* /app/
RUN npm ci --production

ADD . /app/

CMD node .
