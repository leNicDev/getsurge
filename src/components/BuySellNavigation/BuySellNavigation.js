import styles from "./BuySellNavigation.module.css"
import { NavLink } from "react-router-dom"

export default function Navigation(props) {
    return <nav className={styles.navigation}>
        <NavLink exact to={props.sellLink} className={styles.navItem} activeClassName={styles.active}>Sell</NavLink>
    </nav>
}
