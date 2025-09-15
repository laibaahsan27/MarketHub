import React, { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Typography,
    Snackbar,
    Alert,
    Stack,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import axios from "axios";
import AddProductForm from "../components/AddProductForm";
import ProductCard from "../components/ProductCard";
import ProductDialog from "../components/ProductDialog";
import SearchFilter from "../components/SearchFilter";

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        severity: "success",
        message: "",
    });
    const [filters, setFilters] = useState({
        search: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        inStock: "",
    });

    const token = localStorage.getItem("token");

    // Fetch products
    const fetchProducts = async (f = filters) => {
        try {
            const params = {};
            if (f.search) params.search = f.search;
            if (f.category) params.category = f.category;
            if (f.minPrice) params.minPrice = f.minPrice;
            if (f.maxPrice) params.maxPrice = f.maxPrice;
            if (f.inStock !== "") params.inStock = f.inStock === "true";

            const res = await axios.get(`${API}/api/products`, { params });
            setProducts(res.data);
        } catch (err) {
            console.error(err);
            setAlert({
                open: true,
                severity: "error",
                message: "Failed to load products.",
            });
        }
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line
    }, []);

    // Add product
    const handleAdd = async (payload) => {
        try {
            await axios.post(`${API}/api/products`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAlert({ open: true, severity: "success", message: "Product added." });
            await fetchProducts();
            setOpenAdd(false); // close modal after add
            return true;
        } catch (err) {
            console.error(err);
            setAlert({
                open: true,
                severity: "error",
                message:
                    err.response?.data?.error || "Failed to add product. Check inputs.",
            });
            return false;
        }
    };

    // Product details
    const handleOpenDetails = async (id) => {
        try {
            const res = await axios.get(`${API}/api/products/${id}`);
            setSelected(res.data);
        } catch (err) {
            setAlert({
                open: true,
                severity: "error",
                message: "Failed to load product details.",
            });
        }
    };

    const handleCloseDetails = () => setSelected(null);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 3 }}
            >
                <Typography variant="h4" color="primary">
                    Market Hub Dashboard
                </Typography>

                {/* Add Product Button */}
                <Button variant="contained" onClick={() => setOpenAdd(true)}>
                    + Add Product
                </Button>
            </Stack>

            {/* Search + count */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
            >
                <SearchFilter
                    filters={filters}
                    setFilters={(f) => {
                        setFilters(f);
                        fetchProducts(f);
                    }}
                />

            </Stack>

            <Grid
                container
                spacing={2}
                sx={{
                    mt: 5,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: 2
                }}
            >
                {products.map((p) => (
                    <ProductCard
                        key={p._id || p.id}
                        product={p}
                        onOpen={handleOpenDetails}
                    />
                ))}
            </Grid>

            {/* Product details modal */}
            <ProductDialog
                product={selected}
                open={!!selected}
                onClose={handleCloseDetails}
            />

            {/* Add product modal */}
            <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent dividers>
                    <AddProductForm onAdd={handleAdd} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* Alerts */}
            <Snackbar
                open={alert.open}
                autoHideDuration={3000}
                onClose={() => setAlert((s) => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setAlert((s) => ({ ...s, open: false }))}
                    severity={alert.severity}
                    sx={{ width: "100%" }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
