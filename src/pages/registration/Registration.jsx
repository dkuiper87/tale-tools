import {useForm} from "react-hook-form";
import axios from "axios";
import noviUri from "../../constants/novibackend.jsx";
import {useNavigate} from "react-router-dom";
import './Registration.css'
import Logo from "../../assets/Logo.jsx";

function Register() {
    const { register, getValues, handleSubmit, formState: { errors, isValid } } = useForm({mode: `onBlur`});
    const navigate = useNavigate();

    //Function to handle the form submit.
    const handleFormSubmit = async(data) => {
        //Add user role to the data.
        const updatedData = {
            ...data,
            role: ["user"]
        };

        //Function to create the account.
        try {
            const result = await axios.post(noviUri + 'api/auth/signup', updatedData);
            navigate("/login");
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    };

    return (
        <>
            {/* Registration form with input validation and error handling. */}
            <div class={'registration-form'}>
                <div className="flex-box justify-center">
                    <Logo
                        logoWidth="10em"
                        logoHight="10em"
                    />
                </div>
                <h1>SIGN UP</h1>
                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className={'flex-col'}
                >
                    <label
                        htmlFor="username-field"
                        className="flex-col"
                    >
                        User Name
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
                        {errors.username && <p className="error-text">{errors.username.message}</p>}
                    </label>
                    <label
                        htmlFor="email-field"
                        className="flex-col"
                    >
                        E-Mail
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
                        {errors.email && <p className="error-text">{errors.email.message}</p>}
                    </label>
                    <label
                        htmlFor="email-confirmation-field"
                        className="flex-col"
                    >
                        Confirm E-Mail
                        <input
                            type="text"
                            id="email-confirmation-field"
                            {...register("email-confirmation", {
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
                        {errors['email-confirmation'] && <p className="error-text">{errors['email-confirmation'].message}</p>}
                    </label>
                    <label
                        htmlFor="password-field"
                        className="flex-col"
                    >
                        Password
                        <input
                            type="password"
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
                        {errors.password && <p className="error-text">{errors.password.message}</p>}
                    </label>
                    <label
                        htmlFor="password-confirmation-field"
                        className="flex-col"
                    >
                        Confirm Password
                        <input
                            type="password"
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
                        {errors['password-confirmation'] && <p className="error-text">{errors['password-confirmation'].message}</p>}
                    </label>
                    <button
                        type="submit"
                        disabled={!isValid} //check if form can be submitted
                        className="align-end"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default Register

