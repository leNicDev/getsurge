import fetch from "node-fetch"
import { useEffect, useState } from "react"
import { VictoryChart, VictoryLine, VictoryVoronoiContainer, VictoryTooltip } from 'victory';
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
        <VictoryChart containerComponent={
            <VictoryVoronoiContainer
                labels={({datum}) => `${new Date(datum.x).toLocaleString()}\n${Number(datum.y).toFixed(20).replace(/\.?0+$/,"")}`}
                labelComponent={<VictoryTooltip cornerRadius={10} flyoutPadding={15} flyoutStyle={{ fill: '#0B1321' }} style={{ fill: 'white' }} />}
            />
        }>
            <VictoryLine data={priceData} />
        </VictoryChart>
    </div>
}