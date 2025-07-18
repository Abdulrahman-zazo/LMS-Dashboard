// src/components/CoursePage.tsx

import { useState } from "react";
import { Reviews } from "./Reviews"; // Assuming you'll create this component
import { useNavigate, useParams } from "react-router-dom";
import { CourseInfo } from "./CourseInfo";
import { useTranslation } from "react-i18next";
import HandelError from "@/components/HandelError";
import {
  useActiveCourseMutation,
  useGetCourseByIdQuery,
} from "@/app/features/Courses/CoursesApi";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ActiveSwitch from "@/components/ActiveSwitch";
import { cookieService } from "@/Cookies/CookiesServices";
import { useCourseActions } from "../Hooks/useCourseActions ";
import type { Course } from "@/types";
import { CourseDialog, DeleteDialog } from "../CourseModel";
import { Button } from "@/components/ui/button";

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState<"info" | "reviews">("reviews");
  const token = cookieService.get("auth_token") || "";

  const path = useParams();
  const { id } = path;
  const { data, isLoading, isError } = useGetCourseByIdQuery({
    token: String(token),
    course_id: Number(id),
  });

  const [activeCourse, { isLoading: isLaodingActive }] =
    useActiveCourseMutation();
  const Navigate = useNavigate();
  const { handleUpdate, handleDelete } = useCourseActions(token);
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [currentCourse, setCurrentCourse] =
    useState<Partial<Course | undefined>>();

  const { t } = useTranslation("translation");
  if (isLoading || isLaodingActive) {
    return (
      <div className="bg-white p-6 rounded-2xl animate-pulse space-y-4">
        {/* Header skeleton */}
        <div className="h-6 bg-neutral-200 mx-6 rounded w-1/3"></div>
        <div className="h-4 bg-neutral-200 mx-6  rounded w-1/2"></div>

        <div className="flex justify-center my-4">
          <div className=" rounded-lg overflow-hidden sm:w-[100%] lg:flex">
            {/* Left Section Skeleton */}
            <div className="lg:w-1/2 p-6 space-y-4">
              <div className="w-full h-56 bg-neutral-200 rounded-md"></div>

              <div className="flex gap-4">
                <div className="h-6 w-32 bg-neutral-200 rounded"></div>
                <div className="h-6 w-36 bg-neutral-200 rounded"></div>
              </div>

              <div className="space-y-2 mt-4">
                <div className="h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-4 bg-neutral-200 rounded w-4/5"></div>
                <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
              </div>
            </div>

            {/* Right Section Skeleton */}
            <div className="lg:w-1/2 sm:border border-neutral-200 p-8 m-6 rounded-2xl space-y-4">
              <div className="h-5 bg-neutral-300 rounded w-1/3"></div>

              <ul className="space-y-2">
                <li className="h-4 bg-neutral-200 rounded w-4/5"></li>
                <li className="h-4 bg-neutral-200 rounded w-3/4"></li>
                <li className="h-4 bg-neutral-200 rounded w-2/3"></li>
              </ul>

              <div className="h-5 bg-neutral-300 rounded w-1/3 mt-4"></div>
              <ul className="space-y-2">
                <li className="h-4 bg-neutral-200 rounded w-1/2"></li>
                <li className="h-4 bg-neutral-200 rounded w-3/4"></li>
              </ul>

              <div className="h-5 bg-neutral-300 rounded w-1/3 mt-4"></div>
              <ul className="space-y-2">
                <li className="h-4 bg-neutral-200 rounded w-3/5"></li>
              </ul>

              <div className="h-10 bg-neutral-300 rounded w-full mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isError) {
    return <HandelError />;
  }

  const onEditClick = () => {
    setCurrentCourse(data?.Course);
    setOpen(true);
  };

  const onDeleteClick = () => {
    setCurrentCourse(data?.Course);
    setOpenDeleteDialog(true);
  };
  return (
    <div className="bg-white rounded-2xl container mx-auto p-6">
      <div className="mx-6 flex  items-start justify-between gap-12">
        <div>
          <h1 className="text-lg sm:text-xl text-neutral-800 mb-2 font-semibold">
            {data?.Course.name}
          </h1>
          <p className="text-sm sm:text-sm text-neutral-500 font-medium">
            {data?.Course.summary}
          </p>
        </div>
        <Button
          variant={"default"}
          className="hidden sm:flex"
          onClick={() => {
            Navigate("/courses");
          }}
        >
          العودة للدورات
          <span>
            <ArrowLeft />
          </span>
        </Button>
      </div>
      <div className="flex justify-center my-4">
        <div className=" rounded-lg overflow-hidden  sm:w-[100%] lg:flex">
          <div className="lg:w-1/2 p-6">
            <img
              loading="lazy"
              src={data?.Course.image}
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
                      : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
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
                      : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-xs sm:text-sm`}
                >
                  {t("Courses.comments")}({data?.Course.comments.length})
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === "info" ? (
                <CourseInfo description={data?.Course.description} />
              ) : (
                <Reviews
                  comments={data?.Course.comments}
                  course_id={data?.Course.id}
                />
              )}
            </div>
          </div>

          {/* Right Section (What You'll Learn, Material Includes, Requirements) */}
          <div className="lg:w-1/2 sm:border border-gray-200 p-0 sm:p-8 m-6 rounded-2xl">
            <h3 className="text-sm   font-semibold text-primary mb-4">
              {t("Courses.what_we_learn")}
            </h3>
            <ul className="list-disc list-inside text-neutral-800 text-sm  space-y-2 mb-6">
              <li>{data?.Course.contents}</li>
            </ul>

            <h3 className="text-sm   font-semibold text-primary mb-4">
              {t("Courses.content_course")}
            </h3>
            <ul className="list-disc list-inside text-neutral-800 text-sm  space-y-2 mb-6">
              <li>{data?.Course.hours} ساعة.</li>
              {data?.Course.material && <li>{data?.Course.material}</li>}
            </ul>

            <h3 className="text-sm   font-semibold text-primary mb-4">
              {t("Courses.requairment")}
            </h3>
            <ul className="list-disc list-inside text-neutral-800 text-sm  space-y-2 mb-6">
              <li>{data?.Course.requirements}</li>
            </ul>
            <div className="flex items-center gap-6 justify-between">
              <div className="flex-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="active-course" className="text-sm">
                    تفعيل الدورة
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ActiveSwitch
                        isActive={data?.Course.is_active}
                        onToggle={() => {
                          activeCourse({ course_id: data?.Course.id, token });
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      تفعيل الكورس ليظهر للمستخدمين
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className="flex items-center flex-2 gap-4 justify-between">
                <button
                  onClick={onEditClick}
                  title="تعديل كورس"
                  className="w-full bg-neutral-300 text-sm md:text-base text-neutral-700 py-3  rounded-md flex items-center mx-auto gap-4 justify-center hover:bg-neutral-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
                >
                  <Pencil className="w-4 h-4 " />
                </button>
                <button
                  title="حذف كورس"
                  onClick={onDeleteClick}
                  className="w-full border border-red-500 text-sm md:text-base text-red-500 py-3 rounded-md flex items-center mx-auto gap-4 justify-center hover:bg-red-200/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
                >
                  <Trash2 className="w-4 h-4 " />
                </button>
              </div>
            </div>
          </div>

          <CourseDialog
            key={currentCourse?.id}
            open={open}
            onClose={() => setOpen(false)}
            onSubmit={handleUpdate}
            initialData={currentCourse}
          />

          <DeleteDialog
            key="delete-course"
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            onSubmit={() => {
              if (currentCourse?.id) handleDelete(currentCourse.id);
              setOpenDeleteDialog(false);
              Navigate("/courses");
            }}
            initialData={currentCourse}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
