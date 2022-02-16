FROM node:16.4.2-alpine3.11 AS builder
WORKDIR /app 
COPY . . 

RUN npm i
RUN npm run build 

FROM node:16.4.2-alpine3.11 
WORKDIR /usr/src/app 
COPY --from=builder /app ./ 

EXPOSE 3000 
CMD npm run start:prod