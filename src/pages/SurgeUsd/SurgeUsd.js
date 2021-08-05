import { Route, Switch } from "react-router-dom"
import { useRecoilState } from "recoil"
import { hasMetamask } from "../../common/metamask"
import BuyForm from "../../components/BuyForm/BuyForm"
import SellForm from "../../components/SellForm/SellForm"
import InstallMetamask from "../../components/InstallMetamask/InstallMetamask"
import ConnectMetamask from "../../components/ConnectMetamask/ConnectMetamask"
import BuySellNavigation from "../../components/BuySellNavigation/BuySellNavigation"
import { metamaskConnected, surgeUsdBalanceState } from "../../state/state"
import { SURGE_USD_CONTRACT_ADDRESS } from "../../common/constants"
import { estimateSurgeUsdBusdOutputAmount, estimateSurgeUsdOutputAmount } from "../../common/price"
import { sellSurgeUsd } from "../../common/sell"

export default function SurgeUsd() {
    const [connected, setConnected] = useRecoilState(metamaskConnected)
    const [surgeUsdBalance, setSurgeUsdBalance] = useRecoilState(surgeUsdBalanceState)

    const Dialog = () => {
      if (!hasMetamask()) {
        return <InstallMetamask />
      }
      
      if (!connected) {
        return <ConnectMetamask />
      }
  
      return <Switch>
          <Route exact path="/surgeusd">
            <BuyForm
              outputCurrency="SurgeUSD"
              outputAmountFunction={estimateSurgeUsdOutputAmount}
              contractAddress={SURGE_USD_CONTRACT_ADDRESS}
            />
          </Route>
          <Route path="/surgeusd/sell">
            <SellForm
              inputCurrency="SurgeUSD"
              outputCurrency="BUSD"
              balance={surgeUsdBalance}
              outputAmountFunction={estimateSurgeUsdBusdOutputAmount}
              sellFunction={sellSurgeUsd}
            />
          </Route>
      </Switch>
    }

    return <div>
        <BuySellNavigation
          buyLink="/surgeusd"
          sellLink="/surgeusd/sell"
        />
        <Dialog />
    </div>
}