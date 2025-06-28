import useGetMainBanners from "@/hooks/useGetBanners";
import Image from "./Image";
import Link from "next/link";
interface PromoteBannerProp {
  gender: number;
}
function PromoteBanner({ gender }: PromoteBannerProp) {
  const { promotebanners } = useGetMainBanners();

  return (
    <>
      {promotebanners.length > 0 && (
        <section className="px-[10px] mt-[40px] sm:mt-[45px] sm:px-[15px]">
          <div className="w-full mx-auto md:max-w-[1000px] lg:max-w-[1240px]">
            <div className="flex flex-col gap-[20px] sm:gap-[30px]">
              {gender === 1 ? (
                <Link href={"/collection/nam"}>
                  <div className="relative">
                    <Image
                      Src={promotebanners[0].image}
                      Alt=""
                      ClassName="w-full object-cover"
                      loadingType="lazy"
                    />
                  </div>
                </Link>
              ) : (
                <Link href={"/collection/nu"}>
                  <div className="relative">
                    <Image
                      Src={promotebanners[1].image}
                      Alt=""
                      ClassName="w-full object-cover"
                      loadingType="lazy"
                    />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default PromoteBanner;
