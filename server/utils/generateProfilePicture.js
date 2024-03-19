import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";

export const generateProfilePicture = (username) => {
  const svg = createAvatar(thumbs, {
    seed: username,
    size: 128,
  });

  return svg.toDataUriSync();
};
