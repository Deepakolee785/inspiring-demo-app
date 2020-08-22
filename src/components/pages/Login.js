import React from 'react'
import { useDispatch } from 'react-redux'
import { Card, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, Form } from 'formik'
import FormikMuiField from '../common/FormikMuiField'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { login } from '../../redux/actions'

import login_svg from '../../assets/login_bg.svg'
import loading_gif from '../../assets/loading.gif'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  card: {
    width: '40vh',
    padding: '1rem 2rem',
    borderRadius: '1rem',
  },
  img: {
    width: '100%',
    height: '8rem',
  },

  extraLink: {
    fontSize: '0.85rem',
  },
}))

const Login = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const error = useSelector((state) => state.auth.error)
  const loading = useSelector((state) => state.auth.loading)
  // console.log(loading)
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <img src={login_svg} alt="" className={classes.img} />
        <h2>Login</h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(data) => {
            // console.log(data)
            dispatch(login({ email: data.email, password: data.password }))
          }}
        >
          {() => (
            <Form>
              <FormikMuiField
                label="Email Address"
                name="email"
                type="email"
                error={error}
              />
              <FormikMuiField
                label="Password"
                name="password"
                type="password"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                endIcon={
                  loading ? <img src={loading_gif} alt="" height="20rem" /> : ''
                }
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Typography variant="subtitle1" className={classes.extraLink}>
          Didn't have account? <Link to="/register">Register</Link>
        </Typography>
      </Card>
    </div>
  )
}

export default Login
