import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";

function Login() {
    const { register, getValues, handleSubmit, formState: { errors, isValid } } = useForm({mode: `onBlur`});
    const navigate = useNavigate();
    const { login } = useAuth();

    //Function to hande the form submit
    async function handleFormSubmit(data) {
        try {
            const result = await login(data); // Call the login function provided by the context
            localStorage.setItem('token', result.data.accessToken);
            navigate("/account");
        } catch (error) {
            console.error("Error logging in to account:", error);
        }
    }


    return (
        <>
            {/* Login form with input validation and error handling. */}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <label htmlFor="username-field">
                    User Name:
                    <input
                        type="text"
                        id="username-field"
                        {...register("username", {
                            required: {
                                value: true,
                                message: "Please fill in your username.",
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
                <label htmlFor="password-field">
                    Password:
                    <input
                        type="text"
                        id="password-field"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Please fill in your password.",
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
                <button
                    type="login"
                    disabled={!isValid} //check if form can be submitted
                >
                    Log In
                </button>
            </form>
        </>
    )
}

export default Login