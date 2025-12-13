import { Categories } from "@/types";

export const categories: Categories = [
  {
    id: "1",
    name: "Electronics",
    children: [
      {
        id: "1-1",
        name: "Laptops & Computers",
        children: [
          { id: "1-1-1", name: "Traditional Laptops" },
          { id: "1-1-2", name: "2 in 1 Laptops" },
          { id: "1-1-3", name: "Gaming Laptops" },
          { id: "1-1-4", name: "Laptop Accessories" },
        ],
      },
      {
        id: "1-2",
        name: "TV & Home Theater",
        children: [
          { id: "1-2-1", name: "Televisions" },
          { id: "1-2-2", name: "Soundbars" },
          { id: "1-2-3", name: "Projectors" },
        ],
      },
      { id: "1-3", name: "Cell Phones & Accessories" },
      { id: "1-4", name: "Headphones" },
      { id: "1-5", name: "Video Games" },
    ],
  },
  {
    id: "2",
    name: "Computers",
    children: [
      {
        id: "2-1",
        name: "Computer Accessories",
        children: [
          { id: "2-1-1", name: "Keyboards" },
          { id: "2-1-2", name: "Mice" },
          { id: "2-1-3", name: "Webcams" },
        ],
      },
      { id: "2-2", name: "Computer Components" },
      { id: "2-3", name: "Laptops" },
      { id: "2-4", name: "Monitors" },
    ],
  },
  {
    id: "3",
    name: "Smart Home",
    children: [
      { id: "3-1", name: "Amazon Echo & Alexa" },
      { id: "3-2", name: "Smart Home Lighting" },
      { id: "3-3", name: "Security Cameras" },
    ],
  },
  {
    id: "4",
    name: "Women's Fashion",
    children: [
      { id: "4-1", name: "Clothing" },
      { id: "4-2", name: "Shoes" },
      { id: "4-3", name: "Jewelry" },
    ],
  },
  {
    id: "5",
    name: "Men's Fashion",
    children: [
      { id: "5-1", name: "Clothing" },
      { id: "5-2", name: "Shoes" },
      { id: "5-3", name: "Watches" },
    ],
  },
  { id: "6", name: "Books" },
  { id: "7", name: "Sports & Outdoors" },
  { id: "8", name: "Home & Kitchen" },
];
