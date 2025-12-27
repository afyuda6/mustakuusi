import {useState} from "react";
import styles from "./Navbar.module.css";
import {useLocation} from "react-router-dom";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isProjectPage = location.pathname !== "/" && !location.pathname.includes("privacy-policy");

    return (
        <nav className={styles.navbar}>
            <a className={styles.title} href="/">mustakuusi</a>
            <div className={styles.menu}>
                <div
                    className={`${styles.burger} ${menuOpen ? styles.open : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`} onClick={() => setMenuOpen(false)}>
                    {(isHomePage || isProjectPage) && (
                        <li>
                            <a href="#about">About</a>
                        </li>
                    )}
                    {isHomePage && (
                        <li>
                            <a href="#projects">Projects</a>
                        </li>
                    )}
                    {isProjectPage && (
                        <li>
                            <a href="#screenshots">Screenshots</a>
                        </li>
                    )}
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}