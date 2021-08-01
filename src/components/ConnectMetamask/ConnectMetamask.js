import styles from "./ConnectMetamask.module.css"

import detectEthereumProvider from "@metamask/detect-provider"
import { useRecoilState } from "recoil";
import { currentAccountState, metamaskConnected } from "../../state/state";
import { connectMetamask, DESIRED_CHAIN_ID, getCurrentChainId, switchToBsc } from "../../common/metamask";
import { useEffect } from "react";

export default function ConnectMetamask() {
    const [connected, setConnected] = useRecoilState(metamaskConnected)
    const [currentAccount, setCurrentAccount] = useRecoilState(currentAccountState)

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

            if (accounts && accounts.length > 0) {
                setConnected(true)
                setCurrentAccount(accounts[0])
            } else {
                setConnected(false)
                setCurrentAccount(null)
            }
        })()
    }, [])

    const connect = async () => {
        const accounts = await connectMetamask()

        if (accounts && accounts.length > 0) {
            setCurrentAccount(accounts[0])
        }

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