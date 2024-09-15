import axios from "axios";
import { Pet } from "../types/pets.type";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HOST ?? "http://FAILURE.error",

});

export function wait(time: number, unit?: "ms" | "s" | "m") {
  const time_ms = time * { ms: 1, s: 1000, m: 60 * 1000 }[unit ?? "ms"];
  return new Promise<void>((resolve) => setTimeout(resolve, time_ms));
}

export const getPets = async () => {
  const res = await api.get("/pets");
  return res.data as Pet[];
}

export const createPet = async (pet: Omit<Pet, "id">) => {
  await wait(2, "s");
  const res = await api.post("/pets", pet);
  return res.data as Pet;
}

export const deletePet = async (petId: Pet["id"]) => {
  await wait(2, "s");
  await api.delete(`/pets/${petId}`);
}

export const crashServer = async () => {
  await wait(2, "s");
  const res = await api.post("/crash");
  return res.data as Pet[];
}
