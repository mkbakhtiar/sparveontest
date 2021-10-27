import React, {useReducer, createContect, Fragment} from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import MenuComponent from './component/MenuComponent';
import LoginComponent from './component/LoginComponent';
import RegisterComponent from './component/RegisterComponent';
import DashboardComponent from './component/DashboardComponent';


//State Iniliatitaion
const initState = {
  isAuth:false,
  user:null,
  token:null
}

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
        localStorage.setItem("user", JSON.stringify(action.payload.user))
        localStorage.setItem("token", JSON.stringify(action.payload.token))

        return {
          ...state,
          isAuth:true,
          user:action.payload.user,
          token:action.payload.token,
        }

        case "LOGOUT":
          localStorage.clear();
          return{
            ...state,
            isAuth:false,
            user:action.payload.user
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

          {!state.isAuth ?
          <Redirect to={{pathname:"/"}}  />
          :
          <Redirect to={{pathname:"/dashboard"}} />
          }

          <Route exact path="/" component={LoginComponent} />
          <Route exact path="/dashboard" componen={DashboardComponent} />
          <Route exact path="/register" componen={RegisterComponent} />

        </AuthContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
