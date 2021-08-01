import { useRecoilState } from "recoil";
import { buyResultState, showBuyResultState } from "../../state/state";
import styles from "./BuyResult.module.css"

export default function BuyResult() {
    const [showBuyResult, setShowBuyResult] = useRecoilState(showBuyResultState)
    const [buyResult, setBuyResult] = useRecoilState(buyResultState)

    const dismiss = () => {
        setShowBuyResult(false)
        setBuyResult(null)
    }

    const BuyResultSuccess = () => {
        return <div>
            <div className={styles.statusMessageWrapper}>
                <img src="/img/success.svg" width="48" height="48" />
                <h2>Transaction was successful!</h2>
            </div>

            <p>Transaction ID: <a href={`https://bscscan.com/tx/${buyResult}`} target="_blank"><tt>{buyResult}</tt></a></p>
        
            <div className={styles.actions}>
                <button onClick={dismiss}>OK</button>
            </div>
        </div>
    };

    const BuyResultFailure = () => {
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

    if (buyResult) {
        return <BuyResultSuccess />
    } else {
        return <BuyResultFailure />
    }
}