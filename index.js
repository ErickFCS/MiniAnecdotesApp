import { readFile } from "fs/promises";
import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({
    static: "./dist/client"
});

server.get("/", (req, res) => {
    res.redirect("/f");
});

server.get("/f", async (req, res) => {
    const template = await readFile("./dist/client/Frontend/index.html", "utf-8");
    const { render } = await import("./dist/server/Frontend/entry-server.js");
    const rendered = await render();
    const html = template
        .replaceAll("/assets", "/Frontend/assets")
        .replace("<!--app-body-->", rendered.html);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

server.get("/q", async (req, res) => {
    const template = await readFile("./dist/client/ReactQueryFrontend/index.html", "utf-8");
    const { render } = await import("./dist/server/ReactQueryFrontend/entry-server.js");
    const rendered = await render();
    const html = template
        .replaceAll("/assets", "/ReactQueryFrontend/assets")
        .replace("<!--app-body-->", rendered.html);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

server.get("/r", async (req, res) => {
    const template = await readFile("./dist/client/ReactReduxFrontend/index.html", "utf-8");
    const { render } = await import("./dist/server/ReactReduxFrontend/entry-server.js");
    const rendered = await render();
    const html = template
        .replaceAll("/assets", "/ReactReduxFrontend/assets")
        .replace("<!--app-body-->", rendered.html);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`JSON Server is running on http://localhost:${PORT}`);
});
