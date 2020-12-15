import React from 'react'
import {Button} from "@material-ui/core";
import './login.css';
import {auth, provider} from "../firebase";
import {useStateValue} from "../StateProvider";
import {actionTypes} from "../reducer";

const Login = (params) => {
    const [{user}, dispatch] = useStateValue()
    //Якщо дані входу вже є, вони передаються в dispatch
    if (localStorage.getItem('user')) {
        dispatch({
                type: actionTypes.SET_USER,
                user: JSON.parse(localStorage.getItem('user'))
            }
        )

    }
    //якщо даних немає, відбувається вхід черех попап гугл
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                    dispatch({
                            type: actionTypes.SET_USER,
                            user: result.user,

                        }
                    )

                }
            ).catch(error => alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__wrap">
                <div className="login__text">
                    <h1> Sign in to Rabbit Chat</h1>
                </div>

                <Button type='submit' onClick={signIn} >
                    Sing In With Google
                </Button>
            </div>
        </div>
    )
}
export default Login;