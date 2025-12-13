import { Product } from "@/types";

export const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    price: 1199,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, suscipit. Nemo alias amet facere! Vel itaque reiciendis tempora excepturi cum recusandae et ipsam voluptatem rem! Quisquam, earum? Minus, aliquid impedit",
    rating: 4.5,
    image: "/images/products/products-five.png",
    discount: {
      percentage: 20,
      campaign: true,
    },
    images: [
      {
        url: "/images/products/products-five.png",
        alt: "Product five",
      },
      {
        url: "/images/products/products-five.png",
        alt: "Product five",
      },
      {
        url: "/images/products/products-five.png",
        alt: "Product five",
      },
      {
        url: "/images/products/products-five.png",
        alt: "Product five",
      },
    ],
    brandName: "Tube Store",
    category: "electronics",
    reviews: [
      {
        user: {
          name: "John doe",
          email: "jone@email.com",
          avatar: "https://i.pravatar.cc/150?img=3",
        },
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, at dolores ea reprehenderit laborum accusamus repellendus alias totam, officiis similique ab rem",
        rating: 5,
        createdAt: "2024-01-15T09:30:00Z",
      },
      {
        user: {
          name: "Natasha Romanoff",
          email: "natasha@email.com",
          avatar: "https://i.pravatar.cc/150?img=5",
        },
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, at dolores ea reprehenderit laborum accusamus repellendus alias totam, officiis similique ab rem",
        rating: 3,
        createdAt: "2024-02-20T14:45:00Z",
      },
    ],
    countInStock: 0,
  },
  {
    id: 2,
    title: "Samsung Galaxy S24",
    price: 999,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, suscipit. Nemo alias amet facere! Vel itaque reiciendis tempora excepturi cum recusandae et ipsam voluptatem rem! Quisquam, earum? Minus, aliquid impedit",
    rating: 4.9,
    image: "/images/products/products-four.png",
    discount: {
      percentage: 30,
      campaign: true,
    },
    images: [
      {
        url: "/images/products/products-four.png",
        alt: "Product four",
      },
      {
        url: "/images/products/products-four.png",
        alt: "Product four",
      },
      {
        url: "/images/products/products-four.png",
        alt: "Product four",
      },
      {
        url: "/images/products/products-four.png",
        alt: "Product four",
      },
    ],
    brandName: "Samsung",
    category: "electronics",
    reviews: [
      {
        user: {
          name: "John doe",
          email: "jone@email.com",
        },
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, at dolores ea reprehenderit laborum accusamus repellendus alias totam, officiis similique ab rem",
        rating: 4,
        createdAt: "2024-03-10T11:20:00Z",
      },
      {
        user: {
          name: "Natasha Romanoff",
          email: "natasha@email.com",
        },
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, at dolores ea reprehenderit laborum accusamus repellendus alias totam, officiis similique ab rem",
        rating: 5,
        createdAt: "2024-04-05T08:15:00Z",
      },
    ],
    countInStock: 6,
  },
  {
    id: 3,
    title: "Google Pixel 8",
    price: 899,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, suscipit. Nemo alias amet facere! Vel itaque reiciendis tempora excepturi cum recusandae et ipsam voluptatem rem! Quisquam, earum? Minus, aliquid impedit",
    rating: 4.3,
    image: "/images/products/products-six.png",
    discount: {
      percentage: 25,
      campaign: true,
    },
    images: [
      {
        url: "/images/products/products-six.png",
        alt: "Product six",
      },
      {
        url: "/images/products/products-six.png",
        alt: "Product six",
      },
      {
        url: "/images/products/products-six.png",
        alt: "Product six",
      },
      {
        url: "/images/products/products-six.png",
        alt: "Product six",
      },
    ],
    brandName: "Sony",
    category: "electronics",
    reviews: [
      {
        user: {
          name: "John doe",
          email: "jone@email.com",
        },
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, at dolores ea reprehenderit laborum accusamus repellendus alias totam, officiis similique ab rem",
        rating: 3,
        createdAt: "2024-05-22T16:00:00Z",
      },
      {
        user: {
          name: "Natasha Romanoff",
          email: "natasha@email.com",
        },
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, at dolores ea reprehenderit laborum accusamus repellendus alias totam, officiis similique ab rem",
        rating: 3,
        createdAt: "2024-06-01T12:10:00Z",
      },
    ],
    countInStock: 15,
  },
  {
    id: 4,
    title: "OnePlus 12",
    price: 749,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, suscipit. Nemo alias amet facere! Vel itaque reiciendis tempora excepturi cum recusandae et ipsam voluptatem rem! Quisquam, earum? Minus, aliquid impedit",
    rating: 4.5,
    image: "/images/products/products-three.png",
    discount: {
      percentage: 15,
      campaign: false,
    },
    images: [
      {
        url: "/images/products/products-three.png",
        alt: "Product three",
      },
      {
        url: "/images/products/products-three.png",
        alt: "Product three",
      },
      {
        url: "/images/products/products-three.png",
        alt: "Product three",
      },
      {
        url: "/images/products/products-three.png",
        alt: "Product three",
      },
    ],
    brandName: "Samsung",
    category: "electronics",
    reviews: [
      {
        user: {
          name: "John doe",
          email: "jone@email.com",
        },
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, at dolores ea reprehenderit laborum accusamus repellendus alias totam, officiis similique ab rem",
        rating: 4,
        createdAt: "2024-07-12T09:00:00Z",
      },
      {
        user: {
          name: "Natasha Romanoff",
          email: "natasha@email.com",
        },
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, at dolores ea reprehenderit laborum accusamus repellendus alias totam, officiis similique ab rem",
        rating: 5,
        createdAt: "2024-08-03T18:30:00Z",
      },
    ],
    countInStock: 25,
  },
  {
    id: 5,
    title: "Google Pixel 8",
    price: 899,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, suscipit. Nemo alias amet facere! Vel itaque reiciendis tempora excepturi cum recusandae et ipsam voluptatem rem! Quisquam, earum? Minus, aliquid impedit",
    rating: 3.7,
    image: "/images/products/products-one.png",
    images: [
      {
        url: "/images/products/products-one.png",
        alt: "Product one",
      },
      {
        url: "/images/products/products-one.png",
        alt: "Product one",
      },
      {
        url: "/images/products/products-one.png",
        alt: "Product one",
      },
      {
        url: "/images/products/products-one.png",
        alt: "Product one",
      },
    ],
    brandName: "Sony",
    category: "Food",
    reviews: [
      {
        user: {
          name: "John doe",
          email: "jone@email.com",
        },
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, at dolores ea reprehenderit laborum accusamus repellendus alias totam, officiis similique ab rem",
        rating: 2,
        createdAt: "2024-09-10T07:25:00Z",
      },
      {
        user: {
          name: "Natasha Romanoff",
          email: "natasha@email.com",
        },
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, at dolores ea reprehenderit laborum accusamus repellendus alias totam, officiis similique ab rem",
        rating: 3,
        createdAt: "2024-09-15T13:40:00Z",
      },
    ],
    countInStock: 18,
  },
  {
    id: 6,
    title: "OnePlus 12",
    price: 749,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, suscipit. Nemo alias amet facere! Vel itaque reiciendis tempora excepturi cum recusandae et ipsam voluptatem rem! Quisquam, earum? Minus, aliquid impedit",
    rating: 4.5,
    image: "/images/products/products-two.png",
    images: [
      {
        url: "/images/products/products-two.png",
        alt: "Product two",
      },
      {
        url: "/images/products/products-two.png",
        alt: "Product two",
      },
      {
        url: "/images/products/products-two.png",
        alt: "Product two",
      },
      {
        url: "/images/products/products-two.png",
        alt: "Product two",
      },
    ],
    brandName: "Samsung",
    category: "Fashion",
    reviews: [
      {
        user: {
          name: "John doe",
          email: "jone@email.com",
        },
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, at dolores ea reprehenderit laborum accusamus repellendus alias totam, officiis similique ab rem",
        rating: 2,
        createdAt: "2024-10-01T10:10:00Z",
      },
      {
        user: {
          name: "Natasha Romanoff",
          email: "natasha@email.com",
        },
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, at dolores ea reprehenderit laborum accusamus repellendus alias totam, officiis similique ab rem",
        rating: 4,
        createdAt: "2024-10-05T15:55:00Z",
      },
    ],
    countInStock: 20,
  },
];
