import React, { useState } from "react";
import UrlShortener from "./pages/UrlShortener";
import StatsPage from "./pages/StatsPage";
import { Container, Button, Box } from "@mui/material";

function App() {
    const [view, setView] = useState("shortener");
    const [results, setResults] = useState([]);

    return (
        <Container>
            <Box mt={2} mb={2}>
                <Button onClick={() => setView("shortener")}>Shorten URL</Button>
                <Button onClick={() => setView("stats")}>Stats</Button>
            </Box>
            {view === "shortener" ? 
                <UrlShortener setResults={setResults} /> : 
                <StatsPage shortenedUrls={results} />
            }
        </Container>
    );
}

export default App;
