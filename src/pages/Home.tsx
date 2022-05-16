import React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { IDogBreed } from "../models/dogs.models";
import useFetchDogBreeds from "../features/dogs/useFetchDogBreeds";

const Home = () => {
  const navigate = useNavigate();

  const { dogBreeds } = useFetchDogBreeds();
  const [dogBreedsOptions, setDogBreedsOptions] = React.useState<IDogBreed[]>(
    []
  );

  const handleBreedTextChange: (
    event: React.SyntheticEvent,
    value: string
  ) => void = (_event, value) => {
    if (!value) setDogBreedsOptions([]);

    setDogBreedsOptions(
      (dogBreeds ?? []).filter(({ breed }) => breed.startsWith(value))
    );
  };

  const handleSelectDogBreed: (
    event: React.SyntheticEvent,
    value: IDogBreed | null
  ) => void = (_event, value) => {
    if (!value) return;
    navigate(`/breed/${value?.breed}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Autocomplete
          id="dogs-breeds-autocomplete"
          sx={{ width: 400, marginTop: "1em" }}
          options={dogBreedsOptions}
          onChange={handleSelectDogBreed}
          onInputChange={handleBreedTextChange}
          getOptionLabel={(option) => option.breed}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="48"
                src={option.image}
                alt={option.breed}
              />
              {option.breed}
            </Box>
          )}
          renderInput={(params) => <TextField {...params} label="Breeds" />}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
