import {useForm} from "react-hook-form";
import axios from "axios";

function Register() {
    const { register } = useForm();

    {/* Function to handle the form submit */}


    return (
        <>
            <p>This is the Registration Page</p>
            {/* Add form here */}
            <form>
                <label htmlFor="user-name-field">
                    User Name:
                    <input
                        type="text"
                        id="user-name-field"
                        {...register("user-name")}
                    />
                </label>
                <label htmlFor="email-field">
                    E-Mail:
                    <input
                        type="text"
                        id="email-field"
                        {...register("email")}
                    />
                </label>
                <label htmlFor="email-confirmation-field">
                    Confirm E-Mail:
                    <input
                        type="text"
                        id="email-confirmation-field"
                        {...register("email-confirmation")}
                    />
                </label>
                <label htmlFor="password-field">
                    Password:
                    <input
                        type="text"
                        id="password-field"
                        {...register("password")}
                    />
                </label>
                <label htmlFor="user-name-field">
                    Confirm Password:
                    <input
                        type="text"
                        id="password-confirmation-field"
                        {...register("password-confirmation-name")}
                    />
                </label>
            </form>
            {/* Form submit button */}
        </>
    )
}

export default Register

{/*  */}