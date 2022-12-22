FROM itachi1706/swiplnode:latest

WORKDIR /

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . /

RUN mv config-docker.js config.js
CMD [ "node", "app.js" ]
EXPOSE 3002
