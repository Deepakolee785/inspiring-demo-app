import React from 'react'
import { Container, Grid, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import home_svg from '../../assets/home_svg.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '4rem',
  },
  heading: {
    marginBottom: '2rem',
  },
  headingSub: {
    fontWeight: 800,
  },
  description: {
    opacity: 0.7,
    marginBottom: '4rem',
  },
  img: {
    height: '75vh',
  },
  button: {
    borderRadius: '10rem',
    width: '12rem',
    margin: '0 0.2rem',
  },
}))

const Home = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Grid container spacing={2} justify="space-between" alignItems="center">
        <Grid item md={6}>
          <Typography variant="h3" className={classes.heading}>
            Welcome,
            <br />
            <span className={classes.headingSub}>Beautiful People</span>
          </Typography>
          <Typography variant="body1" className={classes.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Learn More
          </Button>
        </Grid>
        <Grid item md={6}>
          <img src={home_svg} alt="" className={classes.img} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
