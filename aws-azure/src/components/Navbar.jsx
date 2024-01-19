import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppStore } from "../appStore";
import Logout from "../authenticate/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default function PrimarySearchAppBar() {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);

  const userName = localStorage.getItem("userName");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Billing-Dashboard
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <Badge color="secondary">
              <AccountCircleIcon />
            </Badge>
          </IconButton>
          <Typography component={"span"} sx={{ color: "#FFFF" }}>
            {userName?.toUpperCase()}
          </Typography>

          <Logout />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
