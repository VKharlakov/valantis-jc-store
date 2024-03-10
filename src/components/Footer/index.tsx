import { setRandomFact } from "../../utils/utils";
import { Button } from "../ui/Button";

export default function Footer() {
  const handleClick = () => {
    const fact = setRandomFact();
    console.log(fact);
  };

  return (
    <footer className="w-full bg-valantis-primary p-6 lg:p-8 2xl:p-16">
      <div className="flex flex-col md:flex-row gap-2 w-full items-center justify-between max-w-[1920px] mx-auto">
        <div className="opacity-50 text-xs 2xl:text-sm underline">
          <a
            href="https://www.freepik.com/free-vector/earrings-rings-cufflinks-necklaces-pendants-flat-icons-vector-illustration_11059155.htm#page=2&query=jewellery%20png&position=5&from_view=keyword&track=ais&uuid=d14a6784-45b0-4bf9-a422-77ad5ac15f73"
            target="_blank"
            rel="noreferrer"
          >
            Ссылка на источник с изображениями на Freepik
          </a>
        </div>
        <Button
          className="rounded-none border font-normal p-2 hover:scale-95 text-xs h-8 lg:h-10 2xl:h-12 2xl:text-base"
          onClick={handleClick}
        >
          Пользовательское соглашение
        </Button>
      </div>
    </footer>
  );
}
