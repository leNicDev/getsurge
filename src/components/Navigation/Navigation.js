import styles from "./Navigation.module.css"
import { NavLink } from "react-router-dom"

export default function Navigation() {
    return <nav className={styles.navigation}>
        <NavLink exact to="/" className={styles.navItem} activeClassName={styles.active}>Buy</NavLink>
        <NavLink to="/sell" className={styles.navItem} activeClassName={styles.active}>Sell</NavLink>
    </nav>
}