FROM node

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY data ./data
COPY .env ./
COPY src ./src

ENTRYPOINT [ "ts-node","src/server.ts" ]



