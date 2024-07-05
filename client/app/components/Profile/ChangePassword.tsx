
import { styles } from "@/app/styles/styles";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import * as Yup from 'yup'
type Props = {};

const schema = Yup.object().shape({
    oldPassword: Yup.string().required("Please enter your old password!"),
    newPassword: Yup.string()
        .required("Please enter your new password!")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
            "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*()_+)"
        ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Please confirm your password!')
});


const ChangePassword: FC<Props> = (props) => {
    const [changePassword, { isSuccess, error, isLoading }] = useChangePasswordMutation();
    const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            await changePassword({ oldPassword: values.oldPassword, newPassword: values.newPassword });
        }
    })


    useEffect(() => {
        if (isSuccess) {
            toast.success("Password changed successfully");
            formik.resetForm();
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error]);

    const { errors, touched, values, handleChange, handleSubmit } = formik

    const toggleShowPassword = (field: string) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
            <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2">
                Change Password
            </h1>
            <div className="w-full">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center"
                >
                    <div className='w-[100%] 800px:w-[60%] relative mt-5'>
                        <label className={`${styles.label}`} htmlFor="oldPassword">
                            Enter your old password
                        </label>
                        <input
                            type={!showPasswords.oldPassword ? "password" : "text"}
                            name="oldPassword"
                            value={values.oldPassword}
                            onChange={handleChange}
                            id="oldPassword"
                            placeholder="Old password"
                            className={`${errors.oldPassword && touched.oldPassword && "border-red-500"
                                } ${styles.input}`}
                        />
                        {!showPasswords.oldPassword ? (
                            <AiOutlineEyeInvisible
                                className={`absolute right-2 z-1 cursor-pointer ${errors.oldPassword && touched.oldPassword ? "bottom-10" : "bottom-3"}`}
                                size={20}
                                onClick={() => toggleShowPassword('oldPassword')}
                            />
                        ) : (
                            <AiOutlineEye
                                className={`absolute right-2 z-1 cursor-pointer ${errors.oldPassword && touched.oldPassword ? "bottom-10" : "bottom-3"}`}
                                size={20}
                                onClick={() => toggleShowPassword('oldPassword')}
                            />
                        )}
                        {errors.oldPassword && touched.oldPassword && (
                            <span className="text-red-500 pt-2 block">{errors.oldPassword}</span>
                        )}
                    </div>
                    <div className='w-[100%] 800px:w-[60%] relative mt-5'>
                        <label className={`${styles.label}`} htmlFor="newPassword">
                            Enter your new password
                        </label>
                        <input
                            type={!showPasswords.newPassword ? "password" : "text"}
                            name="newPassword"
                            value={values.newPassword}
                            onChange={handleChange}
                            id="newPassword"
                            placeholder="New password"
                            className={`${errors.newPassword && touched.newPassword && "border-red-500"
                                } ${styles.input}`}
                        />
                        {!showPasswords.newPassword ? (
                            <AiOutlineEyeInvisible
                                className={`absolute right-2 z-1 cursor-pointer ${errors.newPassword && touched.newPassword ? "bottom-10" : "bottom-3"}`}
                                size={20}
                                onClick={() => toggleShowPassword('newPassword')}
                            />
                        ) : (
                            <AiOutlineEye
                                className={`absolute right-2 z-1 cursor-pointer ${errors.newPassword && touched.newPassword ? "bottom-10" : "bottom-3"}`}
                                size={20}
                                onClick={() => toggleShowPassword('newPassword')}
                            />
                        )}
                        {errors.newPassword && touched.newPassword && (
                            <span className="text-red-500 pt-2 block">{errors.newPassword}</span>
                        )}
                    </div>
                    <div className='w-[100%] 800px:w-[60%] relative mt-5'>
                        <label className={`${styles.label}`} htmlFor="confirmPassword">
                            Confirm your new password
                        </label>
                        <input
                            type={!showPasswords.confirmPassword ? "password" : "text"}
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            id="confirmPassword"
                            placeholder="Confirm new password"
                            className={`${errors.confirmPassword && touched.confirmPassword && "border-red-500"
                                } ${styles.input}`}
                        />
                        {!showPasswords.confirmPassword ? (
                            <AiOutlineEyeInvisible
                                className={`absolute right-2 z-1 cursor-pointer ${errors.confirmPassword && touched.confirmPassword ? "bottom-10" : "bottom-3"}`}
                                size={20}
                                onClick={() => toggleShowPassword('confirmPassword')}
                            />
                        ) : (
                            <AiOutlineEye
                                className={`absolute right-2 z-1 cursor-pointer ${errors.confirmPassword && touched.confirmPassword ? "bottom-10" : "bottom-3"}`}
                                size={20}
                                onClick={() => toggleShowPassword('confirmPassword')}
                            />
                        )}
                        {errors.confirmPassword && touched.confirmPassword && (
                            <span className="text-red-500 pt-2 block">{errors.confirmPassword}</span>
                        )}
                    </div>
                    <div className="w-[100%] 800px:w-[60%] mt-5">
                        <button type="submit" className={`w-[100%] h-[40px] border border-[#37a39a] text-center text-black dark:text-[#fff] rounded-[3px] mt-8  ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                        {isLoading ? (
                            <ImSpinner2 className="animate-spin text-white m-auto" size={24} />
                        ) : (
                            'Sign Up'
                        )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
