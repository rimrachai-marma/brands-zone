'use client'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/lib/store'
import { Toaster } from "react-hot-toast";
export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [store] = useState<AppStore>(() => makeStore())

  return <Provider store={store}>{
      children}
      <Toaster position="top-center" />
  </Provider>
}