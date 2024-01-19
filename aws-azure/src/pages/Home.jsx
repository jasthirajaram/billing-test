import React from "react";
import Sidenav from "../components/Sidenav";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import BarsDataset from "../components/HomeBarChart";

export const Home = () => {
  const bodyStyle = {
    backgroundColor: "#f0f0f0",
    minHeight: "100vh",
    padding: "20px",
    overflowX: "hidden",
  };

  return (
    <div style={bodyStyle}>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid sx={{ px: 2, py: 4, m: 2 }} item xs={11.2} md={6} lg={6}>
            <BarsDataset />
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
