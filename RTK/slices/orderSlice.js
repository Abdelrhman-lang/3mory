import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { getCartItems } from "./cartSlice";

export const createOrder = createAsyncThunk("order/createOrder", async ({ userEmail, items, totalPrice }, thunkApi) => {
    try {
        const res = await axios.post(`/api/order/create`, {
            userEmail,
            items: items,
            totalPrice: totalPrice
        })

        if (res.data.success) {
            thunkApi.dispatch(getCartItems({ userEmail }))
            return res.data
        }
    } catch (err) {
        const errorMessage = err.response?.data?.error || "Faild to Create Order"
        Swal.fire({
            position: "top-end",
            timer: 1500,
            toast: true,
            icon: "error",
            title: "oooops...",
            text: errorMessage,
            showConfirmButton: false
        })
        return thunkApi.rejectWithValue(errorMessage)
    }
})

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.loading = true
        })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false
                state.orders.push(action.payload)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Order created successfully! 🚀",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                })
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default orderSlice.reducer;