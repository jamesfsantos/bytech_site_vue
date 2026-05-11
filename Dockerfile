FROM node:lts-alpine3.23 AS build
WORKDIR /app
COPY . .
ENV TZ="America/Sao_Paulo"
RUN npm i
RUN npm run build

# production environment
FROM nginx:stable-alpine-slim
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]