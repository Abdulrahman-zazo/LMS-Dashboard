import { useTranslation } from "react-i18next";
import Image1 from "../assets/Online Support.png";
import Image2 from "../assets/Popular Man.png";
import Image3 from "../assets/Puzzle.png";

const WhyDifferentSection = () => {
  const { t, ready } = useTranslation("translation");

  return (
    <section className="max-w-[1440px] mx-auto  sm:px-4 py-6 ">
      {ready ? (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center mx-auto w-[100%]">
            <div className="  ">
              <h2 className="text-xl sm:text-2xl md:text-3xl  leading-12 font-semibold sm:mb-4">
                {t("why.why_we")}
                <span className="text-primary mx-1">{t("why.Differenet")}</span>
              </h2>
              <p className="text-neutral-700 text-sm ">{t("why.subtitle")}</p>
            </div>

            <div className="bg-purple-light px-4 py-6 w-full h-full   flex flex-col items-start rounded-xl  hover:shadow-sm transition">
              <div>
                <img
                  loading="lazy"
                  className="mb-2   h-12  w-12"
                  width="48"
                  height="48"
                  src={Image3}
                  alt="دعم فوري بلا انتظار"
                />
              </div>
              <h3 className="font-semibold  text-base   my-2">
                {t("why.key3")}
              </h3>
              <p className="text-sm  text-neutral-700">{t("why.value3")}</p>
            </div>

            <div className="bg-green-light px-4 py-6   w-full h-full  flex flex-col items-start  rounded-xl  hover:shadow-sm transition">
              <div>
                <img
                  loading="lazy"
                  className="mb-2   h-12  w-12"
                  width="48"
                  height="48"
                  src={Image2}
                  alt="مدربون خبراء"
                />
              </div>
              <h3 className="font-semibold  text-base   my-2">
                {t("why.key2")}
              </h3>
              <p className="text-sm  text-neutral-700">{t("why.value2")}</p>
            </div>

            <div className="bg-beby-light px-4 py-6  w-full h-full  flex flex-col items-start rounded-xl  hover:shadow-sm transition">
              <div>
                <img
                  loading="lazy"
                  src={Image1}
                  className="mb-2   h-12  w-12"
                  width="48"
                  height="48"
                  alt="تعلّم مهارات جديدة"
                />
              </div>

              <h3 className="font-semibold  text-base   my-2">
                {t("why.key1")}
              </h3>
              <p className="text-sm  text-neutral-700">{t("why.value1")}</p>
            </div>
          </div>
        </div>
      ) : (
        // skeleton
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-[90%] mx-auto animate-pulse">
          <div className="">
            <div className="h-10 bg-gray-200 rounded mb-4 w-[80%]"></div>
            <div className="h-4 bg-gray-200 rounded w-[60%]"></div>
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 px-4 py-6 flex flex-col items-start rounded-xl "
            >
              <div className="w-[50px] h-[50px] bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-[70%] mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-[90%] mt-1"></div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default WhyDifferentSection;
