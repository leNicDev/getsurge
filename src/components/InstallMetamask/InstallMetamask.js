import styles from './InstallMetamask.module.css'

export default function InstallMetamask() {
    return <div>
        <div className={styles.prompt}>
            <img src="/img/metamask.svg" width="64" height="64" />
            <span>You need to install <a href="https://metamask.io/" target="_blank" rel="noreferrer">Metamask</a> to be able to use this app.</span>
        </div>
    </div>
}