FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD ["sh", "-c", "echo 'Frontend running on port 80' && npm start"]
