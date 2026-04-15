import Image from "../ui/Image";

const services = [
  {
    img: "/assets/other/policies_icon_1.png",
    title: "Vận chuyển toàn quốc",
    desc: "Vận chuyển nhanh chóng",
  },
  {
    img: "/assets/other/policies_icon_2.png",
    title: "Ưu đãi hấp dẫn",
    desc: "Nhiều ưu đãi khuyến mãi hot",
  },
  {
    img: "/assets/other/policies_icon_3.png",
    title: "Bảo đảm chất lượng",
    desc: "Sản phẩm đã được kiểm định",
  },
  {
    img: "/assets/other/policies_icon_4.png",
    title: "Hotline: 099654xxx",
    desc: "Nhân viên hỗ trợ 24/7",
  },
];

function ServiceFeature() {
  return (
    <section className="my-[40px]  px-[15px]">
      <div className="mx-auto max-w-[1230px] w-full">
        <div className="gap-y-[25px] grid grid-cols-2 lg:grid-cols-4 lg:gap-[15px]">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center xl:flex-row xl:text-start gap-2.5"
            >
              <Image
                src={service.img}
                alt={""}
                className={"w-[40px]"}
                loading="eager"
              />
              <div>
                <p className="font-medium">{service.title}</p>
                <p className="text-gray-600 font-normal">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceFeature;
