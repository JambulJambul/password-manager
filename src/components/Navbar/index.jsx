import classes from './style.module.scss'

const Navbar = () => {
    return (
        <>
            <div className={classes["page-container"]}>
                <a href="/">
                    <h2>Password Manager</h2>
                </a>
            </div>
        </>
    )
}

export default Navbar