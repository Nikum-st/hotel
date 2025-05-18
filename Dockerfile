FROM node:24

WORKDIR /src/nikum_st/app

COPY . .

WORKDIR /src/nikum_st/app/backend
RUN npm i

WORKDIR /src/nikum_st/app/frontend
RUN npm i
RUN npm run build

EXPOSE 2050

CMD [ "node","index.js" ]