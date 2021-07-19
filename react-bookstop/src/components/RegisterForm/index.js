import { useState } from "react"
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
        const ENDPOINT = 'http://localhost:4000/users'
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
            }
            else {
                setFormStatus({showStatus: true, showSpinner:false, message: "Your user account could not be created.  Check your input and try again."});               
            }
            // console.log(newUserResponse)
        } catch (error) {
            setFormStatus({showStatus: true, showSpinner:false, message: "The BookStop account registration system encountered an error.  Please try again."});            
            console.error(error)
        }
    }

    return (
        
        <form onSubmit={_createNewUser} className="registration-form"  >
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
        </form>
    
    )
}

export default RegisterForm