import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import styles from './App.module.css';
import { DESIRED_CHAIN_ID, getCurrentAccount, hasMetamask, onAccountsChanged, onChainChanged } from './common/metamask';
import { bnbBalanceOf, getSurgePriceInBnb, surgeBalanceOf } from './common/price';
import Navigation from './components/Navigation/Navigation';
import Buy from './pages/Buy/Buy';
import Sell from './pages/Sell/Sell';
import { bnbBalanceState, currentAccountState, metamaskConnected, surgeBalanceState, surgeBnbPriceState } from './state/state';

function App() {
  const [connected, setConnected] = useRecoilState(metamaskConnected)
  const [surgeBalance, setSurgeBalance] = useRecoilState(surgeBalanceState)
  const [bnbBalance, setBnbBalance] = useRecoilState(bnbBalanceState)
  const [currentAccount, setCurrentAccount] = useRecoilState(currentAccountState)
  const [surgeBnbPrice, setSurgeBnbPrice] = useRecoilState(surgeBnbPriceState)

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
    }

    // update bnb balance, surge balance and surge price every few seconds
    updateBalances().then()
    setInterval(updateBalances, 5000)
  }, [currentAccount])

  return (
    <div>
      <div className={styles.githubLink}>
        <a href="https://github.com/leNicDev/getsurge" target="_blank"><img src="/img/github.svg" /></a>
      </div>

      <div className={styles.backgroundWrapper}>
        <img className={styles.background} src="/img/background.png" />
      </div>

      <header className={styles.header}>
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
      </header>
    </div>
  );
}

export default App;
