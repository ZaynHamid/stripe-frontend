"use client";

import { Box, Button, Typography, Stack, Container } from "@mui/material";
import ResponsiveAppBar from "../components/navbar";
import { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { genUsageCheckoutUrl } from "../components/stripe";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [customerId, setCustomerId] = useState(null);
  const pricePerClick = 0.352;
  const total = (count * pricePerClick).toFixed(2);
  const priceId = "price_1RflZvP9FPWPMNlHRYmxASkS";

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCustomerId(localStorage.getItem("customerId"));
    }
  }, []);

  const handleAdd = () => setCount((prev) => prev + 1);
  const handleSubtract = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));

  const pay = async (count) => {
    if (!customerId) return; // optional guard

    const url = await genUsageCheckoutUrl(priceId, count, customerId);
    if (url) {
      window.location.href = url.session_url;
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="xl" sx={{ mt: 12 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Counter Game: Usage-Based Purchase
        </Typography>
        <Typography variant="h6" align="center" sx={{ my: 4, maxWidth: 800, mx: 'auto' }}>
          Increase the counter by clicking the buttons below. Each click adds ${pricePerClick.toFixed(3)} to your total.
        </Typography>

        <Box
          sx={{
            height: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack
            direction="row"
            spacing={4}
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: '#1d1d1f',
              padding: 4,
              borderRadius: 3,
              color: '#fff',
              maxWidth: 600,
              mx: "auto",
              boxShadow: 3,
            }}
          >
            <Button
              variant="contained"
              onClick={handleSubtract}
              sx={{
                minWidth: 80,
                backgroundColor: '#fff',
                color: '#1d1d1f',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              <RemoveIcon fontSize="large" />
            </Button>

            <Stack alignItems="center">
              <Typography variant="h2" fontWeight="700">
                {count}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Total: ${total}
              </Typography>
              <Button
                onClick={() => pay(count)}
                sx={{
                  mt: 2,
                  backgroundColor: '#fff',
                  color: '#1d1d1f',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                }}
              >
                Pay Now
              </Button>
            </Stack>

            <Button
              variant="contained"
              onClick={handleAdd}
              sx={{
                minWidth: 80,
                backgroundColor: '#fff',
                color: '#1d1d1f',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              <AddIcon fontSize="large" />
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
