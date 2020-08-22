import React from 'react'
import { Field } from 'formik'
import { TextField } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '1rem',
    '& .MuiFormLabel-root': {
      fontWeight: 600,
      fontSize: '0.85rem',
      color: '#3961C1',
    },
  },
  input: {
    backgroundColor: '#F0F0F0',
  },
}))

const FormikMuiField = ({ label, name, type, error = '' }) => {
  const classes = useStyles()
  return (
    <div>
      <Field
        autoComplete="off"
        as={TextField}
        label={label}
        fullWidth
        name={name}
        type={type}
        variant="filled"
        InputProps={{ disableUnderline: true, className: classes.input }}
        margin="dense"
        className={classes.root}
        helperText={error}
        error={!!error}
        required
      />
    </div>
  )
}

export default FormikMuiField
