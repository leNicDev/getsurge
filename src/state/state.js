import { atom } from "recoil";

export const metamaskConnected = atom({
    key: 'metamaskConnected',
    default: false,
})

export const buyingState = atom({
    key: 'buying',
    default: false,
})

export const showBuyResultState = atom({
    key: 'showBuyResult',
    default: false,
})

export const buyResultState = atom({
    key: 'buyResult',
    default: false,
})

export const sellingState = atom({
    key: 'selling',
    default: false,
})

export const showSaleResultState = atom({
    key: 'showSaleResult',
    default: true,
})

export const saleResultState = atom({
    key: 'saleResult',
    default: null,
})