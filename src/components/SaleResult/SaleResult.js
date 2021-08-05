import { useRecoilState } from "recoil";
import { saleResultState, showSaleResultState } from "../../state/state";
import styles from "./SaleResult.module.css"

export default function SaleResult() {
    const [showSaleResult, setShowSaleResult] = useRecoilState(showSaleResultState)
    const [saleResult, setSaleResult] = useRecoilState(saleResultState)

    const dismiss = () => {
        setShowSaleResult(false)
        setSaleResult(null)
    }

    const SaleResultSuccess = () => {
        return <div>
            <div className={styles.statusMessageWrapper}>
                <img src="/img/success.svg" width="48" height="48" />
                <h2>Transaction was successful!</h2>
            </div>

            <p>Transaction ID: <a href={`https://bscscan.com/tx/${saleResult.transactionHash}`} target="_blank" rel="noreferrer"><tt>{saleResult.transactionHash}</tt></a></p>
        
            <div className={styles.actions}>
                <button onClick={dismiss}>OK</button>
            </div>
        </div>
    };

    const SaleResultFailure = () => {
        return <div>
            <div className={styles.statusMessageWrapper}>
                <img src="/img/error.svg" width="48" height="48" />
                <h2>Transaction has failed!</h2>
            </div>

            <p>Check Metamask for details.</p>
        
            <div className={styles.actions}>
                <button onClick={dismiss}>OK</button>
            </div>
        </div>
    }

    if (saleResult) {
        return <SaleResultSuccess />
    } else {
        return <SaleResultFailure />
    }
}