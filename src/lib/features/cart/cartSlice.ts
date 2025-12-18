import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types";

interface CartItem extends Product {
  quantity: number;
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
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) {
      const { product, quantity = 1 } = action.payload;

      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity = existingItem.quantity + quantity;
      } else {
        state.items.push({ ...product, quantity });
      }

      saveToLocalStorage(state.items);
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToLocalStorage(state.items);
    },

    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload);
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

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
