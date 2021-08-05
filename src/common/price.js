import fetch from 'node-fetch'
import Web3 from 'web3'
import { SURGE_CONTRACT_ABI, SURGE_CONTRACT_ADDRESS, SURGE_USD_CONTRACT_ABI, SURGE_USD_CONTRACT_ADDRESS } from './constants'

const web3 = new Web3(window.ethereum)

export async function getCurrentPriceOfSurgeContract(contractAbi, contractAddress) {
    const Contract = new web3.eth.Contract(contractAbi, contractAddress)
    const price = await Contract.methods.calculatePrice().call()
    return web3.utils.fromWei(String(price), "ether")
}

/**
 * Get the current price of Surge in BNB
 * @returns The current price of Surge in BNB
 */
export async function getSurgePriceInBnb() {
    return getCurrentPriceOfSurgeContract(SURGE_CONTRACT_ABI, SURGE_CONTRACT_ADDRESS)
}

/**
 * Get the current price of SurgeUSD in BNB
 * @returns The current price of SurgeUSD in BNB
 */
 export async function getSurgeUsdPriceInBnb() {
    return getCurrentPriceOfSurgeContract(SURGE_USD_CONTRACT_ABI, SURGE_USD_CONTRACT_ADDRESS)
}

async function balanceOf(contractAbi, contractAddress, holderAddress) {
    const web3 = new Web3(window.ethereum)
    const Contract = new web3.eth.Contract(contractAbi, contractAddress)

    return Contract.methods.balanceOf(holderAddress).call()
}

/**
 * Get the current Surge balance of a specific holder
 * @param {string} holderAddress 
 * @returns The current Surge balance of the specified holder
 */
export async function surgeBalanceOf(holderAddress) {
    return balanceOf(SURGE_CONTRACT_ABI, SURGE_CONTRACT_ADDRESS, holderAddress)
}

/**
 * Get the current SurgeUSD balance of a specific holder
 * @param {string} holderAddress 
 * @returns The current SurgeUSD balance of the specified holder
 */
 export async function surgeUsdBalanceOf(holderAddress) {
    return balanceOf(SURGE_USD_CONTRACT_ABI, SURGE_USD_CONTRACT_ADDRESS, holderAddress)
}

/**
 * Get the current BNB balance of a specific holder
 * @param {string} holderAddress 
 * @returns The current BNB balance of the specified holder
 */
export async function bnbBalanceOf(holderAddress) {
    const balance = await web3.eth.getBalance(holderAddress)
    return web3.utils.fromWei(String(balance), "ether")
}

export async function estimateOutputAmount(contractAbi, contractAddress, bnbAmount) {
    const bnbPrice = await getCurrentPriceOfSurgeContract(contractAbi, contractAddress, bnbAmount)
    return bnbAmount / bnbPrice
}

/**
 * Estimate the Surge output amount when buying for a specific amount of BNB
 * @param {number} bnbAmount 
 * @returns The estimated output amount of Surge when buying for the specified amount of BNB
 */
export async function estimateSurgeOutputAmount(bnbAmount) {
    return estimateOutputAmount(SURGE_CONTRACT_ABI, SURGE_CONTRACT_ADDRESS, bnbAmount)
}

/**
 * Estimate the SurgeUSD output amount when buying for a specific amount of BNB
 * @param {number} bnbAmount 
 * @returns The estimated output amount of SurgeUSD when buying for the specified amount of BNB
 */
 export async function estimateSurgeUsdOutputAmount(bnbAmount) {
    return estimateOutputAmount(SURGE_USD_CONTRACT_ABI, SURGE_USD_CONTRACT_ADDRESS, bnbAmount)
}

export async function estimateBnbOutputAmount(contractAbi, contractAddress, surgeAmount) {
    const price = await getCurrentPriceOfSurgeContract(contractAbi, contractAddress)
    return surgeAmount * price
}

export async function estimateSurgeBnbOutputAmount(inputAmount) {
    const price = await getCurrentPriceOfSurgeContract(SURGE_CONTRACT_ABI, SURGE_CONTRACT_ADDRESS)
    return inputAmount / price
}

export async function estimateSurgeUsdBusdOutputAmount(inputAmount) {
    const price = await getCurrentPriceOfSurgeContract(SURGE_USD_CONTRACT_ABI, SURGE_USD_CONTRACT_ADDRESS)
    return inputAmount * price
}

/**
 * Fetch the current BNB price in USD
 */
export async function fetchBnbUsdPrice() {
    const response = await fetch('/api/bnbPrice')
    const json = await response.json()
    return json.price
}