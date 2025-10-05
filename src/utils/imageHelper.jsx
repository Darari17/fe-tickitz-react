export const getAdminImageUrl = (path) => {
  if (!path) return "/no-image.png";
  return `${import.meta.env.VITE_BE_TICKITZ_API}/img${
    path.startsWith("/") ? path : `/${path}`
  }`;
};

export const getTmdbImageUrl = (path) => {
  if (!path) return "/no-image.png";
  return `${import.meta.env.VITE_TMDB_API_IMAGE_URL}${path}`;
};

export const getPosterUrl = (path) => {
  if (!path) return "/images/placeholder-poster.svg";

  if (path.includes("poster") || path.includes("backdrop")) {
    const fixedPath = path.startsWith("/") ? path : `/${path}`;
    return `${import.meta.env.VITE_BE_TICKITZ_API}/img${fixedPath}`;
  }

  if (path.startsWith("/")) {
    return `${import.meta.env.VITE_TMDB_API_IMAGE_URL}${path}`;
  }

  if (path.startsWith("http")) {
    return path;
  }

  return "/images/placeholder-poster.svg";
};

export const getBackdropUrl = (path) => {
  if (!path) return "/images/placeholder-backdrop.svg";

  if (path.includes("backdrop")) {
    const fixedPath = path.startsWith("/") ? path : `/${path}`;
    return `${import.meta.env.VITE_BE_TICKITZ_API}/img${fixedPath}`;
  }

  if (path.startsWith("/")) {
    return `${import.meta.env.VITE_TMBD_API_HERO_URL}${path}`;
  }

  if (path.startsWith("http")) return path;

  return "/images/placeholder-backdrop.svg";
};
