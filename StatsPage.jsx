import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function StatsPage({ shortenedUrls }) {
    // For now, we use shortenedUrls from state (mock)
    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>URL Statistics</Typography>
            {shortenedUrls && shortenedUrls.map((u, idx) => (
                <Paper key={idx} sx={{ p:2, mb:2 }}>
                    <Typography>Shortcode: {u.shortcode}</Typography>
                    <Typography>Created: {u.createdAt.toLocaleString()}</Typography>
                    <Typography>Expires: {u.expiresAt.toLocaleString()}</Typography>
                    <Typography>Clicks: 0 (mock)</Typography>
                </Paper>
            ))}
        </Box>
    );
}
