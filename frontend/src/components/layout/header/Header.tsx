import { Link } from "react-router";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header>
      <nav className={styles.headerNav}>
        <Link to='/' className={styles.headerLink}>
          Home
        </Link>
        <Link to='/login' className={styles.headerLink}>
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
