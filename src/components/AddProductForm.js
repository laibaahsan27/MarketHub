import React, { useState } from "react";
import { Paper, Typography, TextField, Button, Box, FormControlLabel, Switch } from "@mui/material";

export default function AddProductForm({ onAdd }) {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [inStock, setInStock] = useState(true);
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (!name.trim() || !price) {
            alert("Please add name and price.");
            return;
        }
        const payload = { name, description, imageUrl, price: parseFloat(price), category, inStock };
        setLoading(true);
        const ok = await onAdd(payload);
        if (ok) {
            setName(""); setImageUrl(""); setDescription(""); setPrice(""); setCategory(""); setInStock(true);
        }
        setLoading(false);
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>Add Product</Typography>
            <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Image URL" fullWidth margin="normal" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            <TextField label="Description" fullWidth multiline rows={3} margin="normal" value={description} onChange={(e) => setDescription(e.target.value)} />
            <TextField label="Price" fullWidth margin="normal" value={price} onChange={(e) => setPrice(e.target.value)} />
            <TextField label="Category" fullWidth margin="normal" value={category} onChange={(e) => setCategory(e.target.value)} />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                <FormControlLabel control={<Switch checked={inStock} onChange={(e) => setInStock(e.target.checked)} />} label="In Stock" />
                <Button variant="contained" onClick={submit} disabled={loading}>{loading ? "Adding..." : "Add Product"}</Button>
            </Box>
        </Paper>
    );
}
