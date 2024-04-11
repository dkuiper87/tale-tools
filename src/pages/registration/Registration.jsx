import {useForm} from "react-hook-form";
import axios from "axios";
import noviUri from "../../constants/novibackend.jsx";
import {useNavigate} from "react-router-dom";

function Register() {
    const { register, getValues, handleSubmit, formState: { errors, isValid } } = useForm({mode: `onBlur`});
    const navigate = useNavigate();

    {/* Function to handle the form submit */}
    async function handleFormSubmit(data) {

        {/* Add user role to the data */}
        const updatedData = {
            ...data,
            role: ["user"]
        }

        async function createAccount(data) {
            try {
                const result = await axios.post(noviUri + 'api/auth/signup', data);
                //console.log(result);
                return result;
            } catch (error) {
                console.error("Error creating account:", error);
                throw error;
            }
        }

        try {
            await createAccount(updatedData);
            navigate("/login");
        } catch (error) {
            console.error("Error creating account:", error);
        }


    }

    return (
        <>
            {/* Add form here */}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                            minLength: {
                                value: 6,
                                message: "Your username needs to be at least 6 characters.",
                            },
                            maxLength: {
                                value: 25,
                                message: "Your username needs to be 25 characters or less.",
                            },
                        })}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
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
                    {errors.email && <p>{errors.email.message}</p>}
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
                    {errors['email-confirmation'] && <p>{errors['email-confirmation'].message}</p>}
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
                            minLength: {
                                value: 6,
                                message: "Your password needs to be at least 6 characters long",
                            },
                            maxLength: {
                                value: 25,
                                message: "Your password needs to be 25 characters or less.",
                            },
                        })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
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
                            minLength: {
                                value: 6,
                                message: "Your password needs to be at least 6 characters long",
                            },
                            maxLength: {
                                value: 25,
                                message: "Your password needs to be 25 characters or less.",
                            },
                            validate: (passwordMatch) => (passwordMatch === getValues().password) || 'Password does not match.'
                        })}
                    />
                    {errors['password-confirmation'] && <p>{errors['password-confirmation'].message}</p>}
                </label>
                <button
                    type="submit"
                    disabled={!isValid} //check if form can be submitted
                >
                    Submit
                </button>
            </form>

        </>
    )
}

export default Register

