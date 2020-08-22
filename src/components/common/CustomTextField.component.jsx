import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useField } from 'formik'
import { TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: 600,
    fontSize: '1.1rem',
    color: '#3961C1',
  },
  textField: {
    backgroundColor: '#F0F0F0',
    paddingLeft: '0.5rem',
    width: '17rem',
    height: '2rem',
    paddingTop: '0.4rem',
    marginBottom: '1rem',
  },
}))

const CustomTextField = ({ label, placeholder, type, ...props }) => {
  const classes = useStyles()
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ''
  return (
    <div>
      <label className={classes.label}>{label}</label>
      <br />
      <TextField
        type={type}
        placeholder={placeholder}
        InputProps={{ disableUnderline: true }}
        className={classes.textField}
        helperText={errorText}
        error={!!errorText}
        {...field}
      />
    </div>
  )
}

export default CustomTextField
