import React, { useState } from 'react'

import { BrowserRouter as Router , Switch, Route } from "react-router-dom"
import { isAuthenticated, noAccess } from './Auth';

import Error from './components/Error'
import Header from './components/Header'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import ForgotPassword from './components/ForgotPassword'
import ChangePassword from './components/ChangePassword'
import Confirm from './components/Confirm'
import TournamentList from './components/TournamentList'
import TournamentForm from './components/TournamentForm'
import Tournament from './components/Tournament'
import Profile from './components/Profile'

import './App.scss'

const App = () => {
  const [auth, setAuth] = useState(isAuthenticated())

  return (
    <Router>
      <div>
        <Header auth={ auth } setAuth={ setAuth } />
        <Switch>
          <Route exact path="/signIn" render={() => <SignIn setAuth={ setAuth } />}/>
          <Route exact path="/signUp" render={() => !auth ? <SignUp /> : <Error message="You already have an account"/> }/>

          <Route exact path="/confirmAccount/:token" render={(params) => <Confirm params={params}/> } />
          <Route exact path="/changePassword/:token" render={(params) => <ChangePassword params={params} setAuth={setAuth} /> } />

          <Route exact path="/forgotPassword" render={() => <ForgotPassword />}/>

          <Route exact path="/myOpen" render={() => auth ? <Profile /> : noAccess() } />

          <Route exact path="/new" render={() => auth ? <TournamentForm /> : noAccess() } />
          <Route exact path="/:id" render={(params) => <Tournament auth={ auth } params={params}/> } />
          <Route exact path="/" render={() => <TournamentList auth={ auth } /> }/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
