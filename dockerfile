FROM node:16.14.0 as build
WORKDIR /app

# Install dependencies
COPY package*.json .
RUN npm i

# Build web app
COPY . .
RUN npm run build


FROM nginx:1.17.8 as deploy
EXPOSE 8081

# Copy build to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy conf
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Inject env variables and start nginx
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
