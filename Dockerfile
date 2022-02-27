FROM node:latest

RUN mkdir /app
ADD . /app
WORKDIR /app

COPY . /app
COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

EXPOSE 5000

CMD ["npm", "start"]