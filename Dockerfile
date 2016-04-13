FROM node: 0.12

RUN npm install 

WORKDIR /

EXPOSE 8080
CMD ["node app.js"]
