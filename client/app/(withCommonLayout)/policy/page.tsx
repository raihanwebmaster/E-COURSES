"use client";
import Heading from "@/app/utils/Heading";
import React from "react";
import Policy from "./Policy";

type Props = {};

const Page = (props: Props) => {

  return (
    <div>
      <Heading title="Policy - Elearning" description="Elearning is a learning management system for helping programmers." keywords="programming,mern"/>
      <Policy />
    </div>
  );
};

export default Page;
