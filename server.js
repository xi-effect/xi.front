const { createServer } = require("https");
const { parse } = require("url");
const { join } = require('path')
const { readFileSync } = require("fs");
const next = require("next");

const port = 443;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
    key: readFileSync("/etc/letsencrypt/live/xieffect.ru/privkey.pem"),
    cert: readFileSync("/etc/letsencrypt/live/xieffect.ru/fullchain.pem")
};

app.prepare()
    .then(() => {
        createServer(httpsOptions, (req, res) => {
            const parsedUrl = parse(req.url, true);
            const { pathname } = parsedUrl

            if (pathname === '/sw.js' || /^\/(workbox|worker|fallback)-\w+\.js$/.test(pathname)) {
                const filePath = join(__dirname, '.next', pathname)
                app.serveStatic(req, res, filePath)
            } else {
                handle(req, res, parsedUrl)
            }
        }).listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on https://localhost:${port}`);
        })
    });