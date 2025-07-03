import { Container, Typography } from "@mui/material";
import ResponsiveAppBar from "./components/navbar";
import StickyHeadTable from "./components/history";

export default function Home() {
  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth='xl' sx={{ mt: 12, mb: 4 }}>
        <Typography variant="h4">
          History
        </Typography>
        <StickyHeadTable />
      </Container>
    </>
  );
}