// src/components/CoursePage.tsx

import { useState } from "react";
import { Reviews } from "./Reviews"; // Assuming you'll create this component
import { useParams } from "react-router-dom";
import { CourseInfo } from "./CourseInfo";
import { useTranslation } from "react-i18next";
import HandelError from "@/components/HandelError";
import {
  useActiveCourseMutation,
  useGetCourseByIdQuery,
} from "@/app/features/Courses/CoursesApi";
import { Pencil, Trash2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ActiveSwitch from "@/components/ActiveSwitch";
import { cookieService } from "@/Cookies/CookiesServices";

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState<"info" | "reviews">("info");
  const token = cookieService.get("auth_token") || "";
  const path = useParams();
  const { id } = path;
  const { data, isLoading, isError } = useGetCourseByIdQuery(Number(id), {
    refetchOnMountOrArgChange: true,
  });
  const [activeCourse, { isLoading: isLaodingActive }] =
    useActiveCourseMutation();
  console.log(data?.course.is_active);
  const { t } = useTranslation("translation");
  if (isLoading || isLaodingActive) {
    return (
      <div className="bg-white p-6 rounded-2xl animate-pulse space-y-4">
        {/* Header skeleton */}
        <div className="h-6 bg-gray-200 mx-6 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 mx-6  rounded w-1/2"></div>

        <div className="flex justify-center my-4">
          <div className=" rounded-lg overflow-hidden sm:w-[100%] lg:flex">
            {/* Left Section Skeleton */}
            <div className="lg:w-1/2 p-6 space-y-4">
              <div className="w-full h-56 bg-gray-200 rounded-md"></div>

              <div className="flex gap-4">
                <div className="h-6 w-32 bg-gray-200 rounded"></div>
                <div className="h-6 w-36 bg-gray-200 rounded"></div>
              </div>

              <div className="space-y-2 mt-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>

            {/* Right Section Skeleton */}
            <div className="lg:w-1/2 sm:border border-gray-200 p-8 m-6 rounded-2xl space-y-4">
              <div className="h-5 bg-gray-300 rounded w-1/3"></div>

              <ul className="space-y-2">
                <li className="h-4 bg-gray-200 rounded w-4/5"></li>
                <li className="h-4 bg-gray-200 rounded w-3/4"></li>
                <li className="h-4 bg-gray-200 rounded w-2/3"></li>
              </ul>

              <div className="h-5 bg-gray-300 rounded w-1/3 mt-4"></div>
              <ul className="space-y-2">
                <li className="h-4 bg-gray-200 rounded w-1/2"></li>
                <li className="h-4 bg-gray-200 rounded w-3/4"></li>
              </ul>

              <div className="h-5 bg-gray-300 rounded w-1/3 mt-4"></div>
              <ul className="space-y-2">
                <li className="h-4 bg-gray-200 rounded w-3/5"></li>
              </ul>

              <div className="h-10 bg-gray-300 rounded w-full mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isError) {
    return <HandelError />;
  }

  return (
    <div className="bg-white rounded-2xl container mx-auto p-6">
      <div className="mx-6">
        <h1 className="text-lg sm:text-2xl text-neutral-800 font-semibold">
          {data?.course.name}
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 font-medium">
          {data?.course.summary}
        </p>
      </div>
      <div className="flex justify-center my-4">
        {/* Main content area */}
        <div className=" rounded-lg overflow-hidden  sm:w-[100%] lg:flex">
          {/* Left Section (Image and Course Description) */}
          <div className="lg:w-1/2 p-6">
            <img
              loading="lazy"
              src={data?.course.image} // Replace with your actual image path
              alt="Boy learning web development"
              className="w-full h-auto object-cover rounded-md mb-2"
            />

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  title="معلومات الكورس"
                  onClick={() => setActiveTab("info")}
                  className={`${
                    activeTab === "info"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-xs sm:text-sm`}
                >
                  {t("Courses.Course_info")}
                </button>
                <button
                  title="التعليقات والأراء"
                  onClick={() => setActiveTab("reviews")}
                  className={`${
                    activeTab === "reviews"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-xs sm:text-sm`}
                >
                  {t("Courses.comments")}({data?.course.comments.length})
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === "info" ? (
                <CourseInfo description={data?.course.description} />
              ) : (
                <Reviews
                  comments={data?.course.comments}
                  course_id={data?.course.id}
                />
              )}
            </div>
          </div>

          {/* Right Section (What You'll Learn, Material Includes, Requirements) */}
          <div className="lg:w-1/2 sm:border border-gray-200 p-0 sm:p-8 m-6 rounded-2xl">
            <h3 className="text-sm md:text-base  font-semibold text-text mb-4">
              {t("Courses.what_we_learn")}
            </h3>
            <ul className="list-disc list-inside text-paragraph text-sm md:text-base space-y-2 mb-6">
              <li>{data?.course.contents}</li>
            </ul>

            <h3 className="text-sm md:text-base  font-semibold text-text mb-4">
              {t("Courses.content_course")}
            </h3>
            <ul className="list-disc list-inside text-paragraph text-sm md:text-base space-y-2 mb-6">
              <li>{data?.course.hours} ساعة.</li>
              {data?.course.material && <li>{data?.course.material}</li>}
            </ul>

            <h3 className="text-sm md:text-base  font-semibold text-text mb-4">
              {t("Courses.requairment")}
            </h3>
            <ul className="list-disc list-inside text-paragraph text-sm md:text-base space-y-2 mb-6">
              <li>{data?.course.requirements}</li>
            </ul>
            <div className="flex items-center gap-6 justify-between">
              <div className="flex-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="active-course">تفعيل الدورة</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ActiveSwitch
                        isActive={data?.course.is_active}
                        onToggle={(newState) => {
                          console.log("الحالة الجديدة:", newState ? 1 : 0);
                          activeCourse({ course_id: data?.course.id, token });
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      تفعيل الكورس ليظهر للمستخدمين
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className="flex items-center flex-2 gap-6 justify-between">
                <button
                  title="تعديل كورس"
                  className="w-full bg-neutral-300 text-sm md:text-base text-neutral-700 py-3  rounded-md flex items-center mx-auto gap-4 justify-center hover:bg-neutral-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
                >
                  <Pencil className="w-4 h-4 " />
                </button>
                <button
                  title="حذف كورس"
                  className="w-full border border-red-500 text-sm md:text-base text-red-500 py-3 rounded-md flex items-center mx-auto gap-4 justify-center hover:bg-red-200/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
                >
                  <Trash2 className="w-4 h-4 " />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
