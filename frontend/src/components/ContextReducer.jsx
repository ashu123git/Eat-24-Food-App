// This whole thing is only for My Cart functionality. For more information, learn useContext, createCotext of React from internet. Everytime we are using context, we have to follow below syntax.

import React, { useContext, useReducer } from "react";
const CartStateContext = React.createContext();
const CartDispatchContext = React.createContext();
const reducer = (state, action)=>{
    switch (action.type) {
        case "ADD":
            return [...state, {id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img}]

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    // console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + parseInt(food.qty), price: action.price + food.price }
                }
                return arr
            })
            return arr

        case "DROP":
            let empArray = [];
            return empArray;
    
        default:
            const newError = "Error in reducer.";
            return newError;
    }
}

export const CartProvide = ({children})=>{
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch} >
            <CartStateContext.Provider value={state} >
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchcart = ()=> useContext(CartDispatchContext);