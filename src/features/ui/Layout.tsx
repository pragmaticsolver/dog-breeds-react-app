import { Outlet } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Navbar />
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default Layout;
