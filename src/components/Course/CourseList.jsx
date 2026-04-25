import React, { useMemo } from "react";
import GenericFilter from "../../ui/GenericFilter";
import CourseCard from "../../ui/CourseCard";

const CourseList = ({ courses, onEdit, onDelete }) => {
  // Dynamically get unique branches from courses
  const uniqueBranches = useMemo(() => {
    const branches = [
      ...new Set(courses.map((course) => course.department).filter(Boolean)),
    ];
    return branches.sort().map((branch) => ({
      label: branch,
      value: branch,
    }));
  }, [courses]);

  // Dynamically get unique course types
  const uniqueCourseTypes = useMemo(() => {
    const types = [
      ...new Set(courses.map((course) => course.type).filter(Boolean)),
    ];
    return types.sort();
  }, [courses]);

  // Dynamically get unique course natures
  const uniqueCourseNatures = useMemo(() => {
    const natures = [
      ...new Set(courses.map((course) => course.nature).filter(Boolean)),
    ];
    return natures.sort();
  }, [courses]);

  // Dynamically get unique semesters
  const uniqueSemesters = useMemo(() => {
    const semesters = [
      ...new Set(courses.map((course) => course.semester).filter(Boolean)),
    ];
    return semesters.sort((a, b) => a - b);
  }, [courses]);

  // Dynamically get unique departments (same as branches)
  const uniqueDepartments = useMemo(() => {
    const depts = [
      ...new Set(courses.map((course) => course.department).filter(Boolean)),
    ];
    return depts.sort();
  }, [courses]);

  // If no courses, return empty filter with no options
  if (courses.length === 0) {
    return (
      <GenericFilter
        items={courses}
        filterConfig={[]}
        searchFields={["courseCode", "courseName"]}
        quickFilters={[]}
        renderItem={(course) => (
          <CourseCard course={course} onEdit={onEdit} onDelete={onDelete} />
        )}
        title="Courses"
        searchPlaceholder="Search by course code or name..."
        emptyMessage="No courses found."
      />
    );
  }

  return (
    <GenericFilter
      items={courses}
      filterConfig={[
        {
          key: "type",
          label: "Course Type",
          type: "button",
          options: uniqueCourseTypes,
        },
        {
          key: "nature",
          label: "Course Nature",
          type: "button",
          options: uniqueCourseNatures,
        },
        {
          key: "semester",
          label: "Semester",
          type: "button",
          options: uniqueSemesters,
        },
        {
          key: "department",
          label: "Department",
          type: "select",
          options: uniqueDepartments,
        },
      ]}
      searchFields={["courseCode", "courseName"]}
      quickFilters={uniqueBranches}
      quickFilterKey="department"
      renderItem={(course) => (
        <CourseCard course={course} onEdit={onEdit} onDelete={onDelete} />
      )}
      title="Courses"
      searchPlaceholder="Search by course code or name..."
      emptyMessage="No courses found matching your criteria."
    />
  );
};

export default CourseList;
