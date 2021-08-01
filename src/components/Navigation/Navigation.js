import styles from "./Navigation.module.css"
import { Link } from "react-router-dom"

export default function Navigation() {
    return <nav className={styles.navigation}>
        <Link to="/">Buy</Link>
        <Link to="/sell">Sell</Link>
    </nav>
}