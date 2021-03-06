import React, {useState, useCallback} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Auth from './users/pages/Auth';
import MainNavigation from './shared/components/MainNavigation';
import Footer from './shared/components/Footer';
import Home from './notes/pages/Home';
import Note from './notes/pages/Note';
import TeamUsers from './users/pages/TeamUsers';
import TeamUserNotes from './notes/pages/TeamUserNotes';
import CategoryNotes from './notes/pages/CategoryNotes';
import UserNotes from './notes/pages/UserNotes';
import NewNote from './notes/pages/NewNote';
import UpdateNote from './notes/pages/UpdateNote';
import { AuthContext } from './shared/context/AuthContext';


import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [teamId, setTeamId] = useState();



  const login = useCallback((uid, tid)=>{
    setIsLoggedIn(true);
    setUserId(uid);
    setTeamId(tid);
  });

  const logout = useCallback(()=>{
    setIsLoggedIn(false);
  });

  const page = (
      <>
      <MainNavigation/>
      <main>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/team/user/:userId' exact>
          <TeamUserNotes/>
        </Route>
        <Route path='/team/:teamId' exact>
          <TeamUsers/>
        </Route>
        <Route path='/user/:userId/notes' exact>
          <UserNotes/>
        </Route>
        <Route path='/category/:categoryId/notes' exact>
          <CategoryNotes/>
        </Route>
        <Route path='/notes/new' exact>
          <NewNote/>
        </Route>
        <Route path='/notes/:noteId' exact>
          <Note/>
        </Route>
        <Route path='/notes/:noteId/update' exact>
          <UpdateNote/>
        </Route>
        <Redirect to='/'/>
      </Switch>
      </main>
      <Footer/>
      </>
    )

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, userId: userId, teamId: teamId, login: login, logout: logout}}>
    {isLoggedIn ? <Router>{page}</Router> : <Auth/>}
    </AuthContext.Provider>
  );
};

export default App;
