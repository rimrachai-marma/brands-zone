import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CartItem {
    quantity: number;
    id: string;
    variantId: string;
}

interface CartState {
    items: CartItem[];
}

const loadFromLocalStorage = (): CartItem[] => {
    if (typeof window === "undefined") return [];
    try {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

const saveToLocalStorage = (items: CartItem[]) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("cart", JSON.stringify(items));
};

const initialState: CartState = {
    items: loadFromLocalStorage(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(
            state,
            action: PayloadAction<{ id: string; quantity?: number, variantId: string }>
        ) {
            const {id, variantId, quantity = 1} = action.payload;

            const existingItem = state.items.find((item) => item.id == id && item.variantId == variantId);

            if (existingItem) {
                existingItem.quantity = existingItem.quantity + quantity;
            } else {
                state.items.push({id, quantity, variantId});
            }

            saveToLocalStorage(state.items);
        },

        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.id != action.payload);
            saveToLocalStorage(state.items);
        },

        decreaseQuantity(state, action: PayloadAction<string>) {
            const item = state.items.find((i) => i.id == action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items = state.items.filter((i) => i.id !== action.payload);
                }
            }
            saveToLocalStorage(state.items);
        },

        clearCart(state) {
            state.items = [];
            saveToLocalStorage([]);
        },
    },
});

export const {addToCart, removeFromCart, decreaseQuantity, clearCart} =
    cartSlice.actions;
export default cartSlice.reducer;
