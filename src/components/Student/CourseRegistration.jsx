import React, { useState, useEffect } from "react";
import { useStudentStore } from "../../store/useStudentStore";

import Header from "../CourseRegistrationFolder/Header";
import SemesterNotSelected from "../CourseRegistrationFolder/SemesterNotSelected";
import CourseRegistrationForm from "../CourseRegistrationFolder/CourseRegistrationForm";


const CourseRegistration = () => {
  // Use empty strings if you want to force the user to pick both first
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");

  const { fetchCoursesOfCurrentSemester, currentSemAvailableCourses } =
    useStudentStore();

  // ✅ Fix: Only fetch if BOTH are present
  useEffect(() => {
    if (semester && branch) {
      fetchCoursesOfCurrentSemester({ semester, branch });
    }
  }, [semester, branch, fetchCoursesOfCurrentSemester]);
  // Added fetch function to dependency array for best practice (hooks linting)

  // ✅ Debugging Effect
  useEffect(() => {
    if (currentSemAvailableCourses?.length > 0) {
      console.log("Fetched Courses:", currentSemAvailableCourses);
    }
  }, [currentSemAvailableCourses]);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <Header
        semester={semester}
        setSemester={setSemester}
        branch={branch}
        setBranch={setBranch}
      />

      <main className="flex-1">
        {/* Only show form if both selections are made */}
        {semester && branch ? (
          <CourseRegistrationForm
            currentSemAvailableCourses={currentSemAvailableCourses}
          />
        ) : (
          <SemesterNotSelected />
        )}
      </main>
    </div>
  );
};

export default CourseRegistration;
