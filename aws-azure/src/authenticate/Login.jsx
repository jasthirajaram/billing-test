import React, { useState, useEffect } from "react";
import {
  Box,
  InputLabel,
  createTheme,
  ThemeProvider,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import styles from "../styles.module.css";
import InputComponent from "./InputComponent";
import toast from "react-hot-toast";
import { ButtonComponent } from "./ButtonComponent";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { UserLoginService } from "../services/Services";
import { Link, useNavigate} from "react-router-dom";



const Login = () => {
  
  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#161A30",
      },
      secondary: {
        main: "#161A30",
      },
      text: {
        primary: "#000000",
      },
      typography: {
        fontFamily: "Inter",
      },
    },
  });

  const [form, setForm] = useState({ userName: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const forLogin = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const forSubmit = async () => {
    if (form.userName && form.password) {
      
 
         UserLoginService(form).then((res) => {
          console.log(res);
          setForm({ userName: "", password: "" });
       
        localStorage.setItem("token", res?.token);
        localStorage.setItem("userName", form?.userName);
        toast.success(`Welcome ${form.userName}`);
        navigate("/home");
         }).catch((err) => {
          toast.error("Invalid Login Details")
         })
      
    } else {
      toast.error("Please fill in all fields");
      return
    }
  };

 

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Box
          component="main"
          className={styles.centeredContainer}
          sx={{ padding: "2rem" }}
        >
          <Box component={"div"} className={styles.container}>
            <Box component={"p"} className={styles.login}>
              Log in
            </Box>
            <Box component={"p"} className={styles.mintxt}>
              Enter your credential to access your account
            </Box>

            <Box component={"div"} className={styles.space}>
              <InputLabel>ENTER USERNAME</InputLabel>
              <InputComponent
                name="userName"
                type="string"
                placeholder="Enter Username"
                value={form.userName}
                forChange={forLogin}
                icon={null}
                togglePasswordVisibility={null}
              />
            </Box>

            <Box component={"div"} className={styles.space}>
              <InputLabel>PASSWORD</InputLabel>
              <InputComponent
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={form.password}
                forChange={forLogin}
                icon={showPassword ? <VisibilityOff /> : <Visibility />}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                my: "1.6rem",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={<Checkbox />}
                label="Remember me for 30 days"
              />
              <Typography component={"span"} className={styles.accounttxt}>
                Forgot password?
              </Typography>
            </Box>

            <ButtonComponent variant="contained" fullWidth onClick={forSubmit}>
              Log In
            </ButtonComponent>

            <Box component={"p"} className={styles.minchild}>
              Are you new user?
              <Link to={"/signup"} className={styles.accounttxt}>
                Sign Up
              </Link>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default Login;



// import React, { useState } from "react";
// import {
//   Box,
//   InputLabel,
//   createTheme,
//   ThemeProvider,
//   FormControlLabel,
//   Checkbox,
//   Typography,
// } from "@mui/material";
// import styles from "../styles.module.css";
// import InputComponent from "./InputComponent";
// import toast from "react-hot-toast";
// import { ButtonComponent } from "./ButtonComponent";
// import { VisibilityOff, Visibility } from "@mui/icons-material";
// import { UserLoginService } from "../services/Services";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const theme = createTheme({
//     // Your theme settings
//   });

//   const [form, setForm] = useState({ userName: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const forLogin = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value.trim() }); // Trim whitespace from username
//   };

//   const forSubmit = async () => {
//     const { userName, password } = form;
//     if (!userName || !password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     if (password.length < 6) {
//       toast.error("Password should be at least 6 characters");
//       return;
//     }

//     try {
//       const res = await UserLoginService(form);
//       localStorage.setItem("token", res.token);
//       localStorage.setItem("userName", form.userName);
//       toast.success(`Welcome ${form.userName}`);
//       navigate("/home");
//     } catch (err) {
//       toast.error("Invalid Login Details");
//     }
//   };

//   return (
//     <React.Fragment>
//       <ThemeProvider theme={theme}>
        
//       <Box
//           component="main"
//           className={styles.centeredContainer}
//           sx={{ padding: "2rem" }}
//         >
//           <Box component={"div"} className={styles.container}>
//             <Box component={"p"} className={styles.login}>
//               Log in
//             </Box>
//             <Box component={"p"} className={styles.mintxt}>
//               Enter your credential to access your account
//             </Box>

//             <Box component={"div"} className={styles.space}>
//               <InputLabel>ENTER USERNAME</InputLabel>
//               <InputComponent
//                 name="userName"
//                 type="string"
//                 placeholder="Enter Username"
//                 value={form.userName}
//                 forChange={forLogin}
//                 icon={null}
//                 togglePasswordVisibility={null}
//               />
//             </Box>

//             <Box component={"div"} className={styles.space}>
//               <InputLabel>PASSWORD</InputLabel>
//               <InputComponent
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter Password"
//                 value={form.password}
//                 forChange={forLogin}
//                 icon={showPassword ? <VisibilityOff /> : <Visibility />}
//                 togglePasswordVisibility={togglePasswordVisibility}
//               />
//             </Box>

//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 my: "1.6rem",
//                 alignItems: "center",
//               }}
//             >
//               <FormControlLabel
//                 control={<Checkbox />}
//                 label="Remember me for 30 days"
//               />
//               <Typography component={"span"} className={styles.accounttxt}>
//                 Forgot password?
//               </Typography>
//             </Box>

//             <ButtonComponent variant="contained" fullWidth onClick={forSubmit}>
//               Log In
//             </ButtonComponent>

//             <Box component={"p"} className={styles.minchild}>
//               Are you new user?
//               <Link to={"/signup"} className={styles.accounttxt}>
//                 Sign Up
//               </Link>
//             </Box>
//           </Box>
//         </Box>

//       </ThemeProvider>
//     </React.Fragment>
//   );
// };

// export default Login;

