'use client'
import { useGetCourseWithOutPurchaseQuery } from '@/redux/features/courses/coursesApi'
import CourseDetails from '../../../components/Course/CourseDetails'
import React, { useEffect } from 'react'
import Heading from '@/app/utils/Heading'
import { useCreatePaymentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/orders/ordersApi'
import { loadStripe } from '@stripe/stripe-js'
import Loader from '@/app/components/Loader/Loader'
import { useSelector } from 'react-redux'

type Props = {}

const Page = ({ params }: any) => {
  const { data, isLoading } = useGetCourseWithOutPurchaseQuery(params.id)
  const { data: config } = useGetStripePublishableKeyQuery({})
  const [stripePromise, setStripePromise] = React.useState<any>(null)
  const [clientSecret, setClientSecret] = React.useState<string | null>("")
  const [createPayment, { data: paymentInterData }] = useCreatePaymentMutation()
  const { user } = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (config) {
      const publishableKey = config?.data
      setStripePromise(loadStripe(publishableKey))
    }
    if (data?.data && !isLoading && user) {
      const amount = Math.round(data?.data?.price * 100)
      createPayment({
        amount,
      })
    }
  }, [config, data, user])
  useEffect(() => {
    if (paymentInterData) {
      setClientSecret(paymentInterData?.data?.clientSecret)
    }
  }, [paymentInterData])
  return (
    <div>
      <Heading title={`${data?.data?.name} - E-Courses`} description="E-Courses is a platform for students to lear and get help from teachers" keywords={data?.data?.tags} />
 
      {
        isLoading ? (
          <Loader/>
        ) : (
          stripePromise && (
            <CourseDetails id={params.id} course={data?.data}  stripePromise={stripePromise} clientSecret={clientSecret} />
          )
        )
      }
    </div>
  )
}

export default Page