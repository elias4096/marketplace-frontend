# docker build -t marketplace-frontend .
# docker run -p 80:80 marketplace-frontend

FROM node:22
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
