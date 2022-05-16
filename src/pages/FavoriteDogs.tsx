import { useContext, useEffect, useMemo, useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

import { DogsContext } from "../features/dogs/DogsContext";
import DogCard from "../features/dogs/DogCard";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[]) {
  return {
    fontWeight: personName.includes(name) ? 600 : 400,
  };
}

const LIMIT_PER_PAGE = 9;

const FavoriteDogs = () => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [breedsOptions, setBreedsOptions] = useState<string[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageIndex(page);
  };

  const handleSelectedBreedsChange = (
    event: SelectChangeEvent<typeof selectedBreeds>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedBreeds(typeof value === "string" ? value.split(",") : value);
  };

  const { favorites, onUnfavorite } = useContext(DogsContext);
  useEffect(() => {
    if (!favorites) return;

    const breedsSet = new Set<string>();
    favorites.forEach(({ breed }) => breedsSet.add(breed));
    setBreedsOptions(Array.from(breedsSet));
  }, [favorites]);

  const favoritesFilteredByBreeds = useMemo(() => {
    if (!favorites) return [];

    if (!selectedBreeds || !selectedBreeds.length) return favorites;

    return favorites.filter(({ breed }) => selectedBreeds.includes(breed));
  }, [favorites, selectedBreeds]);

  return (
    <Grid container>
      {favorites.length ? (
        <>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="dog-breeds-multiple-label">Breeds</InputLabel>
              <Select
                labelId="dog-breeds-multiple-label"
                id="dog-breeds-multiple"
                multiple
                value={selectedBreeds}
                onChange={handleSelectedBreedsChange}
                input={
                  <OutlinedInput id="select-multiple-breeds" label="Breeds" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {breedsOptions.map((breed) => (
                  <MenuItem
                    key={breed}
                    value={breed}
                    style={getStyles(breed, selectedBreeds)}
                  >
                    {breed}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat( auto-fill, minmax(320px, 1fr) )",
              gap: "1em",
            }}
          >
            {favoritesFilteredByBreeds
              .slice(
                LIMIT_PER_PAGE * (pageIndex - 1),
                LIMIT_PER_PAGE * pageIndex
              )
              .map(({ dog, breed }) => (
                <DogCard
                  key={dog}
                  isFavorite
                  breed={breed}
                  dog={dog}
                  onUnfavorite={onUnfavorite}
                />
              ))}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "0.5em 0",
            }}
          >
            <Pagination
              count={Math.ceil(
                favoritesFilteredByBreeds.length / LIMIT_PER_PAGE
              )}
              page={pageIndex}
              onChange={handlePageChange}
              variant="outlined"
            />
          </Grid>
        </>
      ) : (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "0.5em 0",
          }}
        >
          <Typography>No Favorites!</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default FavoriteDogs;
