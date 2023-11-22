FROM node:lts-alpine
RUN npm install -g http-server
WORKDIR /app
COPY /dist /app/dist
EXPOSE 8081
CMD [ "http-server", "dist", "-p", "8081" ]