import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Box,
    Chip,
} from "@mui/material";

export default function ProductCard({ product, onOpen }) {
    const id = product._id || product.id || product.Id;
    console.log("product", product)
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                height: 260,
            }}
        >
            <Box
                sx={{
                    height: 120,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#faf5ff",
                }}
            >
                <CardMedia
                    component="img"
                    image={
                        product.imageUrl ||
                        `https://via.placeholder.com/300x180.png?text=${encodeURIComponent(
                            product.name || "No+Image"
                        )}`
                    }
                    alt={product.name}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </Box>

            <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
                <Typography variant="subtitle2" noWrap>
                    {product.name}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {product.description}
                </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between", px: 1.5, pb: 1.5 }}>
                <Box>
                    <Typography variant="subtitle2">
                        ₹{product.price?.toFixed?.(2) ?? product.price}
                    </Typography>
                    {product.inStock ? (
                        <Chip label="In Stock" size="small" sx={{ mt: 1 }} />
                    ) : (
                        <Chip
                            label="Out of stock"
                            color="warning"
                            size="small"
                            sx={{ mt: 1 }}
                        />
                    )}
                </Box>
                <Button size="small" onClick={() => onOpen(product._id || product.id)}>
                    Details
                </Button>
            </CardActions>
        </Card>
    );
}
