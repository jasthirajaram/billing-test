import React from "react";
import Sidenav from "../components/Sidenav";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export const GitPage = () => {
  return (
    <>
     <Navbar />
    <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
        <h1>GitPage</h1>
      </Box>
    </>
  );
};

export default GitPage;
