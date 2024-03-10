import logo from "../../assets/braclet-1.webp";

export default function Hero() {
  return (
    <section className="w-full max-w-[1920px] grid grid-cols-1 gap-y-4 sm:grid-cols-2 justify-items-center items-center py-6 lg:py-8 2xl:py-16 bg-[white]">
      <img src={logo} alt="фото продукта" />
      <div className="md:text-center px-4 md:max-w-[70%]">
        <h2 className="text-xl lg:text-3xl 2xl:text-4xl font-medium">
          Индивидуальное сияние каждого мгновения
        </h2>
        <p className="text-sm lg:text-lg 2xl:text-2xl mt-2">
          Наслаждайтесь индивидуальностью с каждым украшением из нашей
          коллекции. Подчеркните свой стиль без лишних слов.
        </p>
      </div>
    </section>
  );
}
