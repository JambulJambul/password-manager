import classes from './style.module.scss';
import { callJSONServerAPI } from '../../domain/api';
import { useForm } from 'react-hook-form';
import Navbar from '../../components/Navbar';


const CreateAccountPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        try {
            console.log(data, "ADA")
            callJSONServerAPI("/password", "POST", {}, {}, data)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <Navbar />
            <div className={classes.container}>
                <h2>
                    Create Account
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="provider">Provider: </label><br />
                    <input type='text' name='provideFr' {...register("provider", { required: true })} /><br />
                    {errors.provider && errors.provider.type === "required" && (
                        <p>Provider is required</p>
                    )}
                    <label htmlFor="email">Email: </label><br />
                    <input
                        type='email'
                        name='email'
                        {...register("email", {
                            required: true,
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                        })}
                    />
                    {errors.email && errors.email.type === "required" && (
                        <p>Email is required</p>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                        <p>Invalid email format</p>
                    )}
                    <br />
                    <label htmlFor="password">Password: </label><br />
                    <input
                        type='password'
                        name='password'
                        {...register("password", { required: true, minLength: 6 })}
                    />
                    {errors.password && errors.password.type === "required" && (
                        <p>Password is required</p>
                    )}
                    {errors.password && errors.password.type === "minLength" && (
                        <p>Password must have at least 6 characters</p>
                    )}
                    <br />

                    <label htmlFor="category">Category: </label><br />
                    <select name='category' {...register("category")}>
                        <option value="Work">Work</option>
                        <option value="Family">Family</option>
                        <option value="Personal">Personal</option>
                    </select>
                    <br />

                    <input type="submit" />
                </form>
            </div>
        </>
    );
}

export default CreateAccountPage;
