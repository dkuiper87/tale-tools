import {useForm} from "react-hook-form";
import axios from "axios";
import noviUri from "../../constants/novibackend.jsx";
import {useNavigate} from "react-router-dom";

function Login() {
    //async function to login to backend
    const { register, getValues, handleSubmit, formState: { errors, isValid } } = useForm({mode: `onBlur`});
    const navigate = useNavigate();

    async function handleFormSubmit(data) {
        async function loginToAccount(data) {
            try {
                const result = await axios.post(noviUri + 'api/auth/signin', data);
                localStorage.setItem('token' , result.data.accessToken);
                localStorage.setItem('accountID' , result.data.id);
                return result;
            } catch (error) {
                console.error("Error logging in to account:", error);
                throw error;
            }
        }

        try {
            await loginToAccount(data);
            navigate("/account");
        } catch (error) {
            console.error("Error logging in to account:", error);
        }
    }

    return (
        <>
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