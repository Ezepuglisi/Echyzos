import { create } from 'zustand';
import { persist } from 'zustand/middleware'

// export const userStore = create(
//   persist((set) => ({
//     user: null,
//     login: (data) => {
//       set({ user: data })
//     },
//     logout: () => {
//       set((state) => ({ user: null }))
//     },
//   }), 
//   {name:'user-store'},),
// );

export const userStore = create(
  persist(
    (set, get) => ({
      user: null,
      login: (data) => {
        set({ user: data })
      },
      logout: () => {
        set((state) => ({ user: null }))
      },
    }),
    {name:'user-store'},
  ),
)


export const productStore = create((set) => ({
  productsDb: [],
  setProductsDb: (data) => {
    set([...productsDb, data])
  }
}))