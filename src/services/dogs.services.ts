import Api from "./api";
import { IDogBreed } from "../models/dogs.models";

const getBreeds: () => Promise<IDogBreed[]> = async () => {
  try {
    const { data } = await Api.get("/breeds/list/all");
    const breedsList = Object.keys(data.message);

    const breedsPromiseList = breedsList.map(getBreedRandomImage);
    const breeds = await Promise.all(breedsPromiseList);
    return breeds;
  } catch (error) {
    return [];
  }
};

const getBreedRandomImage: (breed: string) => Promise<IDogBreed> = async (
  breed
) => {
  const { data } = await Api.get(`/breed/${breed}/images/random`);
  return { breed, image: data.message };
};

const getDogsByBreed: (breed: string) => Promise<string[]> = async (breed) => {
  const { data } = await Api.get(`/breed/${breed}/images`);
  return data.message;
};

export { getBreeds, getDogsByBreed };
