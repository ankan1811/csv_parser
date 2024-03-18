FROM node

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY data ./data
COPY .env ./
COPY src ./src

CMD [ "./node_modules/.bin/ts-node","src/server.ts" ]

