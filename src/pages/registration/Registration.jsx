import {useForm} from "react-hook-form";
import axios from "axios";

function Register() {
    const { register, getValues } = useForm();

    {/* Function to handle the form submit */}
/*    function handleFormSubmit(data) {

        {/!* Add user role to the data *!/}
        const updatedData = {
            ...data,
            role: ["user"]
        }

        async function createAccount() {
            try {

            }
        }

    }*/

    return (
        <>
            <p>This is the Registration Page</p>
            {/* Add form here */}
            <form>
                <label htmlFor="username-field">
                    User Name:
                    <input
                        type="text"
                        id="username-field"
                        {...register("username", {
                            required: {
                                value: true,
                                message: "Please pick a username.",
                            },
                            minlength: {
                                value: 6,
                                message: "Your username needs to be at least 6 characters.",
                            },
                            maxlength: {
                                value: 25,
                                message: "Your username needs to be 25 characters or less.",
                            },
                        })}
                    />
                </label>
                <label htmlFor="email-field">
                    E-Mail:
                    <input
                        type="text"
                        id="email-field"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Please enter your E-Mail.",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid E-Mail adress.",
                            },
                        })}
                    />
                </label>
                <label htmlFor="email-confirmation-field">
                    Confirm E-Mail:
                    <input
                        type="text"
                        id="email-confirmation-field"
                        {...register("email-confirmation",{
                            required: {
                                value: true,
                                message: "Please repeat your E-Mail.",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid E-Mail adress.",
                            },
                            validate: (emailMatch) => (emailMatch === getValues().email) || 'Email does not match.'
                        })}
                    />
                </label>
                <label htmlFor="password-field">
                    Password:
                    <input
                        type="text"
                        id="password-field"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Please choose a password.",
                            },
                            minlength: {
                                value: 6,
                                message: "Your password needs to be at least 6 characters long",
                            },
                            maxlength: {
                                value: 25,
                                message: "Your password needs to be 25 characters or less.",
                            },
                        })}
                    />
                </label>
                <label htmlFor="password-confirmation-field">
                    Confirm Password:
                    <input
                        type="text"
                        id="password-confirmation-field"
                        {...register("password-confirmation", {
                            required: {
                                value: true,
                                message: "Please repeat your password.",
                            },
                            minlength: {
                                value: 6,
                                message: "Your password needs to be at least 6 characters long",
                            },
                            maxlength: {
                                value: 25,
                                message: "Your password needs to be 25 characters or less.",
                            },
                        })}
                    />
                </label>
            </form>
            {/* Form submit button */}
        </>
    )
}

export default Register

{/*  */}