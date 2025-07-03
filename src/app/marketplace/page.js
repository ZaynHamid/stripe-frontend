"use client";
import { useState, useEffect } from "react";
import { Typography, Container, Stack, Box, Grid, Button, CircularProgress } from "@mui/material";
import ResponsiveAppBar from "../components/navbar";
import genCheckoutUrl from "../components/stripe";
import { useRouter } from "next/navigation";

export default function Marketplace() {
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [customerId, setCustomerId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);

        if (typeof window !== "undefined") {
            setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
            setCustomerId(localStorage.getItem("customerId"));
        }

        return () => clearTimeout(timer);
    }, []);

    const items = [
        {
            img: 'https://linda-hoang.com/wp-content/uploads/2014/10/img-placeholder-dark.jpg',
            text: 'Netflix Subscription',
            price: 10,
            priceId: "price_1ReIi6P9FPWPMNlHcUG7AF6x",
            isSub: true
        },
        {
            img: 'https://linda-hoang.com/wp-content/uploads/2014/10/img-placeholder-dark.jpg',
            text: 'NordVPN Subscription',
            price: 20,
            priceId: "price_1ReIicP9FPWPMNlHNmuy2jVJ",
            isSub: true
        },
        {
            img: 'https://linda-hoang.com/wp-content/uploads/2014/10/img-placeholder-dark.jpg',
            text: 'Car Service Subscription',
            price: 30,
            priceId: "price_1ReImFP9FPWPMNlHBFciv9Vp",
            isSub: true
        },
    ];

    const oneTimeItems = [
        {
            img: 'https://linda-hoang.com/wp-content/uploads/2014/10/img-placeholder-dark.jpg',
            text: 'Donate',
            price: 5,
            priceId: "price_1ReImlP9FPWPMNlH1fUMwx9m",
            isSub: false
        },
        {
            img: 'https://linda-hoang.com/wp-content/uploads/2014/10/img-placeholder-dark.jpg',
            text: 'Udemy Course',
            price: 50,
            priceId: "price_1ReItmP9FPWPMNlHrvYiK0NL",
            isSub: false
        },
        {
            img: 'https://linda-hoang.com/wp-content/uploads/2014/10/img-placeholder-dark.jpg',
            text: 'Website Template',
            price: 150,
            priceId: "price_1ReIwAP9FPWPMNlHhpiQPiQX",
            isSub: false
        },
    ];

    const handleCLick = async (priceId, isSub) => {
        const url = await genCheckoutUrl(priceId, isSub, customerId);
        if (url) {
            window.location.href = url.session_url;
        }
    };

    return (
        <>
            <ResponsiveAppBar />
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '80vh',
                        mt: '4rem',
                    }}
                >
                    <CircularProgress size={64} color="inherit" sx={{ color: "#888" }} />
                </Box>
            ) : (
                <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                  
                    {!isLoggedIn && (
                        <div>
                             <Typography variant="h4" mt={12} mb={2} align="center" component="h4">
                        Login to start purchasing items
                    </Typography>
                        <Button
                            onClick={() => router.push("/login")}
                            sx={{ ml: 'auto', mr: 'auto', display: 'block' }}
                        >
                            Login
                        </Button>
                        </div>
                     
                    )}

                    <Typography variant="h4" mt={12} component="h4">
                        Subscriptions
                    </Typography>

                    <Grid container spacing={6} justifyContent="center" mt={4}>
                        {items.map((item, index) => (
                            <Grid
                                item
                                key={index}
                                xs={12}
                                sm={6}
                                md={4}
                                display="flex"
                                justifyContent="center"
                            >
                                <Stack
                                    direction="column"
                                    alignItems="center"
                                    spacing={2}
                                    sx={{
                                        width: '100%',
                                        maxWidth: 400,
                                        backgroundColor: '#1d1d1f',
                                        borderRadius: 2,
                                        padding: 2,
                                        color: '#fff',
                                        mt: 4,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={item.img}
                                        alt={item.text}
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: 1,
                                        }}
                                    />
                                    <Typography variant="h6" align="center">
                                        {item.text}
                                    </Typography>
                                    {isLoggedIn && (
                                        <Button
                                            onClick={() => handleCLick(item.priceId, item.isSub)}
                                            sx={{
                                                my: 2,
                                                color: '#1d1d1f',
                                                display: 'block',
                                                background: "#fff",
                                                transition: ".2s all ease"
                                            }}
                                        >
                                            Subscribe Now for ${item.price}/month
                                        </Button>
                                    )}
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>

                    <Typography variant="h4" mt={12} component="h4">
                        One-time Purchases
                    </Typography>

                    <Grid container spacing={6} justifyContent="center" mt={4}>
                        {oneTimeItems.map((item, index) => (
                            <Grid
                                item
                                key={index}
                                xs={12}
                                sm={6}
                                md={4}
                                display="flex"
                                justifyContent="center"
                            >
                                <Stack
                                    direction="column"
                                    alignItems="center"
                                    spacing={2}
                                    sx={{
                                        width: '100%',
                                        maxWidth: 400,
                                        backgroundColor: '#1d1d1f',
                                        borderRadius: 2,
                                        padding: 2,
                                        color: '#fff',
                                        mt: 4,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={item.img}
                                        alt={item.text}
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: 1,
                                        }}
                                    />
                                    <Typography variant="h6" align="center">
                                        {item.text}
                                    </Typography>
                                    {isLoggedIn && (
                                        <Button
                                            onClick={() => handleCLick(item.priceId)}
                                            sx={{
                                                my: 2,
                                                color: '#1d1d1f',
                                                display: 'block',
                                                background: "#fff",
                                                transition: ".2s all ease"
                                            }}
                                        >
                                            Buy Now for ${item.price}
                                        </Button>
                                    )}
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>

                    <Typography variant="h4" mt={12} component="h4">
                        Usage-based Purchases
                    </Typography>

                    <Stack
                        direction="column"
                        alignItems="center"
                        spacing={2}
                        sx={{
                            width: '100%',
                            maxWidth: 600,
                            backgroundColor: '#1d1d1f',
                            borderRadius: 2,
                            padding: 2,
                            color: '#fff',
                            mt: 4,
                            ml: 'auto',
                            mr: "auto"
                        }}
                    >
                        <Box
                            component="img"
                            src={"https://linda-hoang.com/wp-content/uploads/2014/10/img-placeholder-dark.jpg"}
                            alt="Item"
                            sx={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: 1,
                            }}
                        />
                        <Typography variant="h6" align="center" sx={{ fontSize: '1rem' }}>
                            Counter Game: Track your spending in real time. Each click on the add or subtract button adjusts your total cost based on your actions.
                        </Typography>
                        {isLoggedIn && (
                            <Button
                                onClick={() => router.replace("/counter")}
                                sx={{
                                    my: 2,
                                    color: '#1d1d1f',
                                    display: 'block',
                                    background: "#fff",
                                    transition: ".2s all ease",
                                    p: ".8rem 1rem"
                                }}
                            >
                                Play Counter Game
                            </Button>
                        )}
                    </Stack>
                </Container>
            )}
        </>
    );
}
