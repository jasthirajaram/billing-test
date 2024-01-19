import { IconButton, Badge } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const Logout= () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); // Redirect to '/' after logout
  };

  return (
    <IconButton color="inherit" onClick={handleLogout}>
      <Badge color="secondary">
        <LogoutIcon />
      </Badge>
    </IconButton>
  );
};

export default Logout;
