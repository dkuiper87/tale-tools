import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.jsx";
import './Login.css';
import Logo from "../../assets/Logo.jsx";

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
            <div class={'login-form'}>
                <div className="flex-box justify-center">
                    <Logo
                        logoWidth="10em"
                        logoHight="10em"
                    />
                </div>
                <h1>LOG IN</h1>
                {/* Login form with input validation and error handling. */}
                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="flex-col"
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
                        {errors.username && <p className="error-text">{errors.username.message}</p>}
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
                        {errors.password &&<p className="error-text">{errors.password.message}</p>}
                    </label>
                    <div className="flex-col justify-end">
                        <button
                            type="login"
                            disabled={!isValid} //check if form can be submitted
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login