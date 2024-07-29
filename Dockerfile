FROM swipl:9.2.6

WORKDIR /app

# Install Node.js
RUN apt-get update && apt-get install -y \
    curl \
    software-properties-common \
    npm
RUN npm install npm@latest -g && \
    npm install n -g && \
    n latest

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . /app

RUN mv config-docker.js config.js
CMD [ "node", "app.js" ]
EXPOSE 3002
