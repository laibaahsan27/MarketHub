import React, { useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";

const categories = ["", "Electronics", "Home", "Clothing", "Beauty", "Sports", "General"];

export default function SearchFilter({ filters, setFilters }) {
    const [local, setLocal] = useState(filters);

    const apply = () => {
        setFilters(local);
    };

    const reset = () => {
        const empty = { search: "", category: "", minPrice: "", maxPrice: "", inStock: "" };
        setLocal(empty);
        setFilters(empty);
    };

    return (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
            <TextField size="small" label="Search" value={local.search} onChange={(e) => setLocal({ ...local, search: e.target.value })} />
            <TextField size="small" select label="Category" value={local.category} onChange={(e) => setLocal({ ...local, category: e.target.value })} sx={{ minWidth: 140 }}>
                {categories.map((c) => <MenuItem key={c} value={c}>{c || "All"}</MenuItem>)}
            </TextField>
            <TextField size="small" label="Min" type="number" value={local.minPrice} onChange={(e) => setLocal({ ...local, minPrice: e.target.value })} sx={{ width: 90 }} />
            <TextField size="small" label="Max" type="number" value={local.maxPrice} onChange={(e) => setLocal({ ...local, maxPrice: e.target.value })} sx={{ width: 90 }} />
            <TextField size="small" select label="Stock" value={local.inStock} onChange={(e) => setLocal({ ...local, inStock: e.target.value })} sx={{ width: 120 }}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="true">In stock</MenuItem>
                <MenuItem value="false">Out of stock</MenuItem>
            </TextField>
            <Button variant="contained" size="small" onClick={apply}>Apply</Button>
            <Button variant="outlined" size="small" onClick={reset}>Reset</Button>
        </Box>
    );
}
