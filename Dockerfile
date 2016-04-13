FROM node:5.6.0

RUN npm install 

WORKDIR /

EXPOSE 8080
CMD ["node", "app"]
