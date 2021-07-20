import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Spinner } from '../Spinner';

const RegisterForm = () => {

    const initialFormState = {
        username: '',
        password: '',
        firstName: '',
        lastName: ''
    }

    const initialFormSubmitStatus = {
        showStatus: false,
        showSpinner: false,
        message: "",
    };

    const [formStatus, setFormStatus] = useState(initialFormSubmitStatus);
    const [values, setValues] = useState(initialFormState)
    const [registered, setRegistered] = useState(false);
    let history = useHistory();


    const _handleChange = e => {
        setValues((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value
            }
        })
    }

    const _createNewUser = async e => {
        setFormStatus({showStatus:true, showSpinner:true, message: ""});
        e.preventDefault()
        const ENDPOINT = 'https://bookstop-api.herokuapp.com/users'
        //console.log(values)
        try {
            const newUserResponse = await fetch(ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (newUserResponse.status === 201) {
                setFormStatus({showStatus:true, showSpinner:false, message: "Your BookStop account has been successfully created."});
                setValues(initialFormState)
                setRegistered(true);
            }
            else {
                setFormStatus({showStatus: true, showSpinner:false, message: "Your user account could not be created.  Check your input and try again."}); 
                setRegistered(false);              
            }
            // console.log(newUserResponse)
        } catch (error) {
            setFormStatus({showStatus: true, showSpinner:false, message: "The BookStop account registration system encountered an error.  Please try again."});  
            setRegistered(false);          
            console.error(error)
        }
    }

    // Upon a successful registration, send the user to the /home route after a 3 second delay
    useEffect(() => {
        if (registered===true) {
            setTimeout(() => {
                history.push('/home');
            }, 3000);
        }
        }, [registered, history]);

    return (
        
        <div className="register-form-container">
        <form onSubmit={_createNewUser} className="registration-form"  >
            <h3>BookStop Account Registration</h3>
            <fieldset>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    id="username"
                    placeholder='Username:'
                    value={values.username}
                    onChange={_handleChange}
                    required
                />
            </fieldset>
            <fieldset>
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    placeholder='Password:'
                    value={values.password}
                    onChange={_handleChange}
                    required
                />
            </fieldset>
            <fieldset>
                <label htmlFor="firstName">First Name: </label>
                <input
                    type="text"
                    id="firstName"
                    placeholder='First Name:'
                    value={values.firstName}
                    onChange={_handleChange}
                    required
                />
            </fieldset>
            <fieldset>
                <label htmlFor="lastName">Last Name: </label>
                <input
                    type="text"
                    id="lastName"
                    placeholder='Last Name:'
                    values={values.lastName}
                    onChange={_handleChange}
                    required
                />
            </fieldset>
            <fieldset>
                <label htmlFor="create"></label>
                <input type="submit" id='create' value="Register for an Account" className="btn btn-danger" />
            </fieldset>
            {/* FormStatus Component*/}
            <Spinner props={formStatus} /> 
                
            <p className="close-window"><a href="/home" className="close-window">CLOSE WINDOW</a></p>        
                    
        </form>
        </div>
    
    )
}

export default RegisterForm