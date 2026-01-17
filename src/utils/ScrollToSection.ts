export const scrollToSection = (
  sectionId: string,
  offset: number = 0
): void => {
  const section = document.getElementById(sectionId);
  if (section) {
    const scrollTo = section.offsetTop - offset;
    window.scrollTo({ top: scrollTo, behavior: "smooth" });
  } else {
    console.warn(`Section with id "${sectionId}" not found`);
  }
};
