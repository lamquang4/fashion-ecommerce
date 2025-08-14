import Image from "./Image";
function ServiceFeature() {
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
  return (
    <section className="px-[10px] mb-[40px] sm:mb-[45px] sm:px-[15px]">
      <div className="w-full m-[0_auto] md:max-w-[1000px] lg:max-w-[1240px]">
        <div className="gap-y-[25px] gap-[5px] grid grid-cols-2 lg:grid-cols-4 lg:gap-[15px]">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center xl:flex-row xl:text-start"
            >
              <div className="w-[40px] h-[40px] flex items-center justify-center">
                <Image
                  Src={service.img}
                  Alt={""}
                  ClassName={"w-full h-full"}
                  loadingType="eager"
                />
              </div>
              <div className="flex flex-col mt-2 xl:mt-0 xl:ml-3">
                <h3 className="text-[0.9rem] font-medium dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-[0.9rem]">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceFeature;
