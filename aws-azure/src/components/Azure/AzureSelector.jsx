import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import axios from "axios";

const AzureSelector = ({ resourseType, handleServiceChange }) => {
  const [serviceOptions, setServiceOptions] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const fetchServiceOptions = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token && !clicked) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.get("http://localhost:8080/azure/distinctresourceType", config);
          setServiceOptions(response.data);
          setClicked(true);
        } else {
          console.error("Token not found in localStorage or options already fetched");
        }
      } catch (error) {
        console.error("Error fetching service options:", error);
      }
    };

    fetchServiceOptions();
  }, [clicked]);

  const handleFocus = () => {
    if (!clicked) {
      setClicked(true);
    }
  };

  const newPropsCss = {
    backgroundColor: "#FFFF",
    width: "340px",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#FFFF",
      color: "black",
    },
    "&.Mui-selected": {
      backgroundColor: "#FFFF",
      color: "black",
    },
  };

  return (
    <FormControl sx={{ ...newPropsCss }} fullWidth>
      <Select
        fullWidth
        sx={{ ...newPropsCss, height: "2.4em" }}
        labelId="service-label"
        value={resourseType || ""}
        onChange={handleServiceChange}
        onFocus={handleFocus}
      >
        <MenuItem value="">Select Resourse</MenuItem>
        {serviceOptions.map((option, index) => (
          <MenuItem key={index} value={option} sx={{ ...newPropsCss }}>
          {option}
        </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AzureSelector;
