# express-auth-demo

## About

An authentication demo with [Express.js](https://github.com/expressjs/express.git) and [Vue.js](https://github.com/vuejs/core.git). The following technologies were used in the project, you can find them in the code.

1. Session based authentication.
2. HTML5 history mode.
3. CORS with cookie.
4. HTTPS with self-signed certificate.

## Dependence

### Node.js

```shell
export N_NODE_MIRROR="https://mirrors.ustc.edu.cn/node/"
export N_NODE_DOWNLOAD_MIRROR="https://mirrors.ustc.edu.cn/node/"
curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n | sudo -E bash -s lts
```

### podman

1. [podman](https://podman.io/getting-started/installation) (and start as a service).
2. [podman-compose](https://github.com/containers/podman-compose#installation).

## Usage

### Start Server

```shell
git clone https://github.com/Arondight/express-auth-demo.git
cd ./express-auth-demo/
sudo podman-compose -f ./podman-compose/mongodb.yml up -d
npm install
npm run build
npm start
```

### Trust Self-signed Certificate

Run the command below and trust the certificate in browser.

```shell
xdg-open https://localhost:3000/hello
xdg-open https://localhost:8000/hello
```

In Firefox click the `Advanced...` then the `Accept the Risk and Continue`. In Chrome click `Adavanced` then click `Proceed to localhost (unsafe)`.

### Visit Home Page

```shell
xdg-open https://localhost:8000
```

## LICENSE

[MIT License](LICENSE).
