import SellForm from "../../components/SellForm/SellForm"
import { hasMetamask, isConnected } from "../../common/metamask"
import InstallMetamask from "../../components/InstallMetamask/InstallMetamask"
import ConnectMetamask from "../../components/ConnectMetamask/ConnectMetamask"
import { useRecoilState } from "recoil"
import { metamaskConnected } from "../../state/state"

export default function Sell() {
  const [connected, setConnected] = useRecoilState(metamaskConnected)

  const Dialog = () => {
    if (!hasMetamask()) {
      return <InstallMetamask />
    }

    if (!connected) {
      return <ConnectMetamask />
    }
    
    return <SellForm />
  }

  return <Dialog />
}