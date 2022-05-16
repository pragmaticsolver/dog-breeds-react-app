import { useCallback, useState } from "react";
import { useQueryClient } from "react-query";

import * as DogsService from "../../services/dogs.services";

const useFetchDogs = () => {
  const queryClient = useQueryClient();
  const [dogs, setDogs] = useState<string[]>([]);

  const fetchDogs = useCallback(
    async (breed: string) => {
      const data = await queryClient.fetchQuery<string[]>(
        ["dogs", { breed }],
        () => DogsService.getDogsByBreed(breed)
      );
      setDogs(data.slice(0, 10));
    },
    [queryClient]
  );

  return { dogs, fetchDogs };
};

export default useFetchDogs;
