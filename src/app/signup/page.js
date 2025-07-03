"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import ResponsiveAppBar from "../components/navbar";
import axios from "axios";
import signup from "../components/signup";
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

export default function SignupForm() {
const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
      confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if(validate()){
         console.log("Form Data:", formData);
    const getData = await signup(formData);
    if(getData.customerId){
      router.push("/login");
    }
    }

  };

  return (
    <>  <ResponsiveAppBar />
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 8,
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              backgroundColor: "background.paper",
              padding: 4,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Sign Up
            </Typography>

            <Stack spacing={3} mt={3}>
              <TextField
                label="Full Name"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleChange("name")}
                error={!!errors.name}
                helperText={errors.name}
              />

              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleChange("email")}
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={formData.password}
                onChange={handleChange("password")}
                error={!!errors.password}
                helperText={errors.password}
              />

              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                variant="outlined"
                value={formData.confirmPassword}
                onChange={handleChange("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSignup}
                sx={{ fontWeight: "bold" }}
              >
                Sign Up
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
                onClick={() => router.push("/login")}
              >
                Login here
              </Button>

              
            </Stack>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
    </>
  
  );
}
