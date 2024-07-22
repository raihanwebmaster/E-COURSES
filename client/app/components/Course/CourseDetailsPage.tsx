/** @format */

"use client";
import React, { FC } from "react";
import Loader from "../Loader/Loader";

type Props = {
  id: string;
  course: any;
  isLoading: boolean;
};

const CourseDetailsPage: FC<Props> = ({ id, course, isLoading }) => {
  const [route, setRoute] = React.useState("Login");
  const [open, setOpen] = React.useState(false);

  return isLoading ? <Loader /> : <>Course Details Page</>;
};

export default CourseDetailsPage;
