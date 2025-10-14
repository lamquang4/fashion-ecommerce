"use client";
import Image from "./Image";
function OrderSuccess() {
  return (
    <section className="my-[40px] px-[15px]">
      <div className="mx-auto max-w-[1230px] w-full">
        <div className="flex justify-center items-center h-[40vh]">
          <div className="flex flex-col justify-center items-center gap-[15px]">
            <Image
              Src={"/assets/other/successfully.png"}
              Alt={""}
              ClassName={"w-[100px]"}
              loadingType="eager"
            />
            <h4 className="uppercase text-center">Đặt đơn hàng thành công</h4>
            <p className="font-medium">
              Cảm ơn Quý khách đã mua hàng tại shop của chúng tôi
            </p>
            <p className="font-medium">
              Chúng tôi đã nhận được thông tin đơn hàng của bạn và sẽ liên hệ
              với bạn trong thời gian sớm nhất
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderSuccess;
