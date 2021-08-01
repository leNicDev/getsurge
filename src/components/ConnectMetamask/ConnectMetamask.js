import styles from "./ConnectMetamask.module.css"

import detectEthereumProvider from "@metamask/detect-provider"
import { useRecoilState } from "recoil";
import { metamaskConnected } from "../../state/state";
import { connectMetamask, DESIRED_CHAIN_ID, getCurrentChainId, switchToBsc } from "../../common/metamask";
import { useEffect } from "react";

export default function ConnectMetamask() {
    const [connected, setConnected] = useRecoilState(metamaskConnected)

    useEffect(() => {
        (async () => {
            const provider = await detectEthereumProvider();
    
            if (!provider) {
                console.warn('No wallet provider found. Please install Metamask.')
                return
            }

            const chainId = await getCurrentChainId()
            if (chainId !== DESIRED_CHAIN_ID) {
                await switchToBsc()
            }

            const accounts = await connectMetamask()

            setConnected(accounts && accounts.length > 0 && chainId === DESIRED_CHAIN_ID)
        })()
    }, [])

    const connect = async () => {
        await connectMetamask()
        const chainId = await getCurrentChainId()

        if (chainId !== DESIRED_CHAIN_ID) {
            await switchToBsc()
        }

        setConnected(true)
    }

    return <div>
        <div className={styles.prompt}>
            <img src="/img/metamask.svg" width="64" height="64" />
            <span>You need to connect your <a href="https://metamask.io/" target="_blank">Metamask</a> wallet to be able to use this app.</span>
        </div>

        <div className={styles.actions}>
            <button type="button" onClick={connect}>Connect Metamask wallet</button>
        </div>
    </div>
}