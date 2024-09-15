import { useQuery } from "@tanstack/react-query";
import PetCard from "../components/pet-card";
import { getPets } from "../services/api";
import QueryContainer from "../components/query-container";

export default function HomePage() {
  const petsQuery = useQuery({
    queryKey: ["pets"],
    queryFn: getPets
  });

  return (
    <div className="p-8 flex flex-col gap-8">
      {/* SEARCH */}
      {/* <div className="flex gap-2 justify-center"> */}
      {/*  <input className="border-2 border-black rounded p-2" placeholder="Search Pet..." /> */}
      {/*  <button className="p-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600">Search</button> */}
      {/*  </div> */}
      <div className="flex justify-center flex-wrap gap-4">
        <QueryContainer query={petsQuery}>
          {pets => pets.map(pet => <PetCard key={pet.id} pet={pet} />)}
        </QueryContainer>
      </div>
    </div>
  );
}
