import SurgeGraph from "../../components/SurgeGraph/SurgeGraph"
import SurgeUsdGraph from "../../components/SurgeUsdGraph/SurgeUsdGraph"

export default function Graphs() {
  return <div>
      <h2>Surge/BNB price</h2>
      <SurgeGraph />

      <h2>SurgeUSD/BUSD price</h2>
      <SurgeUsdGraph />
  </div>
}