"use client"
import { createCart } from "@/services/cart/create/createCart"
import { deleteFromCart } from "@/services/cart/delete/deleteFromCart"
import { getCart } from "@/services/cart/get/getCart"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Swal from "sweetalert2"




export const addToCart = createAsyncThunk("cart/addToCart",async ({ product, quantity, userEmail, colorImage, colorValue, size }, thunkApi) => {
    try {
        const res = await createCart(userEmail,product.id, product.name, product.newPrice, product.image, quantity, colorValue, size, colorImage)
        if(!res?.success) {
            return thunkApi.rejectWithValue(res?.error || "Failed to Add Product")
        }
        thunkApi.dispatch(getCartItems({ userEmail }))
        return res.item
    } catch (error) {
        console.error("ADD_TO_CART_ERROR:", error)
        return thunkApi.rejectWithValue(error.message || "Failed to Add Product")
    }
})
export const getCartItems = createAsyncThunk("cart/getCartItems", async ({ userEmail }, thunkApi) => {
    try {
        const res = await getCart(userEmail)
        if (!res?.success) {
            return thunkApi.rejectWithValue(res?.error || "Failed to Get Cart Items")
        }
        return {
            items: res.items,
            cartId: res.cartId
        }
    } catch (err) {
        thunkApi.rejectWithValue(err?.error || "Failed to Get Cart Items")
    }
})
export const deleteItemFromCart = createAsyncThunk("cart/deleteItemFromCart", async ({ itemId, userEmail }, thunkApi) => {
    try {
        const res = await deleteFromCart(itemId)
        if (!res?.success) {
            return thunkApi.rejectWithValue(res?.error || "Failed to Delete Item from Cart")
        }
        thunkApi.dispatch(getCartItems({ userEmail }))
        return itemId
    } catch (err) {
        thunkApi.rejectWithValue(err?.error || "Failed to Delete Item from Cart")
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