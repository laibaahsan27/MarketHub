import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";

export default function ProductDialog({ product, open, onClose }) {
    if (!product) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                    <Box component="img" src={product.imageUrl || `https://via.placeholder.com/400x300.png?text=${encodeURIComponent(product.name)}`} alt={product.name} sx={{ width: { xs: "100%", sm: 300 }, borderRadius: 2 }} />
                    <Box>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>{product.category}</Typography>
                        <Typography variant="h6" color="primary">₹{product.price?.toFixed?.(2) ?? product.price}</Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}>{product.description}</Typography>
                        <Typography variant="caption" sx={{ mt: 2, display: "block" }}>Added: {new Date(product.createdAt).toLocaleString()}</Typography>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
