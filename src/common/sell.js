import Web3 from 'web3'
import { SURGE_CONTRACT_ABI, SURGE_CONTRACT_ADDRESS, SURGE_USD_CONTRACT_ABI, SURGE_USD_CONTRACT_ADDRESS } from './constants'
import { getSelectedAddress } from './metamask'

export async function sell(contractAbi, contractAddress, amount) {
    if (isNaN(amount)) {
        throw new Error("Amount is NaN")
    }

    const web3 = new Web3(window.ethereum)
    const Contract = new web3.eth.Contract(contractAbi, contractAddress)

    const fromAddress = await getSelectedAddress()

    if (!fromAddress) {
        throw new Error("From address is empty")
    }

    const sanitizedAmount = Number(amount);

    if (isNaN(sanitizedAmount) || sanitizedAmount <= 0) {
        throw new Error("Invalid surge amount");
    }

    // call sell function
    return Contract.methods.sell(sanitizedAmount).send({
        from: fromAddress
    });
}

export async function sellSurge(amount) {
    return sell(SURGE_CONTRACT_ABI, SURGE_CONTRACT_ADDRESS, amount)
}

export async function sellSurgeUsd(amount) {
    return sell(SURGE_USD_CONTRACT_ABI, SURGE_USD_CONTRACT_ADDRESS, amount)
}