FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . /usr/src/app

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]