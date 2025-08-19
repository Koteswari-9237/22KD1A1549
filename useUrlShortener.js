import React, { useState } from "react";
import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material";
import { log } from "../utils/loggingMiddleware";

export default function UrlShortener() {
    const [urls, setUrls] = useState([{ original: "", shortcode: "", validity: 30 }]);
    const [results, setResults] = useState([]);

    const handleChange = (index, field, value) => {
        const newUrls = [...urls];
        newUrls[index][field] = value;
        setUrls(newUrls);
    };

    const addUrlField = () => {
        if (urls.length < 5) {
            setUrls([...urls, { original: "", shortcode: "", validity: 30 }]);
        }
    };

    const handleSubmit = async () => {
        try {
            const shortened = urls.map(u => ({
                original: u.original,
                shortcode: u.shortcode || Math.random().toString(36).substring(2, 8),
                validity: u.validity || 30,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + (u.validity || 30) * 60 * 1000)
            }));
            setResults(shortened);

            // Logging each URL
            for (let u of shortened) {
                await log("frontend", "info", "component", `Shortened URL: ${u.original} -> ${u.shortcode}`);
            }
        } catch (err) {
            await log("frontend", "error", "component", "Error generating shortened URLs");
        }
    };

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>URL Shortener</Typography>
            {urls.map((u, idx) => (
                <Paper key={idx} sx={{ p:2, mb:2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5}>
                            <TextField 
                                label="Original URL" 
                                fullWidth 
                                value={u.original} 
                                onChange={e => handleChange(idx, "original", e.target.value)} 
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField 
                                label="Shortcode (optional)" 
                                fullWidth 
                                value={u.shortcode} 
                                onChange={e => handleChange(idx, "shortcode", e.target.value)} 
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <TextField 
                                type="number"
                                label="Validity (min)" 
                                fullWidth 
                                value={u.validity} 
                                onChange={e => handleChange(idx, "validity", e.target.value)} 
                            />
                        </Grid>
                    </Grid>
                </Paper>
            ))}
            <Button variant="outlined" onClick={addUrlField} sx={{ mr:2 }}>Add URL</Button>
            <Button variant="contained" onClick={handleSubmit}>Shorten URLs</Button>

            {results.length > 0 && (
                <Box mt={4}>
                    <Typography variant="h5">Results:</Typography>
                    {results.map((r, idx) => (
                        <Paper key={idx} sx={{ p:2, mt:2 }}>
                            <Typography>Original: {r.original}</Typography>
                            <Typography>Shortened: {r.shortcode}</Typography>
                            <Typography>Expires At: {r.expiresAt.toLocaleString()}</Typography>
                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    );
}
