// src/components/FoodItemsForm.jsx
import React from 'react';
import { Stack, TextField, MenuItem, IconButton, Button, Typography, Divider } from '@mui/material';
import { Add, Delete, Inventory2 } from '@mui/icons-material';

export default function FoodItemsForm({ foodItems, setFoodItems }) {
    const addFoodItem = () => {
        setFoodItems([...foodItems, { food: '', amount: '', unit: 'kg' }]);
    };

    const removeFoodItem = (index) => {
        const newItems = foodItems.filter((_, i) => i !== index);
        setFoodItems(newItems.length ? newItems : [{ food: '', amount: '', unit: 'kg' }]);
    };

    const updateFoodItem = (index, field, value) => {
        const newItems = [...foodItems];
        newItems[index][field] = value;
        setFoodItems(newItems);
    };

    return (
        <>
            <Typography variant="h5" fontWeight="bold" mb={2} fontFamily="Inter, sans-serif">
                <Inventory2 color="warning" sx={{ mr: 1, verticalAlign: 'middle' }} />
                Food Items Available
            </Typography>

            {foodItems.map((item, index) => (
                <Stack key={index} direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2} alignItems="center">
                    <TextField
                        fullWidth
                        label="Food item (e.g., chicken,  split pea soup)"
                        value={item.food}
                        onChange={(e) => updateFoodItem(index, 'food', e.target.value)}
                    />
                    <TextField
                        label="Amount"
                        type="number"
                        value={item.amount}
                        onChange={(e) => updateFoodItem(index, 'amount', e.target.value)}
                        sx={{ width: { xs: '100%', sm: 120 } }}
                    />
                    <TextField
                        select
                        label="Unit"
                        value={item.unit}
                        onChange={(e) => updateFoodItem(index, 'unit', e.target.value)}
                        sx={{ width: { xs: '100%', sm: 120 } }}
                    >
                        <MenuItem value="kg">kg</MenuItem>
                        <MenuItem value="g">g</MenuItem>
                        <MenuItem value="liters">liters</MenuItem>
                        <MenuItem value="units">units</MenuItem>
                    </TextField>
                    {foodItems.length > 1 && (
                        <IconButton color="error" onClick={() => removeFoodItem(index)}>
                            <Delete />
                        </IconButton>
                    )}
                </Stack>
            ))}

            <Button
                variant="contained"
                color="warning"
                onClick={addFoodItem}
                startIcon={<Add />}
                sx={{ mt: 1, px: 3 }}
            >
                Add Another Item
            </Button>

            <Divider sx={{ my: 4 }} />
        </>
    );
}
