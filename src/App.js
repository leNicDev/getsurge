import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import styles from './App.module.css';
import { DESIRED_CHAIN_ID, hasMetamask, onChainChanged } from './common/metamask';
import Navigation from './components/Navigation/Navigation';
import Buy from './pages/Buy/Buy';
import Sell from './pages/Sell/Sell';
import { metamaskConnected } from './state/state';

function App() {
  const [connected, setConnected] = useRecoilState(metamaskConnected)

  useEffect(() => {
    if (!hasMetamask) return

    onChainChanged((chainId) => {
      if (chainId !== DESIRED_CHAIN_ID) {
        setConnected(false)
      }
    })
  }, [])

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
