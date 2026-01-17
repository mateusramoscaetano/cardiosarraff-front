import { RequisitionFormData } from "../form/requisition-form/types";
import Image from "next/image";
import { format } from "date-fns";

interface RequisitionFormPDFProps {
  data: RequisitionFormData;
}

export function RequisitionFormPDF({ data }: RequisitionFormPDFProps) {
  return (
    <div className="relative w-[794px] h-[1123px] bg-white">
      {/* Imagem de fundo do formulário */}
      <Image
        src="/exavet-page-1.jpg"
        alt="Formulário"
        width={794}
        height={1123}
        className="absolute top-0 left-0"
      />

      {/* Dados do laboratório */}
      <div className="absolute top-[90px] right-[30px] text-sm">
        <div>
          {format(new Date(data.collectDate), "dd 'de' MMMM 'de' yyyy")}
        </div>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.laboratoryUse?.paid ?? false}
              readOnly
              className="mr-1"
            />
            Pago
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.laboratoryUse?.invoiced ?? false}
              readOnly
              className="mr-1"
            />
            Faturado
          </label>
        </div>
      </div>

      {/* Dados cadastrais */}
      <div className="absolute top-[170px] left-[30px] right-[30px]">
        <div className="flex justify-between">
          <div className="flex-1">
            <span className="text-sm">Clínica: {data.clinicName}</span>
          </div>
          <div className="flex-1">
            <span className="text-sm">Nome do Animal: {data.petName}</span>
          </div>
          <div>
            <span className="text-sm">Idade: {data.age}</span>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex-1">
            <span className="text-sm">Espécie: {data.specie}</span>
          </div>
          <div className="flex-1">
            <span className="text-sm">Raça: {data.race}</span>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={data.gender === "Macho"}
                readOnly
                className="mr-1"
              />
              Macho
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={data.gender === "Fêmea"}
                readOnly
                className="mr-1"
              />
              Fêmea
            </label>
          </div>
        </div>

        <div className="mt-4">
          <span className="text-sm">Nome do Proprietário: {data.petOwner}</span>
        </div>

        <div className="mt-4">
          <span className="text-sm">
            Nome do Veterinário: {data.doctorName}
          </span>
          <span className="text-sm ml-4">CRMV: {data.doctorCrmv}</span>
        </div>

        <div className="mt-4">
          <span className="text-sm">Email: {data.email}</span>
        </div>
      </div>

      {/* Data e Material */}
      <div className="absolute top-[340px] left-[30px] right-[30px]">
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Data: {format(new Date(data.collectDate), "dd/MM/yyyy")}
          </span>
          <span className="text-sm">Hora da Coleta: {data.collectTime}</span>
          <span className="text-sm">Material:</span>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={data.material.includes("Sangue")}
                readOnly
                className="mr-1"
              />
              Sangue
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={data.material.includes("Urina")}
                readOnly
                className="mr-1"
              />
              Urina
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={data.material.includes("Fezes")}
                readOnly
                className="mr-1"
              />
              Fezes
            </label>
          </div>
        </div>
      </div>

      {/* Solicitação de Exames */}
      <div className="absolute top-[400px] left-[30px] right-[30px]">
        <div className="grid grid-cols-3 gap-4">
          {/* Check Up I */}
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.examRequests.checkUpI}
              readOnly
              className="mr-1"
            />
            Check Up I
          </label>

          {/* Check Up II */}
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.examRequests.checkUpII}
              readOnly
              className="mr-1"
            />
            Check Up II
          </label>

          {/* Check Up Completo */}
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.examRequests.checkUpCompleto}
              readOnly
              className="mr-1"
            />
            Check Up Completo
          </label>
        </div>

        {/* Perfis */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.examRequests.perfilFelino}
              readOnly
              className="mr-1"
            />
            Perfil Felino
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.examRequests.perfilGeriatrico}
              readOnly
              className="mr-1"
            />
            Perfil Geriátrico
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.examRequests.perfilHepatico}
              readOnly
              className="mr-1"
            />
            Perfil Hepático
          </label>
        </div>

        {/* Mais perfis */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.examRequests.perfilNeoplastico}
              readOnly
              className="mr-1"
            />
            Perfil Neoplástico
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.examRequests.perfilRenal}
              readOnly
              className="mr-1"
            />
            Perfil Renal
          </label>
        </div>

        {/* Perfis Pancreáticos */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.examRequests.perfilPancreaticoCaninoI}
              readOnly
              className="mr-1"
            />
            Perfil Pancreático Canino I
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.examRequests.perfilPancreaticoFelinoI}
              readOnly
              className="mr-1"
            />
            Perfil Pancreático Felino I
          </label>
        </div>

        {/* Lipase */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.examRequests.lipasePancreaticaCanina}
              readOnly
              className="mr-1"
            />
            Lipase Pancreática Canina
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.examRequests.lipasePancreaticaFelina}
              readOnly
              className="mr-1"
            />
            Lipase Pancreática Felina
          </label>
        </div>

        {/* Outros exames */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.examRequests.citologiaOtologicaUnilateral}
              readOnly
              className="mr-1"
            />
            Citologia Otológica Unilateral
          </label>
        </div>

        {/* Citologia da Pele */}
        {data.examRequests.citologiaDaPele?.checked && (
          <div className="mt-4">
            <div className="text-sm">
              <div>
                Região da amostra:{" "}
                {data.examRequests.citologiaDaPele.regiaoAmostra}
              </div>
              <div>
                Tempo de evolução:{" "}
                {data.examRequests.citologiaDaPele.tempoEvolucao}
              </div>
              <div>
                Suspeita clínica:{" "}
                {data.examRequests.citologiaDaPele.suspeitaClinica}
              </div>
              <div>
                Considerações: {data.examRequests.citologiaDaPele.consideracoes}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Observações */}
      <div className="absolute bottom-[30px] left-[30px] right-[30px]">
        <div className="text-sm">
          <div>Observações: {data.observations}</div>
        </div>
      </div>
    </div>
  );
}
