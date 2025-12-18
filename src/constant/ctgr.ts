import {Category} from "@/types";

export type sidebarCategories = {
    id: string; name: string, children?: Category[];
}

export const categories: sidebarCategories[] = [
    {
        id: "1",
        name: "New Arrivals",
    },
    {
        id: "2",
        name: "Wearables",
    },
    {
        id: "4",
        name: "Women's Fashion",
    },
    {
        id: "5",
        name: "Men's Fashion",
    },
    {id: "6", name: "Shoes"},
    {id: "7", name: "Active Wear Home"},
];
