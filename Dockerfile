FROM node:23-alpine3.20
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
USER node
CMD ["npm", "run", "dev"]
