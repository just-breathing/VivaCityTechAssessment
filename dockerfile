FROM node:18.18.2
copy . /app/
WORKDIR /app
RUN npm i
Expose 5100
CMD ["npm","run","start"]