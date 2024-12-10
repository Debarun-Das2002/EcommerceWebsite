import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
// creating a sllice

const item = localStorage.getItem("cart") !== null ? JSON.parse(localStorage.getItem("cart")) : [];

const calTotal = (cart) =>{
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

const initialState  = item;
const cartSlice  = createSlice({
    // here create your reducer
    name: 'cart',
    initialState,
    reducers:{
        add(state,action){
            action.payload.quantity = 1;
            state.push(action.payload)
            localStorage.setItem("cart",JSON.stringify(state));
            localStorage.setItem("totalPrice",calTotal(state));
            
        },

        remove(state,action){
            const cart = state.filter(item => item._id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.setItem("totalPrice",calTotal(cart));

            return cart;
        },

        increaseCart(state,action){
            const cart = state.find(item => item._id == action.payload);
            if (cart) {
                cart.quantity += 1;
            }
            localStorage.setItem("cart",JSON.stringify(state.map(item=>item)));
            localStorage.setItem("totalPrice",calTotal(state));
        },

        decreaseCart(state,action){
            const cart = state.find(item => item._id == action.payload);

            if(cart){
                cart.quantity -= 1;

                if(cart.quantity === 0){
                    state.filter(item => item._id !== action.payload)
                    localStorage.setItem("cart",JSON.stringify(state.map(item=>item)));
                    return cart;
                }
                localStorage.setItem("totalPrice",calTotal(state));
            }
        },

        emptyCart(state) {
            state = [];
            localStorage.setItem("cart", JSON.stringify(state));
            localStorage.setItem("totalPrice", 0);
            return state;
        }

    }
});


export const {add,remove,increaseCart,decreaseCart,emptyCart} = cartSlice.actions
export default cartSlice.reducer;