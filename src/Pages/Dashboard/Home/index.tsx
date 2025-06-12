import { BookOpenCheck, Info, LibraryBig, Users } from "lucide-react";
import { useGetStatisticsQuery } from "@/app/features/Admins/userApi";
import { cookieService } from "@/Cookies/CookiesServices";
import HandelError from "@/components/HandelError";
import { useGetAllComplaintsQuery } from "@/app/features/Complaints/ComplaintsApi";
import CoursesComponent from "@/components/Courses";
import WhyDifferentSection from "@/components/WhyDifferent";
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}
const StatCard = ({
  title,

  value,
  icon,
  color,
}: StatCardProps) => {
  return (
    <div className="flex flex-col  p-4 gap-6 border border-neutral-200 rounded-xl hover:shadow-sm transition-all">
      <h1 className="text-xl font-semibold text-muted-foreground">{title}</h1>

      <div className="space-y-1 flex justify-between items-center">
        <p className="text-4xl font-semibold ">{value}</p>
        <span className={`text-${color}`}> {icon}</span>
      </div>
    </div>
  );
};
const HomePage = () => {
  const token = cookieService.get("auth_token") || "";
  const { data, isLoading, isError } = useGetStatisticsQuery(token as string);
  const { data: Complaints } = useGetAllComplaintsQuery(token);
  if (isError) {
    return <HandelError />;
  }

  return isLoading ? (
    <div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Header skeleton */}
        <div className="h-32 w-full bg-gray-200 rounded "></div>
        <div className="h-32 w-full bg-gray-200  rounded "></div>
        <div className="h-32 w-full bg-gray-200  rounded "></div>
      </div>

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
      </div>
    </div>
  ) : (
    <div className=" bg-white p-4 rounded-2xl">
      <div className="m-4 grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Curriculums"
          value={data?.Curriculum}
          icon={<BookOpenCheck size={30} className=" text-secondary" />}
          color="blue-500"
        />
        <StatCard
          title="Total Courses"
          value={data?.Courses}
          icon={<LibraryBig size={30} className=" text-primary" />}
          color="green-500"
        />
        <StatCard
          title="Total Students"
          value={data?.Users}
          icon={<Users size={30} className=" text-blue-400" />}
          color="yellow-500"
        />
        <StatCard
          title="Total Complaints"
          value={Complaints?.Complaint.length}
          icon={<Info size={30} className=" text-primary" />}
          color="yellow-500"
        />
      </div>
      <CoursesComponent max={3} />
      <WhyDifferentSection />
    </div>
  );
};

export default HomePage;
