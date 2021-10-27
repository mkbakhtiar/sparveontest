import React, {useReducer, createContext} from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import MenuComponent from './component/MenuComponent';
import LoginComponent from './component/LoginComponent';
import RegisterComponent from './component/RegisterComponent';
import DashboardComponent from './component/DashboardComponent';

export const AuthContext = createContext()

//State Iniliatitaion
const initState = {
  isAuth:false,
  user:null,
  token:null
}

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
        localStorage.setItem("user", JSON.stringify(action.payload.curntUser))
        localStorage.setItem("token", JSON.stringify(action.payload.token))
        localStorage.setItem("isAuth", true)

        return {
          ...state,
          isAuth:true,
          user:action.payload.curntUser,
          token:action.payload.token,
        }

        case "LOGOUT":
          localStorage.clear();
          return{
            ...state,
            isAuth:false,
            user:null
          }

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <BrowserRouter>
      <Switch>
        <AuthContext.Provider value={{
          state,
          dispatch
        }}>
          <MenuComponent />

          {!localStorage.getItem('isAuth') ?
          <Redirect to={{pathname:"/"}}  />
          :
          <Redirect to={{pathname:"/dashboard"}} />
          }

          <Route exact path="/" component={LoginComponent} />
          <Route exact path="/dashboard" component={DashboardComponent} />
          <Route exact path="/register" component={RegisterComponent} />

        </AuthContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
