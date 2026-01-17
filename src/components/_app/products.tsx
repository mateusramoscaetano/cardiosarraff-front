import Image from "next/image";
import { Button } from "../ui/button";

export function Products() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "554130810360";
    const message = "Olá! Gostaria de marcar um exame na Exavet.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handlePhoneClick = () => {
    window.open("tel:+554130810360", "_self");
  };

  const handleMapsClick = () => {
    const address =
      "R. Voluntários da Pátria, 1393, Centro, São José dos Pinhais - PR";
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div
      id="service"
      className="w-full h-full flex flex-col max-w-[1440px] items-center mx-auto text-primary font-productSans gap-4 relative mt-24 sm:mt-52 xl:mt-40 mb-20 lg:mb-40"
    >
      <h1 className="text-sm font-medium">Serviços</h1>

      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl lg:text-5xl font-volkhov font-bold text-primary w-full antialiased text-center mb-4 sm:mb-8">
          Cuidado 360º
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-6 lg:px-8 w-full">
          {/* Raio-X Card */}
          <div className="w-full sm:w-1/2 lg:w-1/5 bg-white rounded-lg p-6 transition-all duration-300 hover:shadow-xl cursor-pointer">
            <div className="flex flex-col items-center text-center gap-3">
              <Image
                src="/raio-x.svg"
                alt="raio-x"
                width={100}
                height={100}
                className="w-16 h-16"
              />
              <h3 className="text-lg font-semibold text-gray-800">Raio-X</h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-[200px]">
                Diagnóstico rápido com imagens precisas e seguras para seu pet.
              </p>
            </div>
          </div>

          {/* Tomografia Card */}
          <div className="w-full sm:w-1/2 lg:w-1/5 bg-white rounded-lg p-6 transition-all duration-300 hover:shadow-xl cursor-pointer">
            <div className="flex flex-col items-center text-center gap-3">
              <Image
                src="/tomografia.svg"
                alt="tomografia"
                width={100}
                height={100}
                className="w-16 h-16"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                Tomografia
              </h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-[200px]">
                Exame avançado para diagnósticos complexos e completos.
              </p>
            </div>
          </div>

          {/* Cardiologia Card */}
          <div className="w-full sm:w-1/2 lg:w-1/5 bg-white rounded-lg p-6 transition-all duration-300 hover:shadow-xl cursor-pointer">
            <div className="flex flex-col items-center text-center gap-3">
              <Image
                src="/cardiologia.svg"
                alt="cardiologia"
                width={100}
                height={100}
                className="w-16 h-16"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                Cardiologia
              </h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-[200px]">
                Monitoramos o coração do seu pet com carinho e precisão.
              </p>
            </div>
          </div>

          {/* Exames Laboratoriais Card */}
          <div className="w-full sm:w-1/2 lg:w-1/5 bg-white rounded-lg p-6 transition-all duration-300 hover:shadow-xl cursor-pointer">
            <div className="flex flex-col items-center text-center gap-3">
              <Image
                src="/exames.svg"
                alt="exames-laboratoriais"
                width={100}
                height={100}
                className="w-16 h-16"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                Exames Laboratoriais
              </h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-[200px]">
                Análises completas que ajudam a entender a saúde do pet.
              </p>
            </div>
          </div>

          {/* Ultrassonografia Card */}
          <div className="w-full sm:w-1/2 lg:w-1/5 bg-white rounded-lg p-6 transition-all duration-300 hover:shadow-xl cursor-pointer">
            <div className="flex flex-col items-center text-center gap-3">
              <Image
                src="/ultrasound.svg"
                alt="ultrassonografia"
                width={100}
                height={100}
                className="w-16 h-16"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                Ultrassonografia
              </h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-[200px]">
                Diagnóstico por imagem com conforto e precisão.
              </p>
            </div>
          </div>
        </div>

        {/* Novo CTA após os serviços */}
        <div className="mt-12 text-center bg-exa-pink/10 py-10 w-full">
          <h3 className="text-2xl lg:text-3xl font-volkhov font-bold text-primary mb-6 px-2">
            Pronto para cuidar do seu pet?
          </h3>
          <Button
            onClick={handleWhatsAppClick}
            className="bg-exa-pink hover:bg-exa-pink/90 text-primary font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Clique aqui para marcar o exame
          </Button>
        </div>

        {/* Informações de contato na segunda dobra */}
        <div className="mt-16 w-full max-w-4xl  rounded-2xl p-8">
          <h3 className="text-2xl lg:text-3xl font-volkhov font-bold text-primary text-center mb-8">
            Entre em contato conosco
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Telefone */}
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/icons/phone.svg"
                  alt="telefone"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <h4 className="text-lg font-semibold text-primary mb-2">
                Telefone
              </h4>
              <button
                onClick={handlePhoneClick}
                className="text-lg text-primary hover:text-exa-pink transition-colors duration-300 cursor-pointer"
              >
                (41) 3081-0360
              </button>
            </div>

            {/* Email */}
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-primary mb-2">Email</h4>
              <a
                href="mailto:contato@exavet.com.br"
                className="text-lg text-primary hover:text-exa-pink transition-colors duration-300"
              >
                contato@exavet.com.br
              </a>
            </div>

            {/* Endereço */}
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/icons/maps.svg"
                  alt="endereço"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <h4 className="text-lg font-semibold text-primary mb-2">
                Endereço
              </h4>
              <button
                onClick={handleMapsClick}
                className="text-lg text-primary hover:text-exa-pink transition-colors duration-300 cursor-pointer text-center"
              >
                R. Voluntários da Pátria, 1393
                <br />
                Centro | São José dos Pinhais
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
