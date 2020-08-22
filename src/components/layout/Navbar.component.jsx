import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { Container, Button, Hidden } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { logout } from '../../redux/actions'

//
import logo from '../../assets/logo.svg'
import { NavLink, Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '1rem',
  },
  logo: {
    marginRight: theme.spacing(2),
    width: '4rem',
  },
  navItem: {
    fontSize: '1rem',
    margin: '0 1rem',
    fontWeight: '600',
    color: '#3961C1',
    textDecoration: 'none',
  },
  active: {
    fontWeight: 800,
    fontSize: '1.1rem',
  },
  button: {
    borderRadius: '10rem',
    width: '8rem',
    margin: '0 0.2rem',
  },
  icon: {
    fontSize: '1rem',
    marginLeft: '1rem',
    color: '#FB726A',
  },
}))

const Navbar = () => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    handleClose()
  }
  const _navItems = [
    { name: 'Home', route: '/' },
    { name: 'Gallery', route: '/gallery' },
    { name: 'Contact Us', route: '/contact-us' },
    { name: 'About-Us', route: '/about-us' },
  ]

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Container>
          <Toolbar disableGutters={true}>
            <img src={logo} alt="" className={classes.logo} />
            <span style={{ flex: 1 }}></span>
            <Hidden smDown>
              {_navItems.map((navItem, index) => (
                <NavLink
                  key={index}
                  to={navItem.route}
                  exact
                  className={classes.navItem}
                  activeClassName={classes.active}
                >
                  {navItem.name}
                </NavLink>
              ))}
            </Hidden>

            <span style={{ flex: 1 }}></span>

            {isAuthenticated ? (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  //   aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle color="primary" />
                </IconButton>
                <span>Welcome!</span>
                <Menu
                  style={{ marginTop: '2.5rem' }}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    Profile <AccountBoxIcon className={classes.icon} />
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Logout <ExitToAppIcon className={classes.icon} />
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Link to="/register">
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                  >
                    Register
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Navbar
