import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {UserProduct} from "@/types";

interface WishlistState {
  items: UserProduct[];
}

const loadFromLocalStorage = (): UserProduct[] => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (items: UserProduct[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("wishlist", JSON.stringify(items));
};

const initialState: WishlistState = {
  items: loadFromLocalStorage(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<UserProduct>) {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      saveToLocalStorage(state.items);
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
