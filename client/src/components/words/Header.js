import classes from "./Header.module.css";

function Header() {
  return (
    <>
      <nav className={classes.sidebar}>
        <header>
          <ul className={classes.nav_items}>
            <li>N1</li>
            <li>N2</li>
            <li>N3</li>
            <li>N4</li>
            <li>N5</li>
          </ul>
        </header>
      </nav>
    </>
  );
}

export default Header;
