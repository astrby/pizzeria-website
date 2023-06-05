import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export const localCart = create(
    persist(
        (set,get)=>({
            cart: [],
            addToCart: (product)=>set((state)=>({cart: [...state.cart, product]})),
            updateCart: (updatedCart)=>set(()=>({cart: updatedCart})),
            clearCart: ()=> set({cart: []})
        }),
        {
            name: 'pizzeria-website-storage'
        }
    )
)