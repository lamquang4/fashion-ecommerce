"use client";
import Image from "./../Image";
type Props = {
  paymethod: number | undefined;
  setPaymethod: (value: number) => void;
};
function PaymentMethod({ paymethod, setPaymethod }: Props) {
  return (
    <div className="space-y-[15px]">
      <h4>Phương thức thanh toán</h4>
      <div className="grid gap-[20px]">
        <div className="relative">
          <input
            className="peer hidden"
            id="paymethod1"
            type="radio"
            name="paymethod"
            checked={paymethod === 0}
            onChange={() => setPaymethod(0)}
          />
          <span className="peer-checked:border-[#197FB6] absolute right-4 top-1/2 box-content block h-2.5 w-2.5 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label
            className="peer-checked:border-1 peer-checked:border-[#197FB6] items-center gap-[10px] peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            htmlFor="paymethod1"
          >
            <Image
              Src={"/assets/other/cod.png"}
              ClassName="w-[60px] rounded-lg border border-gray-300"
              loadingType="eager"
              Alt=""
            />
            <span className="font-medium">Thanh toán khi giao hàng (COD)</span>
          </label>
        </div>

        <div className="relative">
          <input
            className="peer hidden"
            id="paymethod2"
            type="radio"
            name="paymethod"
            checked={paymethod === 1}
            onChange={() => setPaymethod(1)}
          />
          <span className="peer-checked:border-[#197FB6] absolute right-4 top-1/2 box-content block h-2.5 w-2.5 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label
            className="peer-checked:border-1 peer-checked:border-[#197FB6] items-center gap-[10px] peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            htmlFor="paymethod2"
          >
            <Image
              Src={"/assets/other/momo.png"}
              ClassName="w-[60px] rounded-lg border border-gray-300"
              loadingType="eager"
              Alt=""
            />
            <span className="font-medium">Thanh toán Momo</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
