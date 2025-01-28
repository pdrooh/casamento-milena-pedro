import { useEffect, useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./Preloader"; // Importe o componente Preloader

function App() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const weddingDate = new Date("2027-03-03T16:00:00");

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    };

    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    const interval = setInterval(updateCountdown, 1000);
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen overflow-x-hidden">
          {/* Navigation */}
          <nav
            className={`
          fixed 
          top-0 
          left-0 
          right-0 
          z-50 
          transition-all 
          duration-300 
          ${
            isScrolled
              ? "bg-gray-950/75 backdrop-blur-sm py-4"
              : "py-6 bg-transparent"
          }
        `}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center relative">
                {/* Brand */}
                <a
                  href="#"
                  className={`
                font-serif 
                text-xl 
                sm:text-2xl 
                relative 
                group
                ${isScrolled ? "text-white" : "text-white"}
              `}
                >
                  M<span className="text-yellow-500">&</span>P
                  <span
                    className="
                  absolute 
                  bottom-[-5px] 
                  left-0 
                  w-full 
                  h-[2px] 
                  bg-yellow-500 
                  transform 
                  scale-x-0 
                  group-hover:scale-x-100 
                  transition-transform 
                  duration-300 
                  origin-left
                "
                  />
                </a>

                {/* Mobile Menu Toggle */}
                <button
                  className="md:hidden text-white"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Navigation Links - Desktop */}
                <div
                  className="
                hidden 
                md:flex 
                gap-6 
                lg:gap-12 
                text-xs 
                lg:text-sm 
                tracking-widest
              "
                >
                  {[
                    { href: "#historia", label: "NOSSA HISTÓRIA" },
                    { href: "#local", label: "LOCAL" },
                    { href: "#presentes", label: "PRESENTES" },
                    { href: "#confirmar", label: "CONFIRMAR PRESENÇA" },
                  ].map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`
                    relative 
                    group 
                    no-underline 
                    uppercase
                    ${
                      isScrolled
                        ? "text-white hover:text-yellow-200"
                        : "text-white/90 hover:text-yellow-200"
                    }
                  `}
                    >
                      {link.label}
                      <span
                        className="
                      absolute 
                      bottom-[-5px] 
                      left-0 
                      w-full 
                      h-[2px] 
                      bg-yellow-500 
                      transform 
                      scale-x-0 
                      group-hover:scale-x-100 
                      transition-transform 
                      duration-300 
                      origin-left
                    "
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div
              className="
            fixed 
            inset-0 
            bg-gray-950/90 
            z-40 
            md:hidden 
            flex 
            flex-col 
            items-center 
            justify-center 
            space-y-6 
            text-center
          "
            >
              {[
                { href: "#historia", label: "NOSSA HISTÓRIA" },
                { href: "#local", label: "LOCAL" },
                { href: "#presentes", label: "PRESENTES" },
                { href: "#confirmar", label: "CONFIRMAR PRESENÇA" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="
                text-2xl 
                text-white 
                hover:text-yellow-500 
                transition-colors
              "
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Hero Section */}
          <section
            id="home"
            className="
    relative 
    min-h-screen 
    flex 
    items-center 
    justify-center 
    text-center 
    text-white 
    bg-cover 
    bg-center 
    bg-fixed
  "
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
              backgroundAttachment: "fixed", // Melhora performance em mobile
            }}
          >
            <div
              className="
      w-full 
      max-w-[90%] 
      sm:max-w-[80%] 
      md:max-w-[800px] 
      mx-auto 
      px-4 
      sm:px-6 
      relative 
      z-10
    "
            >
              <div className="space-y-6 sm:space-y-8">
                {/* Linha decorativa */}
                <div
                  className="
          w-24 
          sm:w-32 
          h-[1px] 
          bg-gradient-to-r 
          from-transparent 
          via-yellow-500 
          to-transparent 
          mx-auto 
          mb-4
        "
                />

                <p
                  className="
          font-light 
          tracking-[0.2em] 
          sm:tracking-[0.3em] 
          text-sm 
          sm:text-base 
          text-yellow-100
        "
                >
                  O AMOR NOS UNE
                </p>

                {/* Linha decorativa */}
                <div
                  className="
          w-24 
          sm:w-32 
          h-[1px] 
          bg-gradient-to-r 
          from-transparent 
          via-yellow-500 
          to-transparent 
          mx-auto 
          mb-4
        "
                />

                {/* Nomes dos noivos */}
                <h1 className="font-serif">
                  <span
                    className="
            block 
            text-4xl 
            sm:text-5xl 
            md:text-6xl 
            lg:text-7xl 
            mb-2 
            sm:mb-4 
            text-shadow-lg 
            shadow-black/50
          "
                  >
                    Milena
                  </span>
                  <span
                    className="
            inline-block 
            text-yellow-500 
            text-3xl 
            sm:text-4xl 
            md:text-5xl 
            lg:text-6xl 
            font-light
          "
                  >
                    &
                  </span>
                  <span
                    className="
            block 
            text-4xl 
            sm:text-5xl 
            md:text-6xl 
            lg:text-7xl 
            mt-2 
            sm:mt-4 
            text-shadow-lg 
            shadow-black/50
          "
                  >
                    Pedro
                  </span>
                </h1>

                {/* Data */}
                <p
                  className="
          text-lg 
          sm:text-xl 
          md:text-2xl 
          tracking-[0.15em] 
          sm:tracking-[0.2em]
        "
                >
                  03 · MARÇO · 2027
                </p>

                {/* Contagem Regressiva */}
                <div
                  className="
          grid 
          grid-cols-2 
          sm:grid-cols-4 
          gap-4 
          sm:gap-6 
          md:gap-8 
          mb-6 
          sm:mb-8 
          md:mb-10
        "
                >
                  {[
                    { value: days, label: "DIAS" },
                    { value: hours, label: "HORAS" },
                    { value: minutes, label: "MINUTOS" },
                    { value: seconds, label: "SEGUNDOS" },
                  ].map(({ value, label }) => (
                    <div
                      key={label}
                      className="
              backdrop-blur-md 
              bg-white/5 
              px-3 
              sm:px-4 
              md:px-6 
              py-2 
              sm:py-3 
              md:py-4 
              rounded-lg 
              border 
              border-white/10 
              hover:bg-white/10 
              transition-colors 
              text-center
            "
                    >
                      <span
                        className="
                block 
                text-2xl 
                sm:text-3xl 
                md:text-4xl 
                lg:text-5xl 
                font-serif 
                text-shadow 
                shadow-black/50
              "
                      >
                        {String(value).padStart(label === "DIAS" ? 3 : 2, "0")}
                      </span>
                      <span
                        className="
                block 
                text-xs 
                sm:text-sm 
                tracking-widest 
                text-yellow-100 
                mt-1
              "
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Ícone de Coração */}
                <Heart
                  className="
          mx-auto 
          text-yellow-200 
          w-6 
          sm:w-8 
          h-6 
          sm:h-8 
          animate-pulse 
          opacity-80
        "
                />
              </div>
            </div>
          </section>

          {/* História */}

          <section
            id="historia"
            className="
    relative 
    min-h-screen 
    flex 
    items-center 
    justify-center 
    py-12 
    sm:py-16 
    md:py-24 
    bg-gradient-to-br 
    from-[#f0f4f2] 
    via-[#e6ece8] 
    to-[#f4f9f4] 
    text-[#2c3e3a] 
    overflow-hidden
  "
          >
            {/* Linha vertical decorativa */}
            <div
              className="
      absolute 
      left-1/2 
      top-0 
      bottom-0 
      w-0.5 
      bg-gradient-to-b 
      from-transparent 
      via-[#d4b86a]/30 
      to-transparent 
      transform 
      -translate-x-1/2 
      z-0
    "
            />

            <div
              className="
      container 
      mx-auto 
      max-w-4xl 
      relative 
      z-10 
      px-4 
      sm:px-6 
      lg:px-8 
      w-full
    "
            >
              <div className="text-center mb-16 md:mb-20">
                <h2
                  className="
          text-3xl 
          sm:text-4xl 
          md:text-5xl 
          font-light 
          tracking-wider 
          text-[#2c3e3a] 
          mb-4 
          sm:mb-6 
          relative 
          inline-block
          after:content-[''] 
          after:absolute 
          after:left-0 
          after:right-0 
          after:-bottom-2 
          after:h-1 
          after:bg-[#d4b86a]
        "
                >
                  Nossa{" "}
                  <span className="text-[#d4b86a] font-semibold">História</span>
                </h2>
                <p
                  className="
          text-[#4a5f57] 
          max-w-2xl 
          mx-auto 
          text-base 
          sm:text-lg 
          leading-relaxed
        "
                >
                  Uma jornada de amor, momentos únicos e conexões que nos
                  trouxeram até aqui
                </p>
              </div>

              <div className="relative">
                {[
                  {
                    year: "2024",
                    title: "Primeiro Encontro",
                    description:
                      "Nosso primeiro encontro aconteceu em um café, onde conversamos por horas e descobrimos que ali se iniciava nosso amor.",
                    side: "left",
                  },
                  {
                    year: "2024",
                    title: "Primeiro Beijo",
                    description:
                      "Em um final de tarde romântico, nossos sentimentos se concretizaram com um beijo que mudou tudo.",
                    side: "right",
                  },
                  {
                    year: "2026",
                    title: "O Pedido",
                    description:
                      "Em um momento íntimo e especial, decidi pedir Milena em casamento, selando nosso compromisso de amor.",
                    side: "left",
                  },
                ].map((moment, index) => (
                  <div
                    key={index}
                    className={`
            flex 
            flex-col 
            md:flex-row 
            items-center 
            mb-16 
            sm:mb-20 
            md:mb-24 
            relative
            ${moment.side === "left" ? "md:flex-row" : "md:flex-row-reverse"}
            group
          `}
                  >
                    {/* Marcador circular */}
                    <div
                      className="
              hidden 
              md:flex 
              absolute 
              left-1/2 
              transform 
              -translate-x-1/2 
              z-20 
              w-12 
              h-12 
              md:w-16 
              md:h-16 
              items-center 
              justify-center 
              bg-[#d4b86a] 
              rounded-full 
              border-4 
              border-[#f0f4f2] 
              shadow-2xl 
              transition-all 
              group-hover:scale-110
            "
                    />

                    {/* Cartão de Momento */}
                    <div
                      className={`
              w-full 
              md:w-1/2 
              p-6 
              sm:p-8 
              bg-white/70 
              backdrop-blur-sm 
              rounded-3xl 
              border 
              border-[#c1d8ce]/30 
              shadow-xl 
              transition-all 
              duration-300 
              hover:scale-[1.05] 
              hover:shadow-2xl 
              relative 
              overflow-hidden 
              mt-8 
              md:mt-0
            `}
                    >
                      {/* Ano decorativo */}
                      <div
                        className="
                absolute 
                top-4 
                right-4 
                text-[#d4b86a] 
                font-bold 
                text-2xl 
                md:text-3xl 
                opacity-20 
                group-hover:opacity-40 
                transition-opacity
              "
                      >
                        {moment.year}
                      </div>

                      <div className="text-center">
                        <h3
                          className="
                  text-2xl 
                  sm:text-3xl 
                  font-light 
                  text-[#2c3e3a] 
                  mb-3 
                  sm:mb-4 
                  pb-3 
                  relative 
                  after:content-[''] 
                  after:absolute 
                  after:left-1/2 
                  after:bottom-0 
                  after:transform 
                  after:-translate-x-1/2 
                  after:w-1/3 
                  after:h-1 
                  after:bg-[#d4b86a]
                "
                        >
                          {moment.title}
                        </h3>
                        <p
                          className="
                  text-[#4a5f57] 
                  leading-relaxed 
                  text-sm 
                  sm:text-base
                "
                        >
                          {moment.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Efeitos decorativos */}
            <div
              className="
      absolute 
      top-0 
      left-0 
      right-0 
      h-1/2 
      bg-gradient-to-b 
      from-white/10 
      to-transparent 
      pointer-events-none
    "
            />
            <div
              className="
      absolute 
      bottom-0 
      left-0 
      right-0 
      h-1/4 
      bg-gradient-to-t 
      from-[#e6ece8]/30 
      to-transparent 
      pointer-events-none
    "
            />
          </section>

          {/* Versiculo */}
          <section
            id="versiculo"
            className="
    relative 
    py-16 
    sm:py-24 
    md:py-32 
    text-center 
    text-white 
    bg-cover 
    bg-center 
    bg-fixed
  "
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
            }}
          >
            <div
              className="
    max-w-xl 
    lg:max-w-[800px] 
    mx-auto 
    px-4 
    sm:px-6 
    lg:px-8 
    relative 
    z-10
  "
            >
              <div>
                <div
                  className="
        text-3xl 
        sm:text-4xl 
        md:text-5xl 
        text-yellow-500 
        mb-6 
        sm:mb-8 
        opacity-80
      "
                >
                  <i className="fas fa-heart"></i>
                </div>

                <p
                  className="
        relative 
        font-primary 
        text-2xl 
        sm:text-3xl 
        md:text-4xl 
        leading-relaxed 
        mb-6 
        sm:mb-8 
        px-4 
        sm:px-8
      "
                >
                  {/* Aspas antes */}
                  <span
                    className="
          absolute 
          -top-3 
          sm:-top-5 
          -left-4 
          sm:-left-10 
          text-4xl 
          sm:text-6xl 
          text-yellow-500 
          opacity-60 
          font-decorative
        "
                  >
                    "
                  </span>
                  "Assim, eles já não são dois, mas sim uma só carne. Portanto,
                  o que Deus uniu, ninguém separe."
                  {/* Aspas depois */}
                  <span
                    className="
          absolute 
          -bottom-6 
          sm:-bottom-10 
          -right-4 
          sm:-right-10 
          text-4xl 
          sm:text-6xl 
          text-yellow-500 
          opacity-60 
          font-decorative
        "
                  >
                    "
                  </span>
                </p>

                <p
                  className="
        font-secondary 
        text-base 
        sm:text-lg 
        uppercase 
        tracking-[2px] 
        sm:tracking-[3px] 
        text-yellow-500
      "
                >
                  Mateus 19:6
                </p>

                {/* Decoração */}
                <div
                  className="
        relative 
        w-[100px] 
        sm:w-[150px] 
        h-[2px] 
        bg-yellow-500 
        my-6 
        sm:my-8 
        mx-auto
      "
                >
                  <span
                    className="
          absolute 
          left-0 
          top-1/2 
          -translate-y-1/2 
          w-[8px] 
          sm:w-[10px] 
          h-[8px] 
          sm:h-[10px] 
          bg-yellow-500 
          rounded-full
        "
                  ></span>
                  <span
                    className="
          absolute 
          right-0 
          top-1/2 
          -translate-y-1/2 
          w-[8px] 
          sm:w-[10px] 
          h-[8px] 
          sm:h-[10px] 
          bg-yellow-500 
          rounded-full
        "
                  ></span>
                </div>
              </div>
            </div>
          </section>

          {/* Local */}
          <section
            id="local"
            className="
    relative 
    min-h-screen 
    flex 
    items-center 
    justify-center 
    py-24 
    bg-gradient-to-br 
    from-[#f0f4f2] 
    via-[#e6ece8] 
    to-[#f4f9f4] 
    text-[#2c3e3a] 
    overflow-hidden
  "
          >
            <div
              className="
      absolute 
      inset-0 
      opacity-30 
      bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
      from-[#c1d8ce] 
      via-[#d6e6de] 
      to-[#e6f3ea]
      pointer-events-none
    "
            ></div>

            <div className="container mx-auto max-w-4xl relative z-10 px-4">
              <div className="text-center mb-16">
                <h2
                  className="
          text-5xl 
          font-light 
          tracking-wider 
          text-[#2c3e3a] 
          mb-6 
          relative 
          inline-block
          after:content-[''] 
          after:absolute 
          after:left-0 
          after:right-0 
          after:-bottom-3 
          after:h-1 
          after:bg-[#d4b86a]
        "
                >
                  Detalhes do{" "}
                  <span className="text-[#d4b86a] font-semibold">Evento</span>
                </h2>
                <p
                  className="
          text-[#4a5f57] 
          max-w-2xl 
          mx-auto 
          text-lg 
          leading-relaxed
        "
                >
                  Todos os momentos importantes para o seu dia especial
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Localização */}
                <div
                  className="
          bg-white/70 
          backdrop-blur-sm 
          rounded-3xl 
          border 
          border-[#c1d8ce]/30 
          p-8 
          text-center 
          shadow-xl 
          transition-all 
          hover:scale-[1.05]
          hover:shadow-2xl
          relative
          overflow-hidden
        "
                >
                  <div
                    className="
            absolute 
            top-4 
            right-4 
            text-[#d4b86a] 
            opacity-20
            group-hover:opacity-40
            transition-opacity
          "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>

                  <h3
                    className="
            text-3xl 
            font-light 
            text-[#2c3e3a] 
            mb-6 
            pb-3
            relative
            after:content-['']
            after:absolute
            after:left-1/2
            after:bottom-0
            after:transform
            after:-translate-x-1/2
            after:w-1/3
            after:h-1
            after:bg-[#d4b86a]
          "
                  >
                    Localização
                  </h3>

                  <div className="text-[#4a5f57] space-y-4">
                    <p className="font-semibold text-xl">Botucatu, SP</p>
                    <p className="text-base">
                      Centro de Eventos
                      <br />
                      Rua Principal, 123
                    </p>
                    <a
                      href="https://www.google.com/maps/place/R.+Francisco+Caricati+-+Botucatu,+SP,+18603-100/@-22.8803729,-48.46035,17z/data=!3m1!4b1!4m6!3m5!1s0x94c7209fc2d1d00f:0x882db65f52c0498c!8m2!3d-22.8803779!4d-48.4577751!16s%2Fg%2F1ymvtfwdl?entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
              inline-block 
              mt-4 
              px-6 
              py-2 
              bg-[#d4b86a] 
              text-white 
              rounded-full 
              hover:bg-[#c4a85a] 
              transition-colors
            "
                    >
                      Ver no Mapa
                    </a>
                  </div>
                </div>

                {/* Horário */}
                <div
                  className="
          bg-white/70 
          backdrop-blur-sm 
          rounded-3xl 
          border 
          border-[#c1d8ce]/30 
          p-8 
          text-center 
          shadow-xl 
          transition-all 
          hover:scale-[1.05]
          hover:shadow-2xl
          relative
          overflow-hidden
        "
                >
                  <div
                    className="
            absolute 
            top-4 
            right-4 
            text-[#d4b86a] 
            opacity-20
            group-hover:opacity-40
            transition-opacity
          "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>

                  <h3
                    className="
            text-3xl 
            font-light 
            text-[#2c3e3a] 
            mb-6 
            pb-3
            relative
            after:content-['']
            after:absolute
            after:left-1/2
            after:bottom-0
            after:transform
            after:-translate-x-1/2
            after:w-1/3
            after:h-1
            after:bg-[#d4b86a]
          "
                  >
                    Horário
                  </h3>

                  <div className="text-[#4a5f57] space-y-4">
                    <p className="font-bold text-3xl text-[#d4b86a]">16:00</p>
                    <p className="text-base">
                      Cerimônia e Recepção
                      <br />
                      Início pontual
                    </p>
                  </div>
                </div>

                {/* Informações Adicionais */}
                <div
                  className="
          bg-white/70 
          backdrop-blur-sm 
          rounded-3xl 
          border 
          border-[#c1d8ce]/30 
          p-8 
          text-center 
          shadow-xl 
          transition-all 
          hover:scale-[1.05]
          hover:shadow-2xl
          relative
          overflow-hidden
        "
                >
                  <div
                    className="
            absolute 
            top-4 
            right-4 
            text-[#d4b86a] 
            opacity-20
            group-hover:opacity-40
            transition-opacity
          "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>

                  <h3
                    className="
            text-3xl 
            font-light 
            text-[#2c3e3a] 
            mb-6 
            pb-3
            relative
            after:content-['']
            after:absolute
            after:left-1/2
            after:bottom-0
            after:transform
            after:-translate-x-1/2
            after:w-1/3
            after:h-1
            after:bg-[#d4b86a]
          "
                  >
                    Contato
                  </h3>

                  <div className="text-[#4a5f57] space-y-4">
                    <p className="font-semibold text-xl">Milena & Pedro</p>
                    <p className="text-base">
                      (14) 99999-9999
                      <br />
                    </p>
                    <a
                      href="https://wa.me/5514999999999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
              inline-block 
              mt-4 
              px-6 
              py-2 
              bg-[#d4b86a] 
              text-white 
              rounded-full 
              hover:bg-[#c4a85a] 
              transition-colors
            "
                    >
                      Fale Conosco
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Presentes */}
          <section
            id="presentes"
            className="
    relative 
    py-10 
    bg-cover 
    bg-center 
    bg-fixed
    text-white 
    overflow-hidden
  "
            style={{
              backgroundPosition: "center 58%", // Ajusta a posição vertical da imagem para centralizar o casal
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1519307212971-dd9561667ffb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            }}
          >
            <div className="container mx-auto max-w-6xl relative z-10 px-4 mt-16">
              <div className="text-center mb-16">
                <h2
                  className="
          text-5xl 
          font-light 
          tracking-wider 
          text-white 
          mb-6 
          relative 
          inline-block
          after:content-[''] 
          after:absolute 
          after:left-0 
          after:right-0 
          after:-bottom-3 
          after:h-1 
          after:bg-[#e9c46a]
        "
                >
                  Nossa{" "}
                  <span className="text-[#e9c46a] font-semibold">Lista</span>
                </h2>
                <p
                  className="
          text-white/80 
          max-w-2xl 
          mx-auto 
          text-lg 
          leading-relaxed
        "
                >
                  Cada presente é uma parte especial do nosso novo lar e
                  memórias juntos
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Lista de Presentes */}
                <div
                  className="
          bg-white/15 
          
          rounded-3xl 
          border 
          border-white/20 
          p-8 
          shadow-2xl 
          transition-all 
          hover:scale-[1.02]
          relative
          overflow-hidden
        "
                >
                  <h3
                    className="
            text-3xl 
            font-light 
            text-white 
            mb-6 
            pb-3
            relative
            text-center
            after:content-['']
            after:absolute
            after:left-1/2
            after:bottom-0
            after:transform
            after:-translate-x-1/2
            after:w-1/3
            after:h-1
            after:bg-[#e9c46a]
          "
                  >
                    Lista de Presentes
                  </h3>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      {
                        name: "Jogo de Panelas",
                        status: "Disponível",
                        icon: "🍳",
                        price: "R$ 599",
                        image:
                          "https://images.unsplash.com/photo-1615226160570-ab85aea97c18?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      },
                      {
                        name: "Cafeteira",
                        status: "Disponível",
                        icon: "☕",
                        price: "R$ 349",
                        image:
                          "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      },
                      {
                        name: "Jogo de Cama",
                        status: "Disponível",
                        icon: "🛏️",
                        price: "R$ 799",
                        image:
                          "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      },
                      {
                        name: "Aspirador",
                        status: "Disponível",
                        icon: "🧹",
                        price: "R$ 499",
                        image:
                          "https://images.unsplash.com/photo-1581579186913-45ac24ed53d3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      },
                      {
                        name: "Liquidificador",
                        status: "Disponível",
                        icon: "🥤",
                        price: "R$ 249",
                        image:
                          "https://images.unsplash.com/photo-1589985018141-5a76e5449227?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      },
                      {
                        name: "Conjunto de Taças",
                        status: "Disponível",
                        icon: "🍷",
                        price: "R$ 299",
                        image:
                          "https://images.unsplash.com/photo-1514362545857-3bc6c8b9a141?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      },
                      {
                        name: "Smart TV",
                        status: "Disponível",
                        icon: "📺",
                        price: "R$ 2.499",
                        image:
                          "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      },
                      {
                        name: "Máquina de Café",
                        status: "Disponível",
                        icon: "☕",
                        price: "R$ 1.199",
                        image:
                          "https://images.unsplash.com/photo-1598264294152-a5e7c9d1dfc9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      },
                      {
                        name: "Conjunto de Toalhas",
                        status: "Disponível",
                        icon: "🧼",
                        price: "R$ 399",
                        image:
                          "https://images.unsplash.com/photo-1600454016702-1c578a1f1e45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="
                bg-white/10 
                p-3 
                rounded-xl 
                flex 
                flex-col 
                items-center 
                justify-between
                shadow-md
                hover:shadow-lg
                transition-all
                
                transform
                hover:scale-105
                hover:bg-white/20
                cursor-pointer
                group
                relative
                overflow-hidden
              "
                      >
                        <div
                          className="
                  absolute 
                  inset-0 
                  bg-cover 
                  bg-center 
                  opacity-30 
                  group-hover:opacity-50 
                  transition-opacity
                  z-0
                "
                          style={{ backgroundImage: `url('${item.image}')` }}
                        />

                        <div className="relative z-10 flex flex-col items-center">
                          <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                            {item.icon}
                          </span>
                          <span className="font-semibold text-white text-xs text-center mb-1">
                            {item.name}
                          </span>
                          <span
                            className="
                    text-xs 
                    px-2 
                    py-1 
                    rounded-full 
                    mb-1
                    text-[#2c3e50]
                    bg-[#e9c46a]
                    group-hover:bg-[#f2d06b]
                    transition-colors
                  "
                          >
                            {item.status}
                          </span>
                          <span className="text-white/70 text-xs">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="
    mt-6 
    w-full 
    py-3 
    bg-[#e9c46a] 
    text-[#2c3e50] 
    rounded-full 
    hover:bg-[#f2d06b] 
    transition-colors
    font-semibold
    shadow-lg
    hover:shadow-xl
    flex 
    items-center 
    justify-center 
    space-x-2
    border-none
    outline-none
  "
                  >
                    <span>Ver Lista Completa</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>

                {/* Contribuição Lua de Mel */}
                <div
                  className="
          bg-white/20 
          
          rounded-3xl 
          border 
          border-white/20 
          p-8 
          shadow-2xl 
          transition-all 
          hover:scale-[1.02]
          relative
          overflow-hidden
        "
                >
                  <h3
                    className="
            text-3xl 
            font-light 
            text-white 
            mb-6 
            pb-3
            relative
            text-center
            after:content-['']
            after:absolute
            after:left-1/2
            after:bottom-0
            after:transform
            after:-translate-x-1/2
            after:w-1/3
            after:h-1
            after:bg-[#e9c46a]
          "
                  >
                    Contribuição Lua de Mel
                  </h3>

                  <div className="space-y-6 text-center relative z-10">
                    <p className="text-white/80">
                      Sua contribuição nos ajudará a realizar nosso sonho de lua
                      de mel.
                    </p>

                    <div
                      className="
              bg-white/10 
              p-6 
              rounded-xl 
              flex 
              flex-col 
              items-center 
              space-y-4
              shadow-md
              
            "
                    >
                      <div
                        className="
                w-48 
                h-48 
                bg-gradient-to-br 
                from-[#e9c46a] 
                to-[#f2d06b] 
                rounded-full 
                flex 
                items-center 
                justify-center 
                shadow-2xl
                relative
                overflow-hidden
              "
                      >
                        <div
                          className="
                  absolute 
                  inset-2 
                  bg-white/20 
                  rounded-full 
                  flex 
                  items-center 
                  justify-center 
                  flex-col
                  shadow-inner
                  
                "
                        >
                          <span className="text-3xl font-bold text-white">
                            PIX
                          </span>
                          <span className="text-sm text-white/80">
                            Lua de Mel
                          </span>
                        </div>
                      </div>

                      <div className="text-center space-y-4">
                        <p className="text-white font-semibold text-lg">
                          Chave PIX
                        </p>
                        <div
                          className="
                  bg-white/10 
                  px-6 
                  py-3 
                  rounded-full 
                  inline-flex 
                  items-center 
                  space-x-4
                  shadow-md
                  group
                  
                "
                        >
                          <span className="text-white/80 font-medium">
                            (11) 95432-7477
                          </span>
                          <button
                            className="
                    text-[#e9c46a] 
                    hover:text-[#f2d06b] 
                    transition-colors
                    group-hover:scale-110
                  "
                            onClick={() => {
                              navigator.clipboard.writeText("5511954327477");
                              alert("Chave PIX copiada com sucesso! ✨");
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="9"
                                y="9"
                                width="13"
                                height="13"
                                rx="2"
                                ry="2"
                              />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      className="
              inline-block 
              mt-6 
              px-12 
              py-4 
              bg-[#e9c46a] 
              text-[#2c3e50] 
              rounded-full 
              hover:bg-[#f2d06b] 
              transition-colors
              font-semibold
              shadow-lg
              hover:shadow-xl
              w-full
            "
                    >
                      Contribuir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RSVP */}
          {/* Confirmação de Presença */}
          <section
            id="confirmar"
            className="
    relative 
    py-24 
    bg-gradient-to-br 
    from-[#f0f4f2] 
    via-[#e6ece8] 
    to-[#f4f9f4] 
    text-[#2c3e3a]
    overflow-hidden
  "
          >
            <div className="container mx-auto max-w-5xl px-4 relative z-10">
              <div className="text-center mb-16">
                <h2
                  className="
          text-5xl 
          font-light 
          tracking-wider 
          text-[#2c3e3a] 
          mb-6 
          relative 
          inline-block
          after:content-[''] 
          after:absolute 
          after:left-0 
          after:right-0 
          after:-bottom-3 
          after:h-1 
          after:bg-[#d4b86a]
        "
                >
                  Confirmar{" "}
                  <span className="text-[#d4b86a] font-semibold">Presença</span>
                </h2>
                <p
                  className="
          text-[#4a5f57] 
          max-w-2xl 
          mx-auto 
          text-lg 
          leading-relaxed
        "
                >
                  Sua confirmação é importante para tornar nosso dia ainda mais
                  especial. Por favor, preencha o formulário até 15 de
                  fevereiro.
                </p>
              </div>

              <div
                className="
        grid 
        md:grid-cols-2 
        gap-12 
        bg-white/70 
        backdrop-blur-sm 
        rounded-3xl 
        border 
        border-[#c1d8ce]/30 
        p-12 
        shadow-2xl
      "
              >
                {/* Lado Esquerdo - Informações */}
                <div
                  className="
          flex 
          flex-col 
          justify-center 
          space-y-6 
          pr-8 
          border-r 
          border-[#d4b86a]/20
        "
                >
                  <div
                    className="
            bg-[#d4b86a]/10 
            p-6 
            rounded-2xl 
            border 
            border-[#d4b86a]/20 
            hover:bg-[#d4b86a]/20 
            transition-all
            group
          "
                  >
                    <div
                      className="
              flex 
              items-center 
              space-x-4 
              mb-4
            "
                    >
                      <div
                        className="
                w-12 
                h-12 
                bg-[#d4b86a]/20 
                rounded-full 
                flex 
                items-center 
                justify-center
                group-hover:bg-[#d4b86a]/40
                transition-all
              "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-[#d4b86a]"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-[#2c3e3a]">
                        Confirmação Digital
                      </h3>
                    </div>
                    <p className="text-[#4a5f57] text-sm">
                      Preencha o formulário para confirmar sua presença em nosso
                      casamento.
                    </p>
                  </div>

                  <div
                    className="
            bg-[#d4b86a]/10 
            p-6 
            rounded-2xl 
            border 
            border-[#d4b86a]/20 
            hover:bg-[#d4b86a]/20 
            transition-all
            group
          "
                  >
                    <div
                      className="
              flex 
              items-center 
              space-x-4 
              mb-4
            "
                    >
                      <div
                        className="
                w-12 
                h-12 
                bg-[#d4b86a]/20 
                rounded-full 
                flex 
                items-center 
                justify-center
                group-hover:bg-[#d4b86a]/40
                transition-all
              "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-[#d4b86a]"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-[#2c3e3a]">
                        Dúvidas?
                      </h3>
                    </div>
                    <p className="text-[#4a5f57] text-sm">
                      Entre em contato conosco para esclarecer qualquer dúvida
                      sobre o evento.
                    </p>
                  </div>
                </div>

                {/* Lado Direito - Formulário */}
                <div>
                  <form className="space-y-6">
                    <div>
                      <label
                        className="
                block 
                text-[#2c3e3a]/80 
                mb-2 
                text-sm 
                font-medium
              "
                      >
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        className="
                w-full 
                bg-white/50 
                border 
                border-[#c1d8ce]/30 
                rounded-xl 
                px-4 
                py-3 
                text-[#2c3e3a] 
                focus:border-[#d4b86a] 
                focus:ring-2 
                focus:ring-[#d4b86a]/30 
                transition-all
              "
                        placeholder="Digite seu nome completo"
                      />
                    </div>

                    <div>
                      <label
                        className="
                block 
                text-[#2c3e3a]/80 
                mb-2 
                text-sm 
                font-medium
              "
                      >
                        E-mail
                      </label>
                      <input
                        type="email"
                        className="
                w-full 
                bg-white/50 
                border 
                border-[#c1d8ce]/30 
                rounded-xl 
                px-4 
                py-3 
                text-[#2c3e3a] 
                focus:border-[#d4b86a] 
                focus:ring-2 
                focus:ring-[#d4b86a]/30 
                transition-all
              "
                        placeholder="Digite seu e-mail"
                      />
                    </div>

                    <div>
                      <label
                        className="
                block 
                text-[#2c3e3a]/80 
                mb-2 
                text-sm 
                font-medium
              "
                      >
                        Número de Convidados
                      </label>
                      <select
                        className="
                w-full 
                bg-white/50 
                border 
                border-[#c1d8ce]/30 
                rounded-xl 
                px-4 
                py-3 
                text-[#2c3e3a] 
                focus:border-[#d4b86a] 
                focus:ring-2 
                focus:ring-[#d4b86a]/30 
                transition-all
              "
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option
                            key={num}
                            value={num}
                            className="bg-white text-[#2c3e3a]"
                          >
                            {num} Convidado(s)
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      className="
              w-full 
              bg-[#d4b86a] 
              text-[#2c3e3a] 
              rounded-full 
              py-4 
              font-semibold 
              hover:bg-[#c4a85a] 
              transition-colors 
              shadow-lg 
              hover:shadow-xl
            "
                    >
                      Confirmar Presença
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
          {/* Footer */}
          {/* Footer Minimalista */}
          <footer
            className="
    py-8 
    bg-[#2c3e3a] 
    text-white 
    text-center
  "
          >
            <div className="container mx-auto max-w-4xl px-4">
              <div
                className="
        flex 
        flex-col 
        md:flex-row 
        justify-between 
        items-center 
        space-y-4 
        md:space-y-0
      "
              >
                <div
                  className="
          text-xl 
          font-light 
          tracking-wider
        "
                >
                  Milena <span className="text-[#d4b86a]">&</span> Pedro
                </div>

                <blockquote
                  className="
          text-sm 
          italic 
          text-white/80 
          max-w-xs 
          text-center
        "
                >
                  "O amor é paciente, o amor é bondoso."
                  <cite
                    className="
            block 
            text-[#d4b86a] 
            not-italic 
            text-xs 
            mt-1
          "
                  >
                    1 Coríntios 13:4
                  </cite>
                </blockquote>

                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="
            text-white/80 
            hover:text-[#d4b86a] 
            transition-colors
          "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="
            text-white/80 
            hover:text-[#d4b86a] 
            transition-colors
          "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </div>

              <div
                className="
        mt-6 
        pt-4 
        border-t 
        border-white/20 
        text-xs 
        text-white/60
      "
              >
                © 2027 Milena & Pedro. Todos os direitos reservados.
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
