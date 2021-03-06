import styles from './SellForm.module.css'

import { useRecoilState } from 'recoil'
import { saleResultState, sellingState, showSaleResultState } from '../../state/state'
import SaleResult from '../SaleResult/SaleResult'
import { useState } from 'react'

export default function SellForm(props) {
    const [amountValid, setAmountValid] = useState(true)
    const [amountValidMessage, setAmountValidMessage] = useState("")
    const [estimatedOutputAmount, setEstimatedOutputAmount] = useState(0)

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

    const onInputChange = async (event) => {
        const surgeAmount = event.target.value
        validateAmount(surgeAmount)

        const estimatedOutputAmount = await props.outputAmountFunction(Number(surgeAmount))
        setEstimatedOutputAmount(estimatedOutputAmount)
    }

    const setMaxAmount = async () => {
        document.getElementById('amount').value = props.balance

        const estimatedOutputAmount = await props.outputAmountFunction(Number(props.balance))
        setEstimatedOutputAmount(estimatedOutputAmount)
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
            result = await props.sellFunction(surgeAmount)
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
                    <input id="amount" min="1" type="text" placeholder="Amount" onChange={onInputChange} className={`${styles.surgeAmountInput} ${amountValid ? '' : styles.error}`} />
                    <span className={styles.surgeInputSuffix}>{props.inputCurrency}</span>
                </div>
                <button type="button" className={styles.maxButton} onClick={setMaxAmount}>Max</button>
                <button type="submit" className={styles.sellButton}>Sell</button>
            </form>
            <span className={`${styles.errorMessage} ${amountValid ? styles.hidden : ''}`}>{amountValidMessage}</span>
            <span>??? {estimatedOutputAmount} {props.outputCurrency}</span>
        </div>
    }
}