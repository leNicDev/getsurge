import { Route, Switch } from "react-router-dom"
import { useRecoilState } from "recoil"
import { hasMetamask } from "../../common/metamask"
import BuyForm from "../../components/BuyForm/BuyForm"
import SellForm from "../../components/SellForm/SellForm"
import InstallMetamask from "../../components/InstallMetamask/InstallMetamask"
import ConnectMetamask from "../../components/ConnectMetamask/ConnectMetamask"
import BuySellNavigation from "../../components/BuySellNavigation/BuySellNavigation"
import { metamaskConnected, surgeBalanceState } from "../../state/state"
import { estimateSurgeBnbOutputAmount, estimateSurgeOutputAmount } from "../../common/price"
import { SURGE_CONTRACT_ADDRESS } from "../../common/constants"
import { sellSurge } from "../../common/sell"

export default function Surge() {
    const [connected, setConnected] = useRecoilState(metamaskConnected)
    const [surgeBalance, setSurgeBalance] = useRecoilState(surgeBalanceState)

    const Dialog = () => {
      if (!hasMetamask()) {
        return <InstallMetamask />
      }
      
      if (!connected) {
        return <ConnectMetamask />
      }
  
      return <Switch>
          <Route exact path="/surge">
            <BuyForm
              outputCurrency="Surge"
              outputAmountFunction={estimateSurgeOutputAmount}
              contractAddress={SURGE_CONTRACT_ADDRESS}
            />
          </Route>
          <Route path="/surge/sell">
            <SellForm
              inputCurrency="Surge"
              outputCurrency="BNB"
              balance={surgeBalance}
              outputAmountFunction={estimateSurgeBnbOutputAmount}
              sellFunction={sellSurge}
            />
          </Route>
      </Switch>
    }

    return <div>
        <BuySellNavigation
          buyLink="/surge"
          sellLink="/surge/sell"
        />
        <Dialog />
    </div>
}