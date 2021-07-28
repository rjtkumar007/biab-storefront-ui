# build environment
FROM node:14.17.3-alpine as build
RUN apk update
RUN apk add nginx
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN yarn install
RUN yarn build

# production environment
FROM nginx:stable-alpine
RUN apk update && apk upgrade
RUN apk add --no-cache nodejs=14.17.3-r0 npm=14.17.3-r0
RUN npm install -g yarn
COPY --from=build /app /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
EXPOSE 8080
RUN chmod +x entrypoint.sh
CMD ["./entrypoint.sh"]