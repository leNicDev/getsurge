import styles from './BuyForm.module.css'

import { createTransaction, getSelectedAddress, numberToWei } from '../../common/metamask'
import { SURGE_CONTRACT_ADDRESS } from '../../common/constants'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import BuyResult from '../BuyResult/BuyResult'
import { buyingState, buyResultState, showBuyResultState } from '../../state/state'
import Spinner from '../Spinner/Spinner'
import classNames from 'classnames'

export default function BuyForm() {
    const [amountValid, setAmountValid] = useState(true)
    const [amountValidMessage, setAmountValidMessage] = useState("")

    const [buying, setBuying] = useRecoilState(buyingState)
    const [buyResult, setBuyResult] = useRecoilState(buyResultState)
    const [showBuyResult, setShowBuyResult] = useRecoilState(showBuyResultState)

    const validateAmount = (amount) => {
        let amountValid = false
        let amountValidMessage = ""

        if (!amount || isNaN(Number(amount))) {
            amountValid = false
            amountValidMessage = "Invalid amount"
        } else if (amount <= 0) {
            amountValid = false
            amountValidMessage = "Amount must be at least 1"
        } else {
            amountValid = true
            amountValidMessage = ""
        }

        setAmountValid(amountValid)
        setAmountValidMessage(amountValidMessage)

        return amountValid
    }

    const onInputChange = (event) => {
        const bnbAmount = event.target.value
        validateAmount(bnbAmount)
    }

    const onSubmit = async (event) => {
        event.preventDefault()

        const bnbAmount = event.target[0].value
        const amountValid = validateAmount(bnbAmount)

        if (!amountValid || buying) {
            return;
        }

        setBuying(true)

        const txParams = {
            nonce: '0x00',
            to: SURGE_CONTRACT_ADDRESS,
            from: await getSelectedAddress(),
            value: numberToWei(bnbAmount),
        }

        let txHash;
        try {
            txHash = await createTransaction(txParams)
            setBuyResult(txHash)
        } catch (err) {
            txHash = null
            setBuyResult(null)
        }

        setBuying(false)
        setShowBuyResult(true)
    }

    if (showBuyResult) {
        return <BuyResult />
    } else {
        return <div>
            <form className={styles.buyForm} onSubmit={onSubmit}>
                <div className={styles.bnbInputWrapper}>
                    <input type="text" min="0" placeholder="Amount" onChange={onInputChange} className={`${styles.bnbAmountInput} ${amountValid ? '' : styles.error}`} />
                    <span className={styles.bnbInputSuffix}>BNB</span>
                </div>
                <button className={styles.maxButton}>Max</button>
                <button type="submit" className={classNames(styles.buyButton, {
                    [styles.buying]: buying
                })}>{buying ? <Spinner /> : 'Buy'}</button>
            </form>
            <span className={`${styles.errorMessage} ${amountValid ? styles.hidden : ''}`}>{amountValidMessage}</span>
        </div>
    }
}