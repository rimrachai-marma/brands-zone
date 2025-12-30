"use client";
import Link from "next/link";
import Image from "next/image";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {NAVBAR_DATA} from "@/constant/navbarData";
import {useIsMobile} from "@/hooks/use-mobile";
import {FeaturedBrand, getFeaturedBrands} from "@/lib/actions/user/brands";
import {useEffect, useState} from "react";
import {ChevronRight, Star, TrendingUp, Sparkles} from "lucide-react";
import {cn} from "@/lib/utils";
import {getCategories} from "@/lib/actions/categories";
import {getProducts} from "@/lib/actions/products";
import {getUserRandomProducts} from "@/lib/actions/user/products";
import {UserProduct} from "@/types";

interface Category {
    id: string;
    name: string;
    image_url?: string;
    products_count?: number;
    slug?: string;
}

export function NavbarList() {
    const [brands, setBrands] = useState<FeaturedBrand[] | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<UserProduct[] | null>([]);
    const [loadingBrands, setLoadingBrands] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const isMobile = useIsMobile();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const result = await getFeaturedBrands();
                setBrands(result.data?.slice(0, 12) || []);
            } catch (error) {
                console.error("Failed to fetch brands:", error);
                setBrands([]);
            } finally {
                setLoadingBrands(false);
            }
        };
        fetchBrands();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await getCategories({
                    per_page: 6,
                    with_products_count: 1,
                    root_only: 1,
                });
                setCategories(result.data || []);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setCategories([]);
            } finally {
                setLoadingCategories(false);
            }
        };
        fetchCategories();
    }, []);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getUserRandomProducts({limit: '4', is_new: true});
                console.log(result);
                if (result.status === 'success') {
                    setProducts(result.data);
                }
            } catch (e) {
                setProducts([])
            }
        }

        fetchProducts();
    }, [])

    return (
        <NavigationMenu viewport={isMobile}>
            <NavigationMenuList className="gap-8">
                {NAVBAR_DATA.map((item) => (
                    <NavigationMenuItem key={item.id}>
                        {item.title === "Brands" ? (
                            <>
                                <NavigationMenuTrigger
                                    className="group relative text-sm font-medium transition-colors data-[state=open]:text-primary">
                                    <Link href={'/brands-list'}>Brands</Link>
                                </NavigationMenuTrigger>
                                <div className="absolute -left-205">
                                    <NavigationMenuContent className="z-50 p-0 overflow-hidden">
                                        <div className="grid grid-cols-12 w-[95vw]">
                                            {/* Categories Sidebar */}
                                            <div className="col-span-3 border-r border-gray-100 bg-gray-50/50 p-6">
                                                <div className="mb-6">
                                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                                                        Categories
                                                    </h3>
                                                    <div className="space-y-1">
                                                        {loadingCategories ? (
                                                            Array(6)
                                                                .fill(0)
                                                                .map((_, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg animate-pulse"
                                                                    >
                                                                        <div
                                                                            className="w-8 h-8 rounded-full bg-gray-200"></div>
                                                                        <div className="flex-1">
                                                                            <div
                                                                                className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                                                                            <div
                                                                                className="h-3 bg-gray-100 rounded w-16"></div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                        ) : (
                                                            categories.map((category) => (
                                                                <Link
                                                                    key={category.id}
                                                                    href={`/category/${category.slug || category.name.toLowerCase()}`}
                                                                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:bg-white hover:shadow-sm"
                                                                >
                                                                    <div className="relative">
                                                                        {category.image_url ? (
                                                                            <div
                                                                                className="w-8 h-8 rounded-full overflow-hidden">
                                                                                <Image
                                                                                    src={category.image_url}
                                                                                    alt={category.name}
                                                                                    width={32}
                                                                                    height={32}
                                                                                    className="object-cover"
                                                                                />
                                                                            </div>
                                                                        ) : (
                                                                            <span
                                                                                className="text-2xl flex items-center justify-center w-8 h-8">
      No Image
                                      </span>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                    <span
                                        className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors truncate block">
                                      {category.name}
                                    </span>
                                                                        {category.products_count !== undefined && (
                                                                            <span className="text-xs text-gray-500">
                                        {category.products_count} products
                                      </span>
                                                                        )}
                                                                    </div>
                                                                    <ChevronRight
                                                                        className="ml-auto h-3.5 w-3.5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"/>
                                                                </Link>
                                                            ))
                                                        )}
                                                    </div>
                                                </div>

                                                <Link
                                                    href="/categories"
                                                    className="mt-6 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors"
                                                >
                                                    View All
                                                    <ChevronRight className="h-4 w-4"/>
                                                </Link>
                                            </div>

                                            {/* Featured Brands */}
                                            <div className="col-span-6 p-8">
                                                <div className="mb-6">
                                                    <div className="flex items-baseline gap-3 mb-2">
                                                        <h3 className="text-xl font-semibold text-gray-900">Featured
                                                            Brands</h3>
                                                        <span
                                                            className="text-sm text-gray-500">Curated collections</span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-4 gap-3 mb-6">
                                                    {loadingBrands ? (
                                                        Array(8)
                                                            .fill(0)
                                                            .map((_, i) => (
                                                                <div key={i}
                                                                     className="aspect-square rounded-lg bg-gray-100 animate-pulse"/>
                                                            ))
                                                    ) : (
                                                        brands?.slice(0, 8).map((brand) => (
                                                            <Link
                                                                key={brand.id}
                                                                href={`/brands-list/${brand.id}`}
                                                                className="group relative flex flex-col items-center justify-center p-4 rounded-lg border border-gray-100 hover:border-gray-900 hover:shadow-md transition-all duration-300"
                                                            >
                                                                <div className="relative h-14 w-14 mb-2">
                                                                    {brand.logo ? (
                                                                        <Image
                                                                            src={brand.logo}
                                                                            alt={brand.shop_name}
                                                                            fill
                                                                            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                                                                            sizes="56px"
                                                                        />
                                                                    ) : (
                                                                        <div
                                                                            className="h-full w-full rounded-full bg-gray-100 flex items-center justify-center">
                                      <span className="text-lg font-bold text-gray-400">
                                        {brand.shop_name?.charAt(0) || "B"}
                                      </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <span
                                                                    className="text-xs font-medium text-gray-900 text-center line-clamp-1">
                                  {brand.shop_name}
                                </span>
                                                            </Link>
                                                        ))
                                                    )}
                                                </div>

                                                {/* Quick Actions */}
                                                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                                                    <Link
                                                        href="/brands?filter=new"
                                                        className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all"
                                                    >
                                                        <div
                                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 group-hover:bg-gray-900 transition-colors">
                                                            <Sparkles
                                                                className="h-4 w-4 text-gray-600 group-hover:text-white"/>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900">New
                                                                Arrivals
                                                            </div>
                                                            <div className="text-xs text-gray-500">Latest brands</div>
                                                        </div>
                                                    </Link>
                                                    <Link
                                                        href="/brands?filter=popular"
                                                        className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all"
                                                    >
                                                        <div
                                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 group-hover:bg-gray-900 transition-colors">
                                                            <TrendingUp
                                                                className="h-4 w-4 text-gray-600 group-hover:text-white"/>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-gray-900">Most
                                                                Popular
                                                            </div>
                                                            <div className="text-xs text-gray-500">Top rated</div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* Trending Sidebar */}
                                            <div className="col-span-3 border-l border-gray-100 bg-gray-50/50 p-6">
                                                <div className="mb-6">
                                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                                                        <TrendingUp className="h-3.5 w-3.5"/>
                                                        Trending Products Now
                                                    </h3>
                                                    <div className="space-y-3">
                                                        {products?.map((brand, idx) => (
                                                            <Link
                                                                key={idx}
                                                                href={`/brand/${brand.title.toLowerCase()}`}
                                                                className="group flex p-3 gap-2s rounded-lg hover:bg-white hover:shadow-sm transition-all"
                                                            >
                                                              <div className="relative">
                                                                {brand.image ? (
                                                                    <div className="w-10 h-10 overflow-hidden mx-auto">
                                                                      <Image
                                                                          src={brand.image}
                                                                          alt={brand.title}
                                                                          width={32}
                                                                          height={32}
                                                                          className="object-cover"
                                                                      />
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-2xl flex items-center justify-center w-8 h-8">
      No Image
                                      </span>
                                                                )}
                                                              </div>
                                                                <div className={'w-full'}>
                                                                  <div
                                                                      className="flex items-center justify-between w-full mb-1.5">
                                  <span className="text-sm font-medium text-gray-900 group-hover:text-primary">
                                    {brand.title}
                                  </span>
                                                                    <ChevronRight
                                                                        className="h-3.5 w-3.5 text-gray-300 group-hover:text-gray-900 transition-colors"/>
                                                                  </div>
                                                                  <div className="flex items-center gap-1">
                                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                                        <Star
                                                                            key={star}
                                                                            className={cn(
                                                                                "h-3 w-3",
                                                                                star <= Math.floor(brand.rating)
                                                                                    ? "text-gray-900 fill-gray-900"
                                                                                    : "text-gray-200 fill-gray-200"
                                                                            )}
                                                                        />
                                                                    ))}

                                                                  </div>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* CTA Card */}
                                                <div className="mt-8 pt-6 border-t border-gray-200">
                                                    <div className="rounded-lg bg-primary p-5 text-white">
                                                        <h4 className="text-sm font-semibold mb-2">Exclusive
                                                            Collections</h4>
                                                        <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                                                            Discover handpicked premium brands
                                                        </p>
                                                        <Link
                                                            href="/brands"
                                                            className="inline-flex items-center gap-2 text-xs font-medium text-white hover:text-gray-200 transition-colors"
                                                        >
                                                            Explore All
                                                            <ChevronRight className="h-3.5 w-3.5"/>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </NavigationMenuContent>
                                </div>
                            </>
                        ) : item.child ? (
                            <>
                                <NavigationMenuTrigger
                                    className="text-sm font-medium transition-colors data-[state=open]:text-primary">
                                    {item.title}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="min-w-[220px] p-2">
                                    <div className="space-y-1">
                                        {item.child.map((child) => (
                                            <NavigationMenuLink key={child.id} asChild>
                                                <Link
                                                    href={child.url || "#"}
                                                    className="group flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all"
                                                >
                                                    <span className="font-medium">{child.title}</span>
                                                    <ChevronRight
                                                        className="h-3.5 w-3.5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                                </Link>
                                            </NavigationMenuLink>
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            </>
                        ) : (
                            <NavigationMenuLink asChild>
                                <Link
                                    href={item.url || "#"}
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                >
                                    {item.title}
                                </Link>
                            </NavigationMenuLink>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}