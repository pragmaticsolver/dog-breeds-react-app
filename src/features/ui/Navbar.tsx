import { useNavigate, Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { styled } from "@mui/material/styles";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 0 0.5em;
`;

const Navbar = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/dog-breeds-react-app");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="back"
          sx={{ mr: 2 }}
          onClick={navigateToHome}
        >
          <HomeIcon />
        </IconButton>
        <StyledLink to="/dog-breeds-react-app/favorite-images">Favorite</StyledLink>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
