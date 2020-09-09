FROM node:12
WORKDIR /usr/src/app
ARG env=development
RUN echo "VAIABLE ARG: $env"
ENV NODE_ENV $env
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD ["node", "index.js"]