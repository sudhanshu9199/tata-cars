import style from './Navbar.module.scss'
import { NavLink, useNavigate } from 'react-router';

const Navbar = () => {
  return (
    <nav className={style.navbar}>
        <div className={style.left}>
            <p>TATA <span>MOTORS</span></p>
        </div>
        <div className={style.middle}>
            <NavLink className={({ isActive }) => (isActive ? style.active : "")} to="/"><p>Home</p></NavLink>
            <NavLink className={({ isActive }) => (isActive ? style.active : "")} to="/products"><p>Products</p></NavLink>
            <NavLink className={({ isActive }) => (isActive ? style.active : "")} to="/about"><p>About</p></NavLink>
        </div>
        <div className={style.right}>
            <p>My Account</p>
        </div>
    </nav>
  )
}

export default Navbar