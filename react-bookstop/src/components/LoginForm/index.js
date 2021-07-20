import { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import { UserAuthStatusContext, UserAuthDispatchContext } from '../../App';
import { Spinner } from '../Spinner';

const LoginForm = (props) => {

    const userContext = useContext(UserContext);
    const userAuth = useContext(UserAuthStatusContext);
    const userDispatch = useContext(UserAuthDispatchContext);
    let history = useHistory();

    const initialFormSubmitStatus = {
        showStatus: false,
        showSpinner: false,
        message: "",
    };

    const [formStatus, setFormStatus] = useState(initialFormSubmitStatus);
    const [loggedIn, setLoggedIn] = useState(false);

    // handle user form login request 
    const _handleUserLogin = async (event) => {
        setFormStatus({showStatus:true, showSpinner:true, message: ""});
        event.preventDefault();
        try {
            const API_ENDPOINT = 'https://bookstop-api.herokuapp.com/users/login';
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                },
            });     
            const data = await response.json();
            if (response.status === 200) {
                localStorage.setItem('BookStopUser', data._id );
                // localStorage.removeItem('BookStopUser');
                // localStorage.getItem('BookStopUser');
                userDispatch({"type":"Login", "login": data} );
                setFormStatus({showStatus:true, showSpinner:false, message: "You have successfully logged in."});
                setLoggedIn(true);
                userContext.getUser();
            }
            else {
                setFormStatus({showStatus: true, showSpinner:false, message: "Log in failed.  Check your credentials and try again."});
            }
        } catch (err) {
            setFormStatus({showStatus: true, showSpinner:false, message: "The log in system encountered an error.  Please try again."});
            console.log(err)
        }
    };

    // Upon a successful login, send the user to the /home route after a 2 second delay
    useEffect(() => {
        if (loggedIn===true) {
            setTimeout(() => {
                history.push('/home');
            }, 2000);
        }
      }, [loggedIn, history]);

    // Login form on this component
    const initialFormValues = {
        username: '',
        password: '',
    };

    const [values, setValues] = useState(initialFormValues);

    // handle change function
    const _handleChange = (e) => {
        setValues((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
    };

 
    return (

        <form onSubmit={_handleUserLogin} className="login-form">
            <h3>Registered User Log In</h3>
            <fieldset>
                <label htmlFor='username'>Username: </label>
                    <input
                        type='text'
                        id='username'
                        value={values.username}
                        onChange={_handleChange}
                        required
                    />  
            </fieldset>
            <fieldset>
                <label htmlFor='password'>Password: </label>
                    <input
                        type='password'
                        id='password'
                        value={values.password}
                        onChange={_handleChange}
                        required
                    />
            </fieldset>
            <input type='submit' value='Login to BookStop' className="btn btn-danger"/>
            {/* FormStatus Component*/}
            <Spinner props={formStatus} />            
        </form>

    )
};

export default LoginForm;




