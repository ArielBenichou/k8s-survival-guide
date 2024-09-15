import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPet } from "../services/api";

export default function CreatePetPage() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createPet,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      setPet({ name: '', species: '', planet: '' });
    },
  });

  const [pet, setPet] = useState({ name: '', species: '', planet: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(pet);
  };

  return (
    <div className="flex flex-col p-8 md:w-1/2 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add a New Galactic Pet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={pet.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="species" className="block mb-1">Species:</label>
          <input
            type="text"
            id="species"
            name="species"
            value={pet.species}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="planet" className="block mb-1">Planet:</label>
          <input
            type="text"
            id="planet"
            name="planet"
            value={pet.planet}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className={"text-white p-2 rounded " + (mutation.isPending ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600")}>
          {mutation.isPending ? "Adding Pet" : "Add Pet"}
        </button>
      </form>
    </div>
  );
}
