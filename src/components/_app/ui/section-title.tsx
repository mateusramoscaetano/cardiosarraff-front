interface SectionTitleProps {
  smallText: string;
  title: string;
  description?: string;
  smallTextColor?: string;
  titleColor?: string;
  descriptionColor?: string;
}

export function SectionTitle({
  smallText,
  title,
  description,
  smallTextColor = "text-[#5C4373]",
  titleColor = "text-gray-900",
  descriptionColor = "text-gray-600",
}: SectionTitleProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-12">
      <div className="flex-1">
        <p className={`text-sm font-semibold ${smallTextColor} mb-2 underline decoration-2 underline-offset-4`}>
          {smallText}
        </p>
        <h2 className={`text-4xl md:text-5xl font-bold ${titleColor} leading-tight`}>
          {title}
        </h2>
      </div>
      {description && (
        <p className={`text-lg max-w-md leading-relaxed ${descriptionColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}