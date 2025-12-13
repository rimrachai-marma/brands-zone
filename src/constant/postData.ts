import { Post, RecentPost } from "@/types";

export const POST_DATA: Post[] = [
  {
    id: "1",
    title: "Mastering Framer Motion for Stunning React Animations",
    image: "/images/hot/headphone.avif",
    slug: "seating-collection-1",
    content: `
      <p>Framer Motion is a powerful animation library for React that lets you create smooth and interactive animations with ease. It’s built for production and integrates seamlessly with React components.</p>
      <h3>Why Use Framer Motion?</h3>
      <p>Framer Motion provides an intuitive API for animations, layout transitions, gestures, and more. Whether you’re building a portfolio or a production-grade app, it offers the performance and flexibility you need.</p>
      <p>Try using <code>motion.div</code> for simple transitions, or animate layout changes with <code>AnimatePresence</code>. It’s also great for scroll-based animations.</p>
    `,
    author: "Muhammad Maruf",
    authorAvatar: "/images/brands/brand-1.png",
    category: "React",
    commentsCount: 3,
    comments: [
      {
        id: "c1",
        name: "Ahsan Rahman",
        avatar: "/images/brands/brand-1.png",
        message:
          "Great write-up! Framer Motion made my React animations much smoother.",
        date: "2025-10-25",
        replies: [
          {
            id: "r1",
            name: "Muhammad Maruf",
            message:
              "Glad to hear that! It’s one of my favorite animation libraries too.",
          },
        ],
      },
      {
        id: "c2",
        name: "Sara Khan",
        avatar: "/images/brands/brand-1.png",
        message: "Can you write more about AnimatePresence usage?",
        date: "2025-10-26",
      },
    ],
  },
  {
    id: "2",
    title: "Optimizing Next.js Images for Better Performance",
    image: "/images/hot/tv.avif",
    slug: "exterior-ideas",
    content: `
      <p>Next.js Image Optimization helps you load images efficiently. It automatically resizes, optimizes, and serves images in modern formats like WebP.</p>
      <p>To ensure your images load fast, use <code>priority</code> for above-the-fold images and <code>loading="lazy"</code> for the rest.</p>
      <h3>Bonus Tip</h3>
      <p>Combine the Next.js Image component with a CDN for even faster performance, especially for global audiences.</p>
    `,
    author: "Emily Carter",
    authorAvatar: "/images/brands/brand-1.png",
    category: "Next.js",
    commentsCount: 2,
    comments: [
      {
        id: "c3",
        name: "Ariful Islam",
        avatar: "/images/brands/brand-1.png",
        message: "This helped me improve my site speed score! Thanks!",
        date: "2025-10-27",
      },
      {
        id: "c4",
        name: "Nadia Chowdhury",
        avatar: "/images/brands/brand-1.png",
        message: "Good advice. The priority prop made a big difference for me.",
        date: "2025-10-28",
        replies: [
          {
            id: "r2",
            name: "Emily Carter",
            message:
              "That’s awesome! Keep testing with Lighthouse for best results.",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Building Accessible Forms with React Hook Form and Zod",
    image: "/images/hot/watch.avif",
    slug: "creative-water-features",
    content: `
      <p>React Hook Form and Zod make form validation in React apps simple and efficient. Zod handles the schema validation, while React Hook Form manages form state efficiently.</p>
      <h3>Benefits</h3>
      <ul>
        <li>Less re-rendering than Formik</li>
        <li>TypeScript friendly</li>
        <li>Clean and modular validation logic</li>
      </ul>
      <p>Together, they offer a lightweight and developer-friendly way to handle forms in your application.</p>
    `,
    author: "Liam Anderson",
    authorAvatar: "/images/brands/brand-1.png",
    category: "React",
    commentsCount: 4,
    comments: [
      {
        id: "c5",
        name: "Tanvir Hasan",
        avatar: "/images/brands/brand-1.png",
        message: "This combo works great! Much better than Formik for me.",
        date: "2025-10-27",
      },
      {
        id: "c6",
        name: "Sophia Ahmed",
        avatar: "/images/brands/brand-1.png",
        message: "Can you show an example with nested form fields?",
        date: "2025-10-27",
        replies: [
          {
            id: "r3",
            name: "Liam Anderson",
            message: "Absolutely! I’ll add that in the next article.",
          },
        ],
      },
    ],
  },
];

export const RECENT_POSTS: RecentPost[] = [
  {
    id: 101,
    title: "Seating Collection Inspiration Is Not Enough For People",
    slug: "seating-collection-1",
  },
  {
    id: 102,
    title: "Exterior Ideas: 10 Colored Fiber Garden Seats",
    slug: "exterior-ideas",
  },
  {
    id: 103,
    title: "Creative Water Features And Exterior Design",
    slug: "creative-water-features",
  },
  {
    id: 104,
    title: "Seating Collection Inspiration Is Not Enough For People",
    slug: "seating-collection-2",
  },
  { id: 105, title: "Hello world!", slug: "hello-world" },
];

export const RECENT_COMMENTS = [
  "Great article, very inspiring!",
  "I disagree with point three...",
  "Thanks for the tip on seating!",
];
