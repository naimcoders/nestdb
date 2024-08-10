FROM node:21

WORKDIR /app

COPY package* .
COPY prisma ./prisma

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]