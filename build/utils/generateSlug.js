"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSlug = void 0;
const generateSlug = (title, maxLength = 40) => {
  let slug = title.toLowerCase().replace(/[\s.,']/g, '-');
  if (slug.length > maxLength) {
    slug = slug.substring(0, maxLength);
  }
  if (slug.endsWith('-')) {
    slug = slug.slice(0, -1);
  }
  return slug;
};
exports.generateSlug = generateSlug;