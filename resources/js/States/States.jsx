import { create } from "zustand";

export const useThemeState = create((set) => ({
    theme:'light',
    setTheme:(th) => set({theme:th})
}))

export const useNavState = create((set) => ({
    isNavActive:true,
    setNavActive:(s) => set({isNavActive:s})
}))


export const useUserAuthState = create((set) => ({
    userAuth:{},
    setUserAuth:(data) => set({userAuth:data})
}))

export const useLoaderState = create((set) => ({
    showLoader:true,
    setShowLoader:(data) => set({showLoader:data})
}))