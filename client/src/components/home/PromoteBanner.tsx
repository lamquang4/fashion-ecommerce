import Image from "../ui/Image";
import Link from "next/link";
import { Banner } from "@/types/type";
import PromoteBannerSkeleton from "../skeleton/PromoteBannerSkeleton";

type Props = {
  banners: Banner[];
  gender: number;
  isLoading: boolean;
};

function PromoteBanner({ banners, gender, isLoading }: Props) {
  if (isLoading) {
    return <PromoteBannerSkeleton />;
  }

  if (banners.length === 0) {
    return null;
  }

  const bannerImage = gender === 1 ? banners[0]?.image : banners[1]?.image;

  const linkHref = gender === 1 ? "/collection/nam" : "/collection/nu";

  if (!bannerImage) return null;

  return (
    <section className="mb-[40px] px-[15px]">
      <div className="mx-auto max-w-[1230px] w-full">
        <Link href={linkHref}>
          <div className="relative aspect-[16/5] overflow-hidden rounded">
            <Image
              src={bannerImage}
              alt="promotion banner"
              className="w-full object-cover"
              loading="lazy"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}

export default PromoteBanner;
