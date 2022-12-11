FROM node:14

EXPOSE 7000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

CMD ["npm", "start"]
