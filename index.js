import { readFile } from "fs/promises";
import express from "express";
import fs from "fs/promises";

const app = express()

app.use(express.static("./dist/client/"));

app.get("/", (req, res) => {
  res.redirect("/f");
});

app.get("/f", async (req, res) => {
  const template = await readFile("./dist/client/Frontend/index.html", "utf-8");
  const { render } = await import("./dist/server/Frontend/entry-server.js");
  const rendered = render();
  const html = template
    .replaceAll("/assets", "/Frontend/assets")
    .replace("<!--app-body-->", rendered.html);
  res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

app.get("/q", async (req, res) => {
  const template = await readFile("./dist/client/ReactQueryFrontend/index.html", "utf-8");
  const { render } = await import("./dist/server/ReactQueryFrontend/entry-server.js");
  const rendered = render();
  const html = template
    .replaceAll("/assets", "/ReactQueryFrontend/assets")
    .replace("<!--app-body-->", rendered.html);
  res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

app.get("/r", async (req, res) => {
  const template = await readFile("./dist/client/ReactReduxFrontend/index.html", "utf-8");
  const { render } = await import("./dist/server/ReactReduxFrontend/entry-server.js");
  const rendered = render();
  const html = template
    .replaceAll("/assets", "/ReactReduxFrontend/assets")
    .replace("<!--app-body-->", rendered.html);
  res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

app.use(express.json());

const DB_PATH = "db.json"

async function getDb() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading db.json:", err);
        return {};
    }
}

// Helper: Save the database
async function saveDb(data) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

// DYNAMIC ROUTING: Mimics json-server for any key in your JSON
app.all('/:resource{/:id}', async (req, res) => {
    const { resource, id } = req.params;
    const db = await getDb();
    
    // Check if the collection exists (e.g., db.posts)
    if (!db[resource]) return res.status(404).json({ error: "Resource not found" });

    const collection = db[resource];

    switch (req.method) {
        case 'GET':
            if (id) {
                const item = collection.find(obj => obj.id == id);
                return item ? res.json(item) : res.status(404).send();
            }
            return res.json(collection);

        case 'POST':
            const newItem = { id: Date.now(), ...req.body };
            db[resource].push(newItem);
            await saveDb(db);
            return res.status(201).json(newItem);

        case 'PUT':
            const index = collection.findIndex(obj => obj.id == id);
            if (index === -1) return res.status(404).send();
            db[resource][index] = { id: Number(id), ...req.body };
            await saveDb(db);
            return res.json(db[resource][index]);

        case 'DELETE':
            db[resource] = collection.filter(obj => obj.id != id);
            await saveDb(db);
            return res.status(204).send();

        default:
            res.status(405).send();
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Custom JSON Server is running on http://localhost:${PORT}`);
});
