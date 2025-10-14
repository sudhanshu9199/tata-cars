import style from './Navbar.module.scss'
const Navbar = () => {
  return (
    <nav className={style.navbar}>
        <div className={style.left}>
            <p>TATA <span>MOTORS</span></p>
        </div>
        <div className={style.middle}>
            <p>Home</p>
            <p>Products</p>
            <p>About</p>
        </div>
        <div className={style.right}>
            <p>My Account</p>
        </div>
    </nav>
  )
}

export default Navbar