FROM node:slim
WORKDIR /app
COPY package.json package-lock.json .env ./
COPY . .
ENV PORT = 3000
RUN npm install
EXPOSE 3000
CMD ("npm" "start")