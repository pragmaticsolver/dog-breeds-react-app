import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { IDog } from "../../models/dogs.models";

interface IDogCardProps {
  breed: string | undefined;
  dog: string;
  isFavorite: boolean;
  onFavorite?: (data: IDog) => void;
  onUnfavorite?: (data: IDog) => void;
}

const dogNameExtractor = (url: string) => {
  const splitList = url.split("/");
  const dogId = splitList.at(-1);
  if (!dogId) return "";

  const dogName = dogId.split(".")[0];
  return dogName;
};

const DogCard = ({
  breed = "",
  dog = "",
  isFavorite = false,
  onFavorite = () => {},
  onUnfavorite = () => {},
}: IDogCardProps) => {
  const handleFavoriteDog = () => {
    onFavorite({ breed, dog });
  };

  const handleUnfavoriteDog = () => {
    onUnfavorite({ breed, dog });
  };

  return (
    <div className="card card-dog">
      <img alt="dog" src={dog} />
      <div className="card-caption">
        <span>
          {breed} - {dogNameExtractor(dog)}
        </span>
      </div>
      <div className="card-actions">
        {isFavorite ? (
          <IconButton
            color="secondary"
            aria-label="Unfavorite"
            component="span"
            onClick={handleUnfavoriteDog}
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            color="secondary"
            aria-label="Favorite"
            component="span"
            onClick={handleFavoriteDog}
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default DogCard;
