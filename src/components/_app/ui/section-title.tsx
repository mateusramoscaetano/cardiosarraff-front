interface SectionTitleProps {
  smallText?: string;
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
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12">
      <div className="flex-1">
        {smallText && (
          <p className={`text-xs sm:text-sm font-semibold ${smallTextColor} mb-2 underline decoration-2 underline-offset-4`}>
            {smallText}
          </p>
        )}
        <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${titleColor} leading-tight`}>
          {title}
        </h2>
      </div>
      {description && (
        <p className={`text-sm sm:text-base md:text-lg max-w-md leading-relaxed ${descriptionColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}