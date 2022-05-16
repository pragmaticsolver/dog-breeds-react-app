import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";

import useFetchDogs from "../features/dogs/useFetchDogs";
import DogCard from "../features/dogs/DogCard";
import { DogsContext } from "../features/dogs/DogsContext";

const BreedDogs = () => {
  const params = useParams();
  const { dogs, fetchDogs } = useFetchDogs();
  const { favorites, onFavorite, onUnfavorite } = useContext(DogsContext);

  useEffect(() => {
    if (params?.breadName) {
      fetchDogs(params.breadName);
    }
  }, [params, fetchDogs]);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat( auto-fill, minmax(320px, 1fr) )",
          gap: "1em",
        }}
      >
        {(dogs ?? []).map((dog) => (
          <DogCard
            key={dog}
            isFavorite={favorites.some(({ dog: fDog }) => fDog === dog)}
            breed={params?.breadName}
            dog={dog}
            onFavorite={onFavorite}
            onUnfavorite={onUnfavorite}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default BreedDogs;
