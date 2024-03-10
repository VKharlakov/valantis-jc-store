import { formatPrice, setRandomImg } from "../../utils/utils";
import { ProductT } from "../../types/types";

export default function ProductCard({ product, id, price, brand }: ProductT) {
  const jcIcon = setRandomImg();

  return (
    <div className="w-full lg:p-8 lg:shadow-valantis-shadow relative group lg:hover:cursor-pointer">
      <div className="w-full gap-6 flex lg:h-60 xl:h-80 flex-col justify-center items-center">
        <img
          className="size-20 lg:size-40"
          src={require(`../../assets/${jcIcon}`)}
          alt="pic"
        />
        <div className="w-full text-center lg:hidden text-xs md:text-sm">
          <h3 className="text-[black]">
            {product}
            {brand ? " от " : ""}
            <span className="text-valantis-accent-dark font-medium">
              {brand}
            </span>
          </h3>
          <p>{formatPrice(price)}</p>
          <p className="text-xs mt-2 italic opacity-50">{id}</p>
        </div>
      </div>
      <div className="invisible opacity-0 absolute inset-0 border border-valantis-secondary shadow-valantis-shadow bg-[white] z-10 p-4 lg:group-hover:visible lg:group-hover:opacity-100 text-sm text-valantis-secondary h-[120%] flex flex-col">
        <div className="w-full h-full flex justify-center items-center bg-valantis-primary">
          <img
            className="size-32 shadow-valantis-shadow"
            src={require(`../../assets/${jcIcon}`)}
            alt="pic"
          />
        </div>
        <h3 className="text-base 2xl:text-xl text-[black]">
          {product}
          {brand ? " от " : ""}
          <span className="text-valantis-accent-dark font-medium">{brand}</span>
        </h3>
        <p className="text-sm 2xl:text-lg">{formatPrice(price)}</p>
        <p className="text-xs 2xl:text-sm text-center mt-4 italic opacity-50">
          {id}
        </p>
      </div>
    </div>
  );
}
