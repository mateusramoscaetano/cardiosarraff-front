export function FormTitle({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-semibold uppercase w-full bg-primary text-pink-card text-center p-1 rounded-t-3xl">
      {title}
    </h2>
  );
}
