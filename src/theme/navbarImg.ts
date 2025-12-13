export const NAVBAR_IMAGES = Object.freeze([
  "/images/products/home-one.jpg",
  "/images/products/home-two.jpg",
  "/images/products/home-three.jpg",
  "/images/products/home-four.jpg",
  "/images/products/home-five.jpg",
  "/images/products/home-six.jpg",
] as const);

export type NavbarImage = typeof NAVBAR_IMAGES[number];
