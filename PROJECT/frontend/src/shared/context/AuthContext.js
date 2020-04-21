import {createContext} from 'react';

export const AuthContext = createContext({isLoggedIn: false, userId: null, teamId: null, login: ()=>{}, logout: ()=>{}});