import { useEffect } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import styles from './App.module.css';
import { DESIRED_CHAIN_ID, getCurrentAccount, hasMetamask, onAccountsChanged, onChainChanged } from './common/metamask';
import { bnbBalanceOf, fetchBnbUsdPrice, getSurgeChangePercentage, getSurgePriceInBnb, getSurgeUsdChangePercentage, getSurgeUsdPriceInBnb, surgeBalanceOf, surgeUsdBalanceOf } from './common/price';
import { bnbBalanceState, bnbUsdPriceState, currentAccountState, metamaskConnected, surgeBalanceState, surgeBnbPriceState, surgeChangePercentageState, surgeUsdBalanceState, surgeUsdBnbPriceState, surgeUsdChangePercentageState } from './state/state';
import NumberFormat from 'react-number-format';
import Graphs from './pages/Graphs/Graphs';
import Surge from './pages/Surge/Surge';
import SurgeUsd from './pages/SurgeUsd/SurgeUsd';
import ChangeIndicator from './components/ChangeIndicator/ChangeIndicator';

function App() {
  const [connected, setConnected] = useRecoilState(metamaskConnected)
  const [surgeBalance, setSurgeBalance] = useRecoilState(surgeBalanceState)
  const [surgeUsdBalance, setSurgeUsdBalance] = useRecoilState(surgeUsdBalanceState)
  const [bnbBalance, setBnbBalance] = useRecoilState(bnbBalanceState)
  const [currentAccount, setCurrentAccount] = useRecoilState(currentAccountState)
  const [surgeBnbPrice, setSurgeBnbPrice] = useRecoilState(surgeBnbPriceState)
  const [surgeUsdBnbPrice, setSurgeUsdBnbPrice] = useRecoilState(surgeUsdBnbPriceState)
  const [bnbUsdPrice, setBnbUsdPrice] = useRecoilState(bnbUsdPriceState)
  const [surgeChangePercentage, setSurgeChangePercentage] = useRecoilState(surgeChangePercentageState)
  const [surgeUsdChangePercentage, setSurgeUsdChangePercentage] = useRecoilState(surgeUsdChangePercentageState)

  useEffect(() => {
    if (!hasMetamask()) return

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
      const surgeChangePercentage = await getSurgeChangePercentage()
      setSurgeChangePercentage(surgeChangePercentage)

      const surgeUsdChangePercentage = await getSurgeUsdChangePercentage()
      setSurgeUsdChangePercentage(surgeUsdChangePercentage)

      const surgePriceInBnb = await getSurgePriceInBnb()
      setSurgeBnbPrice(surgePriceInBnb)

      const surgeUsdPriceInBnb = await getSurgeUsdPriceInBnb()
      setSurgeUsdBnbPrice(surgeUsdPriceInBnb)

      const currentBnbUsdPrice = await fetchBnbUsdPrice()
      setBnbUsdPrice(currentBnbUsdPrice)

      const currentAccount = await getCurrentAccount()

      if (!currentAccount) return

      const surgeBalance = await surgeBalanceOf(currentAccount)
      setSurgeBalance(surgeBalance)

      const surgeUsdBalance = await surgeUsdBalanceOf(currentAccount)
      setSurgeUsdBalance(surgeUsdBalance)

      const bnbBalance = await bnbBalanceOf(currentAccount)
      setBnbBalance(bnbBalance)
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
        <nav className={styles.navigation}>
          <NavLink className={styles.navItem} activeClassName={styles.active} to="/surge">Surge <ChangeIndicator changePercentage={surgeChangePercentage} /></NavLink>
          <NavLink className={styles.navItem} activeClassName={styles.active} to="/surgeusd">SurgeUSD <ChangeIndicator changePercentage={surgeUsdChangePercentage} /></NavLink>
          <NavLink className={styles.navItem} activeClassName={styles.active} to="/graphs">Graphs</NavLink>
        </nav>
        <span className={styles.surgePrice}>Price: {surgeBnbPrice} BNB / <NumberFormat value={bnbUsdPrice * surgeBnbPrice} displayType={'text'} thousandSeparator={true} prefix={'USD '} /></span>
        <div className={styles.surgeBalanceWrapper}>
          <img className={styles.surgeBalanceIcon} src="/img/wallet.svg" />
          <NumberFormat value={surgeBalance} displayType={'text'} thousandSeparator={true} suffix={' Surge'} />
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.githubLink}>
          <a href="https://github.com/leNicDev/getsurge" target="_blank" rel="noreferrer"><img src="/img/github.svg" /></a>
        </div>

        <h1 className={styles.title}>getsur.ge</h1>

        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <Switch>
              <Redirect exact from="/" to="/surge" />
              <Route path="/surge">
                <Surge />
              </Route>
              <Route path="/surgeusd">
                <SurgeUsd />
              </Route>
              <Route path="/graphs">
                <Graphs />
              </Route>
            </Switch>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
