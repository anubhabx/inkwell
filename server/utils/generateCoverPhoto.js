const images = [
  "https://images.pexels.com/photos/1323206/pexels-photo-1323206.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1323206/pexels-photo-1323206.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2170729/pexels-photo-2170729.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1698482/pexels-photo-1698482.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/4947406/pexels-photo-4947406.jpeg?auto=compress&cs=tinysrgb&w=600",
];

export const generateCoverPhoto = () => {
  return images[Math.floor(Math.random() * images.length)];
};
