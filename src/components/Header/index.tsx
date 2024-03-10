import logo from "../../assets/icons/logo-icon.svg";

export default function Header() {
  return (
    <header className="py-6 lg:py-8 flex gap-2 justify-center items-center">
      <img
        src={logo}
        alt="logo"
        className="size-12 lg:size-16 2xl:size-20 bg-valantis-light rounded-[50%] p-3 bg-valantis-primary"
      />
      <h1 className="text-2xl 2xl:text-4xl font-medium">Valantis</h1>
    </header>
  );
}
