export const generateSlug = (title: string, maxLength = 40): string => {
  let slug = title.toLowerCase().replace(/[\s.,']/g, '-');
  if (slug.length > maxLength) {
    slug = slug.substring(0, maxLength);
  }
  if (slug.endsWith('-')) {
    slug = slug.slice(0, -1);
  }
  return slug;
};
