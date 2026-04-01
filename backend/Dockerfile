FROM node:20
WORKDIR /app

ENV HUSKY=0

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .


RUN npm run type-check

EXPOSE 3000


CMD ["npm", "run", "dev"]
