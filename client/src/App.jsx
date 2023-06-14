import { useState,useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";
// import './App.css';
// import './normal.css';
import {useSelector, useDispatch} from 'react-redux';
import {selectUser,login,logout} from './feature/userSlice';
import {auth} from '../firebase';
import Auth from './components/Auth';
import ChatLog from './components/ChatLog';

function App() {
  const history = useHistory();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(()=> {
    auth.onAuthStateChanged((authUser)=> {
      if(authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email
          })
        )
      } else {
        dispatch(logout());
      }
    })
  },[dispatch]);
// useEffect(() => {
//     window.location.reload();
//   }, []);
// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route
//       {...rest}
//       render={(props) =>
//         user ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/",
//               state: {
//                 from: props.location,
//               },
//             }}
//           />
//         )
//       }
//     />
//   );



  return (
    <>
      <Router>
        <Switch>
          {/*<Route exact path={user ? '/chatbot': '/'} component={user ? ChatLog : Auth} />
          <Route exact path={user ? '/chatbot' : '/'}>
            <PrivateRoute component={ChatLog}/>
          </Route>*/}
        <Route exact path='/' component={ChatLog}/>
        </Switch>
      </Router>
      {/*<Router>
        <Routes>
          <Route exact path="/" component={Auth} />
          <Route exact path={user ? '/chatbot' : '/'}>
            <PrivateRoute component={ChatLog}/>
          </Route>
        </Routes>
      </Router>*/}
    </>
  )
}


export default App;
