FROM node:24

WORKDIR /app

COPY . .

WORKDIR /app/backend
RUN npm install

WORKDIR /app/frontend
RUN npm install
RUN npm run build

EXPOSE 2050

CMD ["node", "index.js"]
