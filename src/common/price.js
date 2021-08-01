import Web3 from 'web3'
import { SURGE_CONTRACT_ABI, SURGE_CONTRACT_ADDRESS } from './constants'

const web3 = new Web3(window.ethereum)

/**
 * Get the current price of Surge in BNB
 * @returns The current price of Surge in BNB
 */
export async function getSurgePriceInBnb() {
    const SurgeContract = new web3.eth.Contract(SURGE_CONTRACT_ABI, SURGE_CONTRACT_ADDRESS)
    const price = await SurgeContract.methods.calculatePrice().call()
    return web3.utils.fromWei(String(price), "ether")
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
 * Get the current BNB balance of a specific holder
 * @param {string} holderAddress 
 * @returns The current BNB balance of the specified holder
 */
export async function bnbBalanceOf(holderAddress) {
    const balance = await web3.eth.getBalance(holderAddress)
    return web3.utils.fromWei(String(balance), "ether")
}

async function balanceOf(contractAbi, contractAddress, holderAddress) {
    const web3 = new Web3(window.ethereum)
    const Contract = new web3.eth.Contract(contractAbi, contractAddress)

    return Contract.methods.balanceOf(holderAddress).call()
}

/**
 * Estimate the Surge output amount when buying for a specific amount of BNB
 * @param {number} bnbAmount 
 * @returns The estimated output amount of Surge when buying for the specified amount of BNB
 */
export async function estimateSurgeOutputAmount(bnbAmount) {
    const surgeBnbPrice = await getSurgePriceInBnb()
    return bnbAmount / surgeBnbPrice
}

/**
 * Estimate the BNB output amount when selling a specific amount of Surge
 * @param {number} surgeAmount 
 * @returns The estimated output amount of BNB when selling a specified amount of Surge
 */
 export async function estimateBnbOutputAmount(surgeAmount) {
    const surgeBnbPrice = await getSurgePriceInBnb()
    return surgeAmount * surgeBnbPrice
}