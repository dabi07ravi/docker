# specify the node base image with your desired version node:<version>
FROM node:16

WORKDIR /app 

COPY ./package*.json ./

RUN npm ci

COPY . .
 
CMD ["npm", "start"]