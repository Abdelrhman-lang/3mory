"use client"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Swal from "sweetalert2"


export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ product, quantity, userEmail, colorImage, colorValue, size }, thunkApi) => {
        try {
            const res = await axios.post("/api/cart/create-cart", {
                userEmail,
                productId: product.id,
                name: product.name,
                price: product.newPrice,
                image: product.image,
                quantity: quantity || 1,
                colorImage: colorImage,
                colorValue: colorValue,
                size: size
            })
            if (res.status === 200) {
                thunkApi.dispatch(getCartItems({ userEmail }))
                return res.data

            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || "Failed to Add Product";
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
                position: "top-end",
                timer: 1500,
                toast: true,
                showConfirmButton: false
            });
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
)
export const getCartItems = createAsyncThunk("cart/getCartItems", async ({ userEmail }, thunkApi) => {
    try {
        const res = await axios.get(`/api/cart/get-cart-items?userEmail=${userEmail}`)
        if (res.status === 200) {
            return res.data
        }
    } catch (err) {
        thunkApi.rejectWithValue(err.response?.data || "Faild to Get Cart Items")
    }
})
export const deleteItemFromCart = createAsyncThunk("cart/deleteItemFromCart", async ({ itemId, userEmail }, thunkApi) => {
    try {
        const res = await axios.delete(`/api/cart/delete-from-cart?itemId=${itemId}`)
        if (res.status === 200) {
            thunkApi.dispatch(getCartItems({ userEmail }))
            return itemId;
        }
    } catch (err) {
        return thunkApi.rejectWithValue(
            err.response?.data || "Faild to delete item from cart"
        );
    }
})

const calcTotalPrice = (items) => {
    if (!items) return 0

    return items.reduce((acc, item) => {
        return acc + item.price * item.quantity
    }, 0)
}
export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalPrice: 0,
        loading: false,
        error: null,
        isOpen: false

    },
    reducers: {
        clearError: (state) => { state.error = null },

        openCart: (state) => { state.isOpen = true },
        closeCart: (state) => { state.isOpen = false },
        toggleCart: (state) => { state.isOpen = !state.isOpen }
    },
    extraReducers: (builder) => {
        builder
            // AddToCart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Added to Cart successfully",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });

            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get Cart Items
            .addCase(getCartItems.pending, (state) => {
                state.loading = true
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload.items
                state.totalPrice = calcTotalPrice(state.items)
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Delete from cart
            .addCase(deleteItemFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload)
                state.totalPrice = calcTotalPrice(state.items)
            })
        // 
    }
})

export const { clearError, openCart, closeCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;