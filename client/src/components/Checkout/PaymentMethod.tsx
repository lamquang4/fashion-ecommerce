"use client";
import Image from "./../Image";
type Props = {
  paymethod: number | undefined;
  setPaymethod: (value: number) => void;
};
function PaymentMethod({ paymethod, setPaymethod }: Props) {
  const paymethods = [
    {
      image: "/assets/other/cod.png",
      name: "Thanh toán khi giao hàng",
      enable: "true",
    },
    {
      image: "/assets/other/momo.png",
      name: "Thanh toán Momo",
      enable: "true",
    },
  ];

  return (
    <div className="space-y-[15px]">
      <h4>Phương thức thanh toán</h4>
      <div className="grid gap-[20px]">
        {paymethods.map(
          (method, index) =>
            method.enable === "true" && (
              <div className="relative" key={index}>
                <input
                  className="peer hidden"
                  id={`paymethod-${index}`}
                  type="radio"
                  name="paymethod"
                  checked={paymethod === index}
                  onChange={() => setPaymethod(index)}
                />
                <span className="peer-checked:border-[#197FB6] absolute right-4 top-1/2 box-content block h-2.5 w-2.5 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-1 peer-checked:border-[#197FB6] items-center gap-[10px] peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor={`paymethod-${index}`}
                >
                  <Image
                    Src={method.image}
                    ClassName="w-[60px] rounded-lg border border-gray-300"
                    loadingType="eager"
                    Alt=""
                  />
                  <span className="font-medium">{method.name}</span>
                </label>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default PaymentMethod;
