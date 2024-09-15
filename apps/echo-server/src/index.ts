import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from 'hono/cors'

const app = new Hono();
app.use(logger());
app.use(cors());

// Endpoint to demonstrate load balancing /w id
app.get("/", (c) => {
  return c.json({
    name: process.env.NAME ?? "Echo Server",
    version: "v2",
  });
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
