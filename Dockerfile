# docker build -t marketplace-frontend .
# docker run -p 80:80 marketplace-frontend


# Todo: is "npm run dev" neccessary? We already do build in github .yml
# CMD ["npm", "run", "dev"]

FROM nginx:1.28.0
COPY /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
