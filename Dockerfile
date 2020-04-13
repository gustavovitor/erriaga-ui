FROM node:12-alpine
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build --prod
ENTRYPOINT ["node", "server.js"]
EXPOSE ${UI_PORT}
