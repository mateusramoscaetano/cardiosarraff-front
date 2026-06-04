import { Client } from "@/@types/client";

interface IHeaderClientProps {
  client?: Client;
}

export function HeaderClient({ client }: IHeaderClientProps) {
  return (
    <div className="space-y-1">
      <div className="font-bold text-lg">Olá, {client?.name}</div>
      {client?.userName && (
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          Usuário: {client.userName}
        </div>
      )}
    </div>
  );
}
