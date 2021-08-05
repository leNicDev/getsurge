import fetch from "node-fetch"
import { useEffect, useState } from "react"
import { VictoryChart, VictoryLine } from 'victory';
import styles from "./SurgeUsdGraph.module.css"

export default function SurgeUsdGraph() {
    const [priceData, setPriceData] = useState([])
    
    useEffect(() => {
        (async () => {
            const response = await fetch('https://api.getsur.ge/surgeusd?interval=1m')
            const json = await response.json()

            if (!json || !json.dataset) {
                setPriceData([])
                return
            }

            const graphData = []
            for (const dataPoint of json.dataset) {
                graphData.push({ y: dataPoint[0], x: new Date(dataPoint[1]) })
            }

            setPriceData(graphData)
        })()
    }, [])

    return <div className={styles.graphWrapper}>
        <VictoryChart>
            <VictoryLine data={priceData} />
        </VictoryChart>
    </div>
}