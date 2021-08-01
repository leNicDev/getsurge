import styles from './SellForm.module.css'

import { sellSurge } from '../../common/sell'
import { useRecoilState } from 'recoil'
import { saleResultState, sellingState, showSaleResultState } from '../../state/state'
import SaleResult from '../SaleResult/SaleResult'
import { useState } from 'react'

export default function SellForm() {
    const [amountValid, setAmountValid] = useState(true)
    const [amountValidMessage, setAmountValidMessage] = useState("")

    const [selling, setSelling] = useRecoilState(sellingState)
    const [saleResult, setSaleResult] = useRecoilState(saleResultState)
    const [showSaleResult, setShowSaleResult] = useRecoilState(showSaleResultState)

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
        const surgeAmount = event.target.value
        validateAmount(surgeAmount)
    }

    const onSubmit = async (event) => {
        event.preventDefault()

        const surgeAmount = Number(event.target[0].value)
        const amountValid = validateAmount(surgeAmount)

        if (!amountValid || selling) {
            return
        }      

        setSelling(true)

        let result;
        try {
            result = await sellSurge(surgeAmount)
            setSaleResult(result)
        } catch (err) {
            result = null;
            setSaleResult(null)
        }
        
        setSelling(false)
        setShowSaleResult(true)

        console.log('result', result)
    }

    if (showSaleResult) {
        return <SaleResult />
    } else {
        return <div>
            <form onSubmit={onSubmit}>
                <div className={styles.surgeInputWrapper}>
                    <input min="1" type="text" placeholder="Amount" onChange={onInputChange} className={`${styles.surgeAmountInput} ${amountValid ? '' : styles.error}`} />
                    <span className={styles.surgeInputSuffix}>Surge</span>
                </div>
                <button className={styles.maxButton}>Max</button>
                <button type="submit" className={styles.sellButton}>Sell</button>
            </form>
            <span className={`${styles.errorMessage} ${amountValid ? styles.hidden : ''}`}>{amountValidMessage}</span>
        </div>
    }
}