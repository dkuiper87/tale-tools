import {useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import {useForm} from "react-hook-form";
import noviUri from "../../constants/novibackend.jsx";
import axios from "axios";

function Account() {
    const { user, updateEmail } = useAuth();
    const [successMessageEmail, setSuccessMessageEmail] = useState("");
    const [successMessagePassword, setSuccessMessagePassword] = useState("");
    const [newEmail, setNewEmail] = useState(user.email);
    const { register: registerEmail, handleSubmit: handleSubmitEmail, reset: resetEmail, getValues: getEmailValues, formState: { errors: errorsEmail, isValid: isValidEmail } } = useForm({mode: `onBlur`});
    const { register: registerPassword, handleSubmit: handleSubmitPassword, reset: resetPassword,  getValues: getPasswordValues, formState: { errors: errorsPassword, isValid: isValidPassword } } = useForm({mode: `onBlur`});

    //Function that updates the user email on form submit.
    const onSubmitEmail = async (data) => {
        const token = localStorage.getItem('token');
        try {
            // Send PUT request to update email
            const response = await axios.put(noviUri + 'api/user', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            // Update email in AuthContext
            updateEmail(data.email);
            // Reset form after successful submission
            resetEmail();
            // Update local state
            setNewEmail(data.email);
            // Show success message
            setSuccessMessageEmail("Email updated successfully.");
            // Hide success message after 3 seconds
            setTimeout(() => {
                setSuccessMessageEmail("");
            }, 3000);
        } catch (error) {
            console.error('Error updating email:', error);
        }
    };

    //Function that updates the user password on form submit.
    const onSubmitPassword = async (data) => {
        try {
            const token = localStorage.getItem('token');
            // Send PUT request to update password
            const response = await axios.put(noviUri + 'api/user', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            // Reset form after successful submission
            resetPassword();
            // Show success message
            setSuccessMessagePassword("Password updated successfully.");
            // Hide success message after 3 seconds
            setTimeout(() => {
                setSuccessMessagePassword("");
            }, 3000);
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    return (
        <>
            {user ? (
                <>
                    <h1>{user.username}!</h1>
                    <h2>{newEmail}</h2>
                    {/* Form that allows the user to update their email with input validation and error handling. */}
                    <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
                        <label htmlFor="email-field">
                            E-Mail:
                            <input
                                type="text"
                                id="email-field"
                                {...registerEmail("email", {
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
                            {errorsEmail.email && <p>{errorsEmail.email.message}</p>}
                        </label>
                        <label htmlFor="email-confirmation-field">
                            Confirm E-Mail:
                            <input
                                type="text"
                                id="email-confirmation-field"
                                {...registerEmail("email-confirmation",{
                                    required: {
                                        value: true,
                                        message: "Please repeat your E-Mail.",
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter a valid E-Mail adress.",
                                    },
                                    validate: (emailMatch) => (emailMatch === getEmailValues().email) || 'Email does not match.'
                                })}
                            />
                            {errorsEmail['email-confirmation'] && <p>{errorsEmail['email-confirmation'].message}</p>}
                        </label>
                        <button
                            type="submit"
                            disabled={!isValidEmail} //check if form can be submitted
                        >
                            Update
                        </button>
                    </form>
                    {successMessageEmail && <p>{successMessageEmail}</p>}
                    {/* Form that allows the user to update their password with input validation and error handling. */}
                    <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
                        <label htmlFor="password-field">
                            Password:
                            <input
                                type="text"
                                id="password-field"
                                {...registerPassword("password", {
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
                            {errorsPassword.password && <p>{errorsPassword.password.message}</p>}
                        </label>
                        <label htmlFor="password-confirmation-field">
                            Confirm Password:
                            <input
                                type="text"
                                id="password-confirmation-field"
                                {...registerPassword("repeatedPassword", {
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
                                    validate: (passwordMatch) => (passwordMatch === getPasswordValues().password) || 'Password does not match.'
                                })}
                            />
                            {errorsPassword.repeatedPassword && <p>{errorsPassword.repeatedPassword.message}</p>}
                        </label>
                        <button
                            type="submit"
                            disabled={!isValidPassword} //check if form can be submitted
                        >
                            Submit
                        </button>
                    </form>
                    {successMessagePassword && <p>{successMessagePassword}</p>}
                </>
            ) : (
                <h1>Welcome to our website! Please log in.</h1>
            )}
        </>
    )
}

export default Account