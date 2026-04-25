import React, { useState, useEffect } from "react";
import Header from "../CourseRegistrationFolder/Header";
import StudentInfoCard from "../CourseRegistrationFolder/StudentInfoCard";
import CurrentSemesterCard from "../CourseRegistrationFolder/CurrentSemesterCard";
import CompletedSemestersList from "../CourseRegistrationFolder/CompletedSemestersList";
import CourseRegistrationForm from "../CourseRegistrationFolder/CourseRegistrationForm";
import { useStudentStore } from "../../store/useStudentStore";

const CourseRegistration = () => {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);

  const { fetchCoursesOfCurrentSemester, currentSemAvailableCourses } =
    useStudentStore();

  // ========== DUMMY DATA FOR SIMULATION ==========
  useEffect(() => {
    // Simulate API call to fetch student data and semesters
    setTimeout(() => {
      // Mock student data
      const mockStudentData = {
        id: "STU001",
        name: "John Doe",
        email: "john.doe@university.edu",
        roll_no: "2024CS001",
        enrollment_no: "EN2024001",
        branch: "Computer Science & Engineering",
        branch_code: "CSE",
        year: "2nd Year",
        academic_year: "2024-25",
        phone: "+91 98765 43210",
        address: "University Hostel, Block A",
        father_name: "Robert Doe",
        mother_name: "Sarah Doe",
      };

      // Mock semesters data - this would come from API
      // When admin pushes a new semester, a new object is added here with is_active = true
      const mockSemesters = [
        {
          id: 1,
          semester_no: 1,
          semester_name: "I",
          batch_name: "CSE 2024 - Section A",
          academic_year: "2024-25",
          registration_status: "completed",
          registration_completed_date: "2024-08-15",
          is_active: false,
          total_credits: 24,
          courses_registered: 6,
          start_date: "2024-07-15",
          end_date: "2024-12-20",
        },
        {
          id: 2,
          semester_no: 2,
          semester_name: "II",
          batch_name: "CSE 2024 - Section A",
          academic_year: "2024-25",
          registration_status: "completed",
          registration_completed_date: "2025-01-10",
          is_active: false,
          total_credits: 22,
          courses_registered: 5,
          start_date: "2025-01-05",
          end_date: "2025-05-30",
        },
        {
          id: 3,
          semester_no: 3,
          semester_name: "III",
          batch_name: "CSE 2023 - Section A",
          academic_year: "2025-26",
          registration_status: "completed",
          registration_completed_date: "2025-08-20",
          is_active: false,
          total_credits: 24,
          courses_registered: 6,
          start_date: "2025-07-20",
          end_date: "2025-12-15",
        },
        {
          id: 4,
          semester_no: 4,
          semester_name: "IV",
          batch_name: "CSE 2023 - Section A",
          academic_year: "2025-26",
          registration_status: "pending",
          registration_completed_date: null,
          is_active: true, // This is the current active semester for registration
          total_credits: 22,
          courses_registered: 0,
          start_date: "2026-01-15",
          end_date: "2026-05-30",
        },
      ];

      setStudentData(mockStudentData);
      setSemesters(mockSemesters);
      setLoading(false);
    }, 1000);

    // ========== ACTUAL API CALL (COMMENTED) ==========
    /*
    const fetchStudentData = async () => {
      try {
        const response = await api.get('/student/profile');
        setStudentData(response.data);
        
        const semestersResponse = await api.get('/student/semesters');
        setSemesters(semestersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
    */
  }, []);

  // Fetch courses when batch is selected
  useEffect(() => {
    if (selectedBatch && studentData) {
      fetchCoursesOfCurrentSemester({
        semester: selectedBatch.semester_name,
        branch: studentData.branch_code,
      });
    }
  }, [selectedBatch, studentData, fetchCoursesOfCurrentSemester]);

  // Get current semester (where is_active is true)
  const currentSemester = semesters.find((s) => s.is_active === true);

  // Get passed semesters (completed and semester_no less than current)
  const passedSemesters = semesters
    .filter(
      (s) =>
        s.registration_status === "completed" &&
        s.semester_no < (currentSemester?.semester_no || 999),
    )
    .sort((a, b) => b.semester_no - a.semester_no);

  const handleRegisterClick = (batch) => {
    if (batch.registration_status === "pending" && batch.is_active) {
      setSelectedBatch(batch);
      setShowRegistrationForm(true);
    }
  };

  const handleBackToList = () => {
    setShowRegistrationForm(false);
    setSelectedBatch(null);
  };

  const handleRegistrationComplete = () => {
    // Update local state
    const updatedSemesters = semesters.map((s) => {
      if (s.id === currentSemester?.id) {
        return {
          ...s,
          registration_status: "completed",
          registration_completed_date: new Date().toISOString().split("T")[0],
          is_active: false,
          courses_registered: s.total_credits, // Assuming all credits registered
        };
      }
      return s;
    });

    setSemesters(updatedSemesters);
    setShowRegistrationForm(false);
    setSelectedBatch(null);

    // ========== ACTUAL API CALL (COMMENTED) ==========
    /*
    const submitRegistration = async () => {
      try {
        await api.post('/student/register-courses', {
          semester_id: currentSemester.id,
          selected_courses: selectedCourses
        });
        toast.success("Course registration completed successfully!");
      } catch (error) {
        console.error('Registration failed:', error);
        toast.error("Registration failed. Please try again.");
      }
    };
    submitRegistration();
    */

    
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">
            Loading your data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Header />

      <main className="flex-1">
        {!showRegistrationForm ? (
          <div className="space-y-6">
            {/* Student Information Card */}
            <StudentInfoCard studentData={studentData} />

            {/* Current Active Semester - Displayed First */}
            {currentSemester && (
              <CurrentSemesterCard
                semester={currentSemester}
                branchCode={studentData.branch_code}
                onRegister={handleRegisterClick}
              />
            )}

            {/* Completed Semesters Section - Displayed Below Current Semester */}
            {passedSemesters.length > 0 && (
              <CompletedSemestersList semesters={passedSemesters} />
            )}
          </div>
        ) : (
          <CourseRegistrationForm
            currentSemAvailableCourses={currentSemAvailableCourses}
            batchDetails={selectedBatch}
            onRegistrationComplete={handleRegistrationComplete}
            onBack={handleBackToList}
          />
        )}
      </main>
    </div>
  );
};

export default CourseRegistration;
