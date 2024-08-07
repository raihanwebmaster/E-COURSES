"use client";
import Heading from "@/app/utils/Heading";
import React from "react";
import { styles } from "@/app/styles/styles";

type Props = {};

const Page = (props: Props) => {

  return (
    <div>
      <Heading title="Policy - Elearning" description="Elearning is a learning management system for helping programmers." keywords="programming,mern" />
      <div>
        <div className={"w-[95%] 800px:w-[92%] m-auto py-[70px] text-black dark:text-white px-3"}>
          <h1 className={`${styles.title} font-[500] !text-start pt-2`}>
            Privacy Policy
          </h1>
          <p className="py-2 text-[16px] font-Poppins leading-8 pb-10 whitespace-pre-line text-black dark:text-white">
            One of our main priorities at the E-Courses website (ecourses.com) is the privacy of our users' information. This document contains detailed information about what information we collect from the E-Courses website and how we use it.
            <br />
            <br />
            If you have any questions or need more information about our privacy policy, please do not hesitate to contact us.
            <br />
            <br />
            This Privacy Policy applies only to our online activities and is valid for information shared by our website visitors and/or collected from the E-Courses website. This policy does not apply to any information collected offline or through channels other than this website.</p>
          <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
            <li className="text-[#37a39a] text-[20px] font-Poppins">
              Conset
            </li>
            <br />
            <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 pb-10 whitespace-pre-line">By using our website, you are hereby deemed to be agreeing to our Privacy Policy and Terms.</p>
          </ul>
          <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
            <li className="text-[#37a39a] text-[20px] font-Poppins">
              What information do we collect?
            </li>
            <br />
            <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 pb-10 whitespace-pre-line">
              When we ask you to provide your personal information on the Website, you will be made clear as to why you are being asked to provide it.
              <p className="py-2 text-[16px] font-Poppins leading-8 whitespace-pre-line">
                If you contact us directly, we may collect additional information about you such as your name, email address, phone number, content of the communication and/or any attachments or other information you send us.
              </p>
              <p className="py-2 text-[16px] font-Poppins leading-8 whitespace-pre-line">
                When you open an account on our website, you are required to provide some personal information such as your name, email address, photo, mobile number, Discord username, address, etc. In addition, we may subsequently request additional information on an as-needed basis with your permission. We do not share your information with anyone without your permission and maintain the confidentiality of information.
              </p>
            </p>
          </ul>
          <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
            <li className="text-[#37a39a] text-[20px] font-Poppins">
              Confidentiality of personal passwords

            </li>
            <br />
            <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 pb-10 whitespace-pre-line">
              The password you are asked to enter to login when opening an account on our website is encrypted and stored securely in our database. As a result, we cannot see the original content of your password. So the privacy of your password is properly protected on our website. Also, to protect the privacy of your password, please never share your password with anyone. If you think your password has been compromised by someone else, change your password from the website immediately. If you somehow fail to change the password, contact our support.
            </p>
          </ul>
          <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
            <li className="text-[#37a39a] text-[20px] font-Poppins">
              Cookies

            </li>
            <br />
            <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 pb-10 whitespace-pre-line">
              Like all other websites, the E-Courses website and browser use cookies ('cookies'). These cookies are used to store information including visitor preferences and website pages that the visitor has accessed or visited. The information is used to optimize users' experience by customizing the content of our web pages based on visitors' browser type and/or other information.
            </p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
