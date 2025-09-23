import useGetPromoteBanners from "@/hooks/useGetPromoteBanners";
import Image from "../Image";
import Link from "next/link";
interface PromoteBannerProp {
  gender: number;
}
function PromoteBanner({ gender }: PromoteBannerProp) {
  const { promotions } = useGetPromoteBanners();

  return (
    <>
      {promotions.length > 0 && (
        <section className="mb-[40px]  px-[15px]">
          <div className="mx-auto max-w-[1230px] w-full">
            <div className="flex flex-col gap-[20px] sm:gap-[30px]">
              {gender === 1 ? (
                <Link href={"/collection/nam"}>
                  <div className="relative">
                    <Image
                      Src={promotions[0].image}
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
                      Src={promotions[1].image}
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
