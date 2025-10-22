import { Link } from "react-router";

const Header = () => {
  return (
    <header>
      <nav style={{ display: "flex", justifyContent: "space-around" }}>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
      </nav>
    </header>
  );
};

export default Header;
