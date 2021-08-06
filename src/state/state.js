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
    default: false,
})

export const saleResultState = atom({
    key: 'saleResult',
    default: null,
})

export const surgeBalanceState = atom({
    key: 'surgeBalance',
    default: 0,
})

export const surgeUsdBalanceState = atom({
    key: 'surgeUsdBalance',
    default: 0,
})

export const bnbBalanceState = atom({
    key: 'bnbBalance',
    default: 0,
})

export const currentAccountState = atom({
    key: 'currentAccount',
    default: null,
})

export const surgeBnbPriceState = atom({
    key: 'surgeBnbPrice',
    default: 0,
})

export const surgeUsdBnbPriceState = atom({
    key: 'surgeUsdBnbPrice',
    default: 0,
})

export const bnbUsdPriceState = atom({
    key: 'bnbUsdPrice',
    default: 0,
})

export const surgeChangePercentageState = atom({
    key: 'surgeChangePercentage',
    default: 0,
})

export const surgeUsdChangePercentageState = atom({
    key: 'surgeUsdChangePercentage',
    default: 0,
})