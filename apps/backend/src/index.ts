import { serve } from "@hono/node-server";
import { randomInt } from "crypto";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from 'hono/cors'
import { petsRouter } from "./modules/pets/pets.router";

const app = new Hono();
const randomId = randomInt(100);
const startDate = new Date().toISOString();
app.use(logger());
app.use(cors());

// Endpoint to demonstrate load balancing /w id
app.get("/", (c) => {
  return c.json({
    id: randomId,
    name: "Petworx",
    description: "Galactic Pet Shelter Management System",
    startDate,
    version: process.env.VERSION ?? "none",
  });
});

app.route("/pets", petsRouter);

// Route to crash the app
app.post("/crash", () => {
  console.log("Crashing the application...");
  process.exit(1);
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ error: "Internal Server Error" }, 500);
});

const port = 3000;
serve(
  {
    fetch: app.fetch,
    port,
  },
  () => {
    console.log(`Server is running on port ${port}`);
  },
);
