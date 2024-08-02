
import { styles } from "@/app/styles/styles";
import { useLoadUserQuery } from "@/redux/features/api/appSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
    LinkAuthenticationElement,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
    setOpen: any;
    data: any;
    user: any;
};

const CheckOutForm = ({ data, setOpen }: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<any>("");
    const [createOrder, { data: orderData, error, isLoading: createOrderLoading }] = useCreateOrderMutation();
    const [isLoading, setIsLoading] = useState(false);
    const { refetch, isUninitialized } = useLoadUserQuery(undefined, { skip: false });
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true);
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });
        if (error) {
            console.log(error, 'errorMessage')
            setMessage(error.message);
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setIsLoading(false);
            createOrder({ courseId: data._id, paymentInfo: paymentIntent });
        }
    };

    useEffect(() => {
        if (orderData) {
            if (!isUninitialized) {
                refetch().then(() => {
                    setOpen(false);
                    toast.success("Payment successful");
                    router.push(`/course-access/${data._id}`);
                });
            }

        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [orderData, error, isUninitialized])

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements || createOrderLoading} id="submit">
                <span id="button-text" className={`${styles.button} mt-2 !h-[35px]`}>
                    {(isLoading || createOrderLoading) ? "Paying..." : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && (
                <div id="payment-message" className="text-[red] font-Poppins pt-2">
                    {message}
                </div>
            )}
        </form>
    );
};

export default CheckOutForm;
