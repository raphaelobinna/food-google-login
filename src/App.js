import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import { GoogleLogin, useGoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios'

function App() {

  const [profile, setProfile] = useState([]);

  const clientId = '443206521337-qhtpai3j8191gm1dm77nsc426p8didrd.apps.googleusercontent.com'



  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res) => {
    setProfile(res.profileObj);

    window.location.replace(`exp://192.168.0.108:19000/--/info?${JSON.stringify(res.tokenId)}`); setTimeout(function () {

      window.location.replace(`exp://192.168.0.108:19000/--/info?${JSON.stringify(res.tokenId)}`);
    }, 2000);

    //axios.get(`exp://192.168.0.108:19000/--/info?${JSON.stringify(res.profileObj)}`)

  };



  const onFailure = (err) => {
    console.log('failed', err);
  };

  const logOut = () => {
    setProfile(null);
  };

  const { signIn, loaded } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId
  })

  React.useEffect(() => {
    !profile && signIn()
  }, [profile])


  return (
    <div style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
    }} >

      {profile ? (
        <div>
          <p>Redirecting...</p>
          <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
        </div>
      ) : (
        <div style={{
          marginTop: '10%',
          width: '20%',
          height: '20%',
          padding: 10,
          backgroundColor: '#CE2600',
          borderRadius: 10,
          textAlign: 'center',
          color: 'white',
          alignSelf: 'center',
          fontWeight: '700'
        }} onClick={() => signIn()} >
          Google SignIn
        </div>
        // <GoogleLogin
        //   clientId={clientId}
        //   buttonText="Sign in with Google"
        //   onSuccess={onSuccess}
        //   onFailure={onFailure}
        //   cookiePolicy={'single_host_origin'}
        //   isSignedIn={true}
        // />
      )}
    </div>
  );
}

export default App;
