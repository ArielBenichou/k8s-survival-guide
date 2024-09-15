import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pet } from "../types/pets.type";
import { deletePet } from "../services/api";

export default function PetCard({ pet }: Props) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deletePet,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  const adoptPet = () => {
    mutation.mutate(pet.id);
  }

  return (
    <div className="flex rounded-lg overflow-hidden shadow-md">
      <img src={`https://robohash.org/${pet.id}?set=set2`} className="bg-gray-100 object-cover w-52" />
      <div className="flex flex-col gap-2 p-4">

        <div className="flex flex-col w-36">
          <span className="text-xs">Name</span>
          <span className="font-bold">{pet.name}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs">Species</span>
          <span className="font-bold">{pet.species}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs">Planet</span>
          <span className="font-bold">{pet.planet}</span>
        </div>

        <button
          onClick={adoptPet}
          disabled={mutation.isPending}
          className={"text-white p-2 rounded " + (mutation.isPending ? "bg-gray-600" : "bg-black hover:bg-gray-900")}>
          {mutation.isPending ? "Adopting" : "Adopt"}
        </button>
      </div>
    </div>
  );
}

interface Props {
  pet: Pet;
}
