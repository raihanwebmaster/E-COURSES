"use client"
import React, { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { styles } from '../../../app/styles/styles'
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useTheme } from 'next-themes'
import { useRegisterMutation } from '@/redux/features/auth/authApi'
import toast from 'react-hot-toast'
import { ImSpinner2 } from 'react-icons/im'
import { signIn } from 'next-auth/react'

type Props = {
    setRoute: (route: string) => void
}

const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name!"),
    email: Yup.string().email("Invalid email!").required("Please enter your email!"),
    password: Yup.string()
        .required("Please enter your password!")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
            "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*()_+)"
        )

})

const SignUp: FC<Props> = ({ setRoute }) => {
    const [show, setShow] = useState(false)
    const [register, { data, error, isSuccess, isLoading }] = useRegisterMutation()
    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "Registration successful!"
            toast.success(message);
            setRoute('Verification')
        }
        if (error) {
            if ('data' in error) {
                const errorData = error as any;
                toast.error(errorData.data.message)
            }
        }
    }, [error, isSuccess, data, setRoute])

    const { resolvedTheme } = useTheme()
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            await register(values)
        }
    })
    const { errors, touched, values, handleChange, handleSubmit } = formik
    return (
        <div className='w-full mt-2'>
            <h1 className={`${styles.title}`}>
                Join to ECourses
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='w-full mt-5  mb-1'>
                    <label className={`${styles.label}`} htmlFor='name' >
                        Enter your name
                    </label>
                    <input
                        type='name'
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        id='name'
                        placeholder='login@mail.com'
                        className={`
                    ${errors.name && touched.name && "border-red-500"}
                    ${styles.input}`}
                    />
                    {errors.name && touched.name && <span className="text-red-500 pt-2 block">{errors.name}</span>}
                </div>
                <div className='w-full mt-5 mb-1'>
                    <label className={`${styles.label}`} htmlFor='email' >
                        Enter your email
                    </label>
                    <input
                        type='email'
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        id='email'
                        placeholder='login@mail.com'
                        className={`
                    ${errors.email && touched.email && "border-red-500"}
                    ${styles.input}`}
                    />
                    {errors.email && touched.email && <span className="text-red-500 pt-2 block">{errors.email}</span>}
                </div>
                <div className='w-full mt-5 relative mb-1'>
                    <label className={`${styles.label}`} htmlFor="email">
                        Enter your password
                    </label>
                    <input
                        type={!show ? "password" : "text"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        id="password"
                        placeholder="password!@%"
                        className={`${errors.password && touched.password && "border-red-500"
                            } ${styles.input}`}
                    />
                    {!show ? (
                        <AiOutlineEyeInvisible
                            className={`absolute right-2 z-1 cursor-pointer ${errors.password && touched.password ? "bottom-10" : "bottom-3"}  dark:text-white text-black`}
                            size={20}
                            onClick={() => setShow(true)}
                        />
                    ) : (
                        <AiOutlineEye
                            className={`absolute right-2 z-1 cursor-pointer ${errors.password && touched.password ? "bottom-10" : "bottom-3"}  dark:text-white text-black`}
                            size={20}
                            onClick={() => setShow(false)}
                        />
                    )}
                    {errors.password && touched.password && (
                        <span className="text-red-500 pt-2 block">{errors.password}</span>
                    )}
                </div>
                <div className='w-full mt-5'>
                    <button type="submit" className={`${styles.button} ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={isLoading}>
                        {isLoading ? (
                            <ImSpinner2 className="animate-spin text-white" size={24} />
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </div>
            </form>
            <br />
            <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                Or join with
            </h5>
            <div className="flex items-center justify-center my-3">
                <FcGoogle size={30} className="cursor-pointer mr-2"
                onClick={() => signIn("google")}
                />
                <AiFillGithub size={30} style={{ color: resolvedTheme === 'dark' ? 'white' : 'black' }} className="cursor-pointer ml-2"
                 onClick={() => signIn("github")} 
                />
            </div>
            <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                Already have an account?{" "}
                <span
                    className="text-[#2190ff] pl-1 cursor-pointer"
                    onClick={() => setRoute("Login")}
                >
                    Sign in
                </span>
            </h5>
            <br />
        </div>
    )
}

export default SignUp