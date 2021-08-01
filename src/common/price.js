import Web3 from 'web3'
import { BNB_CONTRACT_ABI, BNB_CONTRACT_ADDRESS, SURGE_CONTRACT_ABI, SURGE_CONTRACT_ADDRESS } from './constants'

const web3 = new Web3(window.ethereum)

/**
 * Get the current price of Surge in BNB
 * @returns The current price of Surge in BNB
 */
export async function getSurgePriceInBnb() {
    const SurgeContract = new web3.eth.Contract(SURGE_CONTRACT_ABI, SURGE_CONTRACT_ADDRESS)
    return SurgeContract.methods.calculatePrice().call()
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