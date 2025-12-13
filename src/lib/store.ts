import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/lib/features/cart/cartSlice";
import wishlistReducer from "@/lib/features/wishlist/wishlistSlice";


export const makeStore = () => {
  return configureStore({
   reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
