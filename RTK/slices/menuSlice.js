import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name: "menu",
    initialState: {
        isMenuOpen: false
    },
    reducers: {
        openMenu: (state) => { state.isMenuOpen = true },
        closeMenu: (state) => { state.isMenuOpen = false },
        toggleMenu: (state) => { state.isMenuOpen = !state.isMenuOpen }
    }
})

export const { openMenu, closeMenu, toggleMenu } = menuSlice.actions
export default menuSlice.reducer