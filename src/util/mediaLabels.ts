import { Media } from "../media";

export const getMediaLabels = (media: Media) => {
  if (media.type === "film") {
    return {
      titleLabel: "Film",
      title: media.title,
      subtitleLabel: "Director",
      subtitle: media.director,
    };
  } else {
    return {
      titleLabel: "Album",
      title: media.album,
      subtitleLabel: "Artist",
      subtitle: media.artist,
    };
  }
};
