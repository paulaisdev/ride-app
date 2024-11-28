FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["sh", "-c", "echo 'Backend running on port 8080' && npm start"]
