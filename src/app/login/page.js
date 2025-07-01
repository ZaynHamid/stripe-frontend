"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  Link,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from "react";
import ResponsiveAppBar from "../components/navbar";
import login from "../components/login";
import { useRouter } from "next/navigation";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1d1d1f",
    },
    text: {
      primary: "#fff",
    },
  },
});

export default function LoginForm() {
      const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleLogin = async () => {
    if (validate()) {
      const userData = {
        email: email,
        password: password,
      };
      const loginReq = await login(userData);
      const token = loginReq.token;
      const userEmail = loginReq.email;
      const username = loginReq.user;
      const customerId = loginReq.customerId;
      console.log("Login response:", loginReq);
      if (token) {
        localStorage.setItem("token", token) || null;
        localStorage.setItem("email", userEmail) || null ;
        localStorage.setItem("username", username) || null;
        localStorage.setItem("isLoggedIn", true) || null;
        localStorage.setItem("customerId", customerId) || null;
        router.push("/");
      }
    }
  };

  return (
    <>
    <ResponsiveAppBar />
     <ThemeProvider theme={darkTheme}>

      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              backgroundColor: 'background.paper',
              padding: 4,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>

            <Stack spacing={3} mt={3}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
              />

              

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                sx={{ fontWeight: 'bold' }}
              >
                Login
              </Button>

              <Divider sx={{ my: 2 }}>OR</Divider>

              <Button
                fullWidth
                variant="outlined"
                
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  '&:hover': {
                    backgroundColor: '#333',
                    borderColor: '#ccc',
                  },
                }}
                onClick={() => router.push("/signup")}
              >
                Sign up
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
    </>
   
  );
}
