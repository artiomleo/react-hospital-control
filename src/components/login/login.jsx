import React from 'react';
import './login.css';
import {login} from '../../api/requests.js';

class Login extends React.Component{

    constructor( props ){

        super( props );
        this.state = {
            username: '',
            password: ''
        };
    }

  loginButton(e){
      e.preventDefault();
        login({
            username: this.state.username,
            password: this.state.password
        }).then( result => {
            if( result.status === 200 ){
                result.text().then( result => {
                  if( result.includes( "Expired" ) ){
                    window.location.assign( 'license' );
                  }
                    const response = JSON.parse( result );
                    sessionStorage.setItem( 'authToken' , response.token );
                    sessionStorage.setItem( 'username' , this.state.username );
                    window.location.assign( '/home' );
                } )
            } else if ( result.status === 400 ){

            } else if ( result.status === 401 ){

            }
        } )
    }

    onChangeUsername( evt ){
        this.setState({
            username: evt.target.value
        });
    }

    onChangePassword( evt ){
        this.setState({
            password: evt.target.value
        });
    }

    render(){
        return(
          <div className='login-wrapper-page'>
            <form className='login-wrapper' onSubmit =  { (e) => this.loginButton(e) }>
                 <div className = 'login-title' ><h2 className='login-h2'>Welcome</h2></div>
            <div className = 'content-wrapper' >

                <span className = 'login-field' placeholder='username'></span>
                <input onChange = { evt => { this.onChangeUsername( evt ) } } value = {this.state.username} type = 'text' placeholder='Username'className='input-field' />
                <span className = 'login-field' ></span>
                <input onChange = { evt => { this.onChangePassword( evt ) } } value = {this.state.password} type = 'password' placeholder='Password' className='input-field' />
                <button type="submit" className = 'login-button' >Log In</button>
                </div>
            </form>
            <footer className="login-footer">© Copyright - 2019.</footer>
            </div>
        );
    }


}
 export default Login;