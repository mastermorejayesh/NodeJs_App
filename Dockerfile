FROM node:16

WORKDIR /app

COPY package.json /app
RUN npm install
RUN npm install dotenv mysql2


COPY . /app

EXPOSE 3000
CMD ["node", "app.js"]

