import { BookOpenCheck, Info, LibraryBig, Users } from "lucide-react";
import { useGetStatisticsQuery } from "@/app/features/Admins/userApi";
import { cookieService } from "@/Cookies/CookiesServices";
import HandelError from "@/components/HandelError";
import { useGetAllComplaintsQuery } from "@/app/features/Complaints/ComplaintsApi";
import CoursesComponent from "@/components/Courses";
import WhyDifferentSection from "@/components/WhyDifferent";
import { useTranslation } from "react-i18next";
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}
const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <div className="flex flex-col  py-2 px-4 gap-6 border border-neutral-200 rounded-xl hover:shadow-sm transition-all">
      <h1 className="text-sm  xl:text-base  text-neutral-400">{title}</h1>
      <div className=" flex justify-between items-center">
        <p className=" text-xl sm:text-2xl   ">{value}</p>
        <span className={`text-${color}`}> {icon}</span>
      </div>
    </div>
  );
};
const HomePage = () => {
  const token = cookieService.get("auth_token") || "";
  const { t } = useTranslation("translation");
  const { data, isLoading, isError } = useGetStatisticsQuery(token as string);
  const { data: Complaints } = useGetAllComplaintsQuery(token);
  if (isError) {
    return <HandelError />;
  }

  return (
    <div className=" bg-white p-4 rounded-2xl">
      {isLoading ? (
        <div className=" m-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Header skeleton */}
          <div className="h-28 w-full bg-neutral-100 animate-pulse rounded "></div>
          <div className="h-28 w-full bg-neutral-100 animate-pulse  rounded "></div>
          <div className="h-28 w-full bg-neutral-100 animate-pulse  rounded "></div>
          <div className="h-28 w-full bg-neutral-100 animate-pulse  rounded "></div>
        </div>
      ) : (
        <div className="m-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={t("Statistics.Curriculums")}
            value={data?.Curriculum}
            icon={<BookOpenCheck className=" text-secondary" />}
            color="blue-500"
          />
          <StatCard
            title={t("Statistics.Courses")}
            value={data?.Courses}
            icon={<LibraryBig className=" text-primary" />}
            color="green-500"
          />
          <StatCard
            title={t("Statistics.Students")}
            value={data?.Users}
            icon={<Users className=" text-blue-400" />}
            color="yellow-500"
          />
          <StatCard
            title={t("Statistics.Complaints")}
            value={Complaints?.Complaint.length}
            icon={<Info className=" text-primary" />}
            color="yellow-500"
          />
        </div>
      )}
      <CoursesComponent max={3} />
      <WhyDifferentSection />
    </div>
  );
};

export default HomePage;
