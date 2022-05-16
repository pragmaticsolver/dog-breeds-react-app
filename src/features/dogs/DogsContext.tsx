import { createContext, useCallback, useState } from "react";

import { IDog } from "../../models/dogs.models";

interface IDogsContextValue {
  favorites: IDog[];
  onFavorite: (data: IDog) => void;
  onUnfavorite: (data: IDog) => void;
}

const DefaultContextValue: IDogsContextValue = {
  favorites: [],
  onFavorite: () => {},
  onUnfavorite: () => {},
};

const DogsContext = createContext<IDogsContextValue>(DefaultContextValue);

const DogsContextProvider = ({ children }: { children: JSX.Element }) => {
  const [favorites, setFavorites] = useState<IDog[]>([]);

  const handleFavorite = useCallback((data: IDog) => {
    setFavorites((prev) => [...prev, data]);
  }, []);

  const handleUnfavorite = useCallback((data: IDog) => {
    setFavorites((prev) => prev.filter((el) => el.dog !== data.dog));
  }, []);

  return (
    <DogsContext.Provider
      value={{
        favorites,
        onFavorite: handleFavorite,
        onUnfavorite: handleUnfavorite,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export { DogsContext, DogsContextProvider };
