import styles from "./ChangeIndicator.module.css"
import { roundTo } from "../../common/math"
import classNames from "classnames"

export default function ChangeIndicator(props) {
    const change = roundTo(props.changePercentage * 100, 2)
    const wentUp = change >= 0
    const changeText = `${wentUp ? '+' : '-'}${change}%`

    return <div className={classNames({[styles.changeIndicator]: true, [styles.up]: wentUp})} title="24h price change">{changeText}</div>
}