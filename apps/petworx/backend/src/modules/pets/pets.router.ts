import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import mariadb from "mariadb";

export const petsRouter = new Hono();

// MariaDB connection pool
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

// Zod schemas
const petSchema = z.object({
  name: z.string().min(1),
  species: z.string().min(1),
  planet: z.string().min(1),
});

const idParamSchema = z.object({
  id: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: "ID must be a valid number",
  }),
});

// CREATE: Add a new pet
petsRouter.post("/", zValidator("json", petSchema), async (c) => {
  const body = c.req.valid("json");
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "INSERT INTO pets (name, species, planet) VALUES (?, ?, ?)",
      [body.name, body.species, body.planet],
    );
    const newPet = { id: parseInt(result.insertId), ...body };
    return c.json(newPet, 201);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Failed to create pet" }, 500);
  } finally {
    if (conn) conn.release();
  }
});

// READ: Get all pets
petsRouter.get("/", async (c) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const pets = await conn.query("SELECT * FROM pets ORDER BY name");
    return c.json(pets);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Failed to fetch pets" }, 500);
  } finally {
    if (conn) conn.release();
  }
});

// READ: Get a specific pet by ID
petsRouter.get("/:id", zValidator("param", idParamSchema), async (c) => {
  const { id } = c.req.valid("param");
  let conn;
  try {
    conn = await pool.getConnection();
    const [pet] = await conn.query("SELECT * FROM pets WHERE id = ?", [id]);
    if (pet) {
      return c.json(pet);
    } else {
      return c.json({ error: "Pet not found" }, 404);
    }
  } catch (err) {
    console.error(err);
    return c.json({ error: "Failed to fetch pet" }, 500);
  } finally {
    if (conn) conn.release();
  }
});

// UPDATE: Update a pet by ID
petsRouter.put(
  "/:id",
  zValidator("param", idParamSchema),
  zValidator("json", petSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        "UPDATE pets SET name = ?, species = ?, planet = ? WHERE id = ?",
        [body.name, body.species, body.planet, id],
      );
      if (result.affectedRows > 0) {
        const updatedPet = { id: parseInt(id), ...body };
        return c.json(updatedPet);
      } else {
        return c.json({ error: "Pet not found" }, 404);
      }
    } catch (err) {
      console.error(err);
      return c.json({ error: "Failed to update pet" }, 500);
    } finally {
      if (conn) conn.release();
    }
  },
);

// DELETE: Remove a pet by ID
petsRouter.delete("/:id", zValidator("param", idParamSchema), async (c) => {
  const { id } = c.req.valid("param");
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query("DELETE FROM pets WHERE id = ?", [id]);
    if (result.affectedRows > 0) {
      return c.json({ message: "Pet deleted successfully" });
    } else {
      return c.json({ error: "Pet not found" }, 404);
    }
  } catch (err) {
    console.error(err);
    return c.json({ error: "Failed to delete pet" }, 500);
  } finally {
    if (conn) conn.release();
  }
});


const searchQuerySchema = z.object({
  q: z.string().min(1),
}).passthrough();

// Simulate high CPU usage for "galaxy-wide" search
petsRouter.get("/search", zValidator("query", searchQuerySchema), async (c) => {
  const { q } = c.req.valid("query");
  let conn;
  try {
    conn = await pool.getConnection();

    // Simulate intensive search operation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }

    const pets = await conn.query(
      "SELECT * FROM pets WHERE name LIKE ? OR species LIKE ? OR planet LIKE ?",
      [`%${q}%`, `%${q}%`, `%${q}%`],
    );

    return c.json({
      query: q,
      results: pets,
      processingTime: result,
    });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Failed to search pets" }, 500);
  } finally {
    if (conn) conn.release();
  }
});
