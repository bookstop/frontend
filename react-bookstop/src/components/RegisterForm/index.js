import { useState } from "react"

const RegisterForm = () => {

    const initialFormState = {
        username: '',
        password: '',
        firstName: '',
        lastName: ''
    }

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
        e.preventDefault()
        const ENDPOINT = 'http://localhost:4000/users'
        console.log(values)
        try {
            const newUserResponse = await fetch(ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (newUserResponse.status === 201) {
                setValues(initialFormState)
            }
            // console.log(newUserResponse)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={_createNewUser}>
            <label htmlFor="username"></label>
            <input 
                type="text" 
                id="username" 
                placeholder='Username:'
                value={values.username}
                onChange={_handleChange}
            />
            <label htmlFor="password"></label>
            <input 
                type="text" 
                id="password" 
                placeholder='Password:' 
                value={values.password}
                onChange={_handleChange}
            />
            <label htmlFor="firstName"></label>
            <input 
                type="text" 
                id="firstName" 
                placeholder='First Name:'
                value={values.firstName}
                onChange={_handleChange}
            />
            <label htmlFor="lastName"></label>
            <input 
                type="text" 
                id="lastName" 
                placeholder='Last Name:' 
                values={values.lastName}
                onChange={_handleChange}
            />
            <label htmlFor="create"></label>
            <input type="submit" id='create' value="Create" />
        </form>
    )
}

export default RegisterForm