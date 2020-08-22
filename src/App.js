import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar.component'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import AuthRoute from './utils/AuthRoute'
import NonAuthRoute from './utils/NonAuthRoutes'
import InvalidRoutePage from './components/pages/InvalidRoutePage'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <AuthRoute exact path="/" component={Home} />
        <NonAuthRoute path="/login" component={Login} />
        <NonAuthRoute path="/register" component={Register} />
        <Route component={InvalidRoutePage} />
      </Switch>
    </Router>
  )
}

export default App
