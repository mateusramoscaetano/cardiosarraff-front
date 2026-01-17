import { Client } from "@/@types/client";

interface IHeaderClientProps {
  client?: Client;
}

export function HeaderClient({ client }: IHeaderClientProps) {
  return (
    <>
      <div className="font-bold text-[18px]">Olá, {client?.name}</div>
    </>
  );
}
