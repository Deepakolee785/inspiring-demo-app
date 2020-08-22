import React, { useState } from 'react'
import { Card, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, Form } from 'formik'
import FormikMuiField from '../common/FormikMuiField'
import { register } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

//assets
import register_svg from '../../assets/register_bgsvg.svg'
// styles
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

const Register = () => {
  // style classes
  const classes = useStyles()

  const dispatch = useDispatch()
  const error = useSelector((state) => state.auth.error)
  const [passwordError, setPasswordError] = useState(false)
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <img src={register_svg} alt="" className={classes.img} />
        <h2>Register</h2>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(data) => {
            // console.log(data)

            if (data.password !== data.confirmPassword) {
              setPasswordError(true)
              return
            }
            setPasswordError(false)

            dispatch(
              register({
                name: data.name,
                email: data.email,
                password: data.password,
              })
            )
          }}
        >
          {() => (
            <Form>
              <FormikMuiField label="Name" name="name" type="text" />
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
                error={passwordError ? 'Password didn"t matched' : ''}
              />
              <FormikMuiField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <Typography variant="subtitle1" className={classes.extraLink}>
          Aleardy a user? <Link to="/login">Login</Link>
        </Typography>
      </Card>
    </div>
  )
}

export default Register
