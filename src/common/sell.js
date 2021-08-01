import Web3 from 'web3'
import { SURGE_CONTRACT_ABI, SURGE_CONTRACT_ADDRESS } from './constants'
import { getSelectedAddress } from './metamask'

export async function sellSurge(surgeAmount) {
    console.log(`Selling ${surgeAmount} Surge...`)

    if (isNaN(surgeAmount)) {
        throw new Error("Surge amount is NaN")
    }

    const web3 = new Web3(window.ethereum)
    const SurgeContract = new web3.eth.Contract(SURGE_CONTRACT_ABI, SURGE_CONTRACT_ADDRESS)

    const fromAddress = await getSelectedAddress()

    if (!fromAddress) {
        throw new Error("From address is empty")
    }

    const sanitizedAmount = Number(surgeAmount);

    if (isNaN(sanitizedAmount) || sanitizedAmount <= 0) {
        throw new Error("Invalid surge amount");
    }

    // call sell function
    return SurgeContract.methods.sell(sanitizedAmount).send({
        from: fromAddress
    });
}