import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import styles from './App.module.css';
import { DESIRED_CHAIN_ID, getCurrentAccount, hasMetamask, onAccountsChanged, onChainChanged } from './common/metamask';
import { bnbBalanceOf, fetchBnbUsdPrice, getSurgePriceInBnb, surgeBalanceOf } from './common/price';
import Navigation from './components/Navigation/Navigation';
import Buy from './pages/Buy/Buy';
import Sell from './pages/Sell/Sell';
import { bnbBalanceState, bnbUsdPriceState, currentAccountState, metamaskConnected, surgeBalanceState, surgeBnbPriceState } from './state/state';
import NumberFormat from 'react-number-format';

function App() {
  const [connected, setConnected] = useRecoilState(metamaskConnected)
  const [surgeBalance, setSurgeBalance] = useRecoilState(surgeBalanceState)
  const [bnbBalance, setBnbBalance] = useRecoilState(bnbBalanceState)
  const [currentAccount, setCurrentAccount] = useRecoilState(currentAccountState)
  const [surgeBnbPrice, setSurgeBnbPrice] = useRecoilState(surgeBnbPriceState)
  const [bnbUsdPrice, setBnbUsdPrice] = useRecoilState(bnbUsdPriceState)

  useEffect(() => {
    if (!hasMetamask) return

    onChainChanged((chainId) => {
      if (chainId !== DESIRED_CHAIN_ID) {
        setConnected(false)
      }
    })

    onAccountsChanged((accounts) => {
      if (accounts && accounts.length > 0) {
        setCurrentAccount(accounts[0])
      }
    })

    const updateBalances = async () => {
      const currentAccount = await getCurrentAccount()

      if (!currentAccount) return

      const surgeBalance = await surgeBalanceOf(currentAccount)
      setSurgeBalance(surgeBalance)

      const bnbBalance = await bnbBalanceOf(currentAccount)
      setBnbBalance(bnbBalance)

      const surgePriceInBnb = await getSurgePriceInBnb()
      setSurgeBnbPrice(surgePriceInBnb)

      const currentBnbUsdPrice = await fetchBnbUsdPrice()
      setBnbUsdPrice(currentBnbUsdPrice)
    }

    // update bnb balance, surge balance and surge price every few seconds
    updateBalances().then()
    setInterval(updateBalances, 5000)
  }, [currentAccount])

  return (
    <div>
      <div className={styles.backgroundWrapper}>
        <img className={styles.background} src="/img/background.png" />
      </div>

      <header className={styles.header}>
        <span className={styles.surgePrice}>Price: {surgeBnbPrice} BNB / <NumberFormat value={bnbUsdPrice * surgeBnbPrice} displayType={'text'} thousandSeparator={true} prefix={'USD '} /></span>
        <div className={styles.surgeBalanceWrapper}>
          <img className={styles.surgeBalanceIcon} src="/img/wallet.svg" />
          <NumberFormat value={surgeBalance} displayType={'text'} thousandSeparator={true} suffix={' Surge'} />
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.githubLink}>
          <a href="https://github.com/leNicDev/getsurge" target="_blank"><img src="/img/github.svg" /></a>
        </div>

        <h1 className={styles.title}>getsur.ge</h1>

        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <Navigation />

            <Switch>
              <Route exact path="/">
                <Buy />
              </Route>
              <Route exact path="/sell">
                <Sell />
              </Route>
            </Switch>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
