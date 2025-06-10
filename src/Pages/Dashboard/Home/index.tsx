import { BookOpenCheck, LibraryBig, Users } from "lucide-react";
import { useGetStatisticsQuery } from "@/app/features/User/userApi";
import { cookieService } from "@/Cookies/CookiesServices";
import HandelError from "@/components/HandelError";
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}
const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <div className="flex flex-col  p-4 gap-6 border border-neutral-200 rounded-2xl hover:shadow-sm transition-all">
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
  if (isError) {
    return <HandelError />;
  }

  return (
    <div className="">
      <div className="m-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </div>
  );
};

export default HomePage;
