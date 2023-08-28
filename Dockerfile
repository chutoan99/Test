FROM node:14-alpine

WORKDIR /shopee/server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "test"]

#docker build --tag shopee-server .
#docker run -p 8080:8080 -d shopee-server
