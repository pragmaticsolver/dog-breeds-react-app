import { useQuery } from "react-query";
import { IDogBreed } from "../../models/dogs.models";

import * as DogsService from "../../services/dogs.services";

interface IUseFetchDogBreeds {
  dogBreeds: IDogBreed[] | undefined;
  isLoading: boolean;
}

const useFetchDogBreeds: () => IUseFetchDogBreeds = () => {
  const { data: dogBreeds, isLoading } = useQuery<IDogBreed[]>(
    "dogbreeds",
    DogsService.getBreeds
  );
  return { dogBreeds, isLoading };
};

export default useFetchDogBreeds;
