# docker build -t marketplace-frontend .
# docker run -p 80:80 marketplace-frontend

# Note: all of this is already being done in the ci.yml
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]

#FROM nginx:1.28.0
#COPY /dist /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
