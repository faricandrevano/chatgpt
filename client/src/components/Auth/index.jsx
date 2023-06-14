import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
// import firebase from 'firebase/app';
import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import { auth, provider } from "../../../firebase";
import { setCurrentUser } from '../../feature/dataSlice';
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';

function Index() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data,setData] = useState([]);

  // const user = firebase.auth().currentUser;

  function validateEmail(email) {
    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) === false) {
      return false;
    } else return true;
  }
  // console.log(firebase)

  const handleGoogleSignIN = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((res) => {

        setLoading(false);
        toast.success(`Selamat datang ${res.user.displayName}`,{
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
        })
        history.push("/chatbot");
      })
      .catch((error) => {
        toast.error('Gagal Mengautentikasi');
        setLoading(false);
        console.log(error);
      });
  };
  const handleSignIn = async () => {
    setLoading(true);
    if (email === "" || password === "") {
        toast.error("Semua field belum terisi!");
        setLoading(false);
      } else if (!validateEmail(email)) {
        toast.error("Email tidak valid!");
        // setError("Email is malformed");
        setLoading(false);
      } else {
        signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            toast.success(`Selamat datang ${response.data[0].username}`,{
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000
            })
            history.push("/chatbot");
            setLoading(false);
          })
          .catch((error) => {
            toast.error('Email atau Password Invalid!');
            console.log(error.code);
            // setError(error.message);
            setLoading(false);
        });
    }
  };

  const handleRegister = () => {
    setError("");
    setLoading(false);
    if (email === "" || password === "" || username === "") {
      toast.error("field belum semua terisi!");
      setLoading(false);
    } else if (!validateEmail(email)) {
      toast.error('Email tidak valid!');
      // setError("Email is malformed");
      setLoading(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          toast.success(`Selamat Datang ${username}`,{
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
          });
          dispatch(setCurrentUser(username))
          console.log(res);
          history.push("/chatbot");
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Email Sudah terdaftar!");
          console.log(error);
          setLoading(false);
        });
    }
  };
  return (
    <div className="auth">
      <div className="auth-container">
        <div className="sign-options">
          <div className="single-option" onClick={handleGoogleSignIN}>
            <img src="https://img.icons8.com/color/48/null/google-logo.png" alt="Google"/>
            <p>Login with Google</p>
          </div>
        </div>
        <div className="auth-login">
        <div className="auth-login-container">
          {
            register ? (
              <React.Fragment>
                <div className="input-field">
                  <p>Username</p>
                  <input type="text" value={username} onChange={(event)=>setUsername(event.target.value)} />
                </div>
                <div className="input-field">
                  <p>Email</p>
                  <input type="text" value={email} onChange={(event)=>setEmail(event.target.value)} />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} />
                </div>
                <button className="btn-auth" onClick={handleRegister}>{loading ? 'Registering...':'Register'}</button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="input-field">
                  <p>Email</p>
                  <input type="text" value={email} onChange={(event)=>setEmail(event.target.value)} />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} />
                </div>
                <button className="btn-auth" disabled={loading} onClick={handleSignIn}>{loading ? 'Signing In...':'Login'}</button>
              </React.Fragment>
            )
          }
          <p onClick={() => setRegister(!register)} className="txt-auth mt-4 text-center text-[#0095ff] decoration-1 cursor-pointer">{register ? "Login":"Register"}?</p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Index;