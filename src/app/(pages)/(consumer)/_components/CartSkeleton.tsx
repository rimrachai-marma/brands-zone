import {Skeleton} from "@/components/ui/skeleton";


const CartSkeleton = ({length}:{length:number})=>{
    return (
        <section className="py-6 md:py-12 px-4">
            <div className="container mx-auto">
                <Skeleton className="h-10 w-64 mb-6" />

                {/* Desktop Skeleton */}
                <div className="hidden md:block">
                    <div className="border border-gray-200 rounded-lg">
                        <div className="p-4 border-b">
                            <div className="grid grid-cols-5 gap-4">
                                <Skeleton className="h-6" />
                                <Skeleton className="h-6" />
                                <Skeleton className="h-6" />
                                <Skeleton className="h-6" />
                                <Skeleton className="h-6" />
                            </div>
                        </div>

                        {/* Skeleton rows */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 border-b">
                                <div className="grid grid-cols-5 gap-4 items-center">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="w-16 h-16 rounded" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-5 w-48" />
                                            <Skeleton className="h-4 w-32" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-6 w-20 justify-self-end" />
                                    <div className="flex justify-center">
                                        <div className="inline-flex items-center gap-2">
                                            <Skeleton className="h-8 w-8 rounded-full" />
                                            <Skeleton className="h-6 w-6" />
                                            <Skeleton className="h-8 w-8 rounded-full" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-7 w-24 justify-self-end" />
                                    <Skeleton className="h-9 w-9 rounded-full justify-self-end" />
                                </div>
                            </div>
                        ))}

                        {/* Footer skeleton */}
                        <div className="p-4 bg-gray-100">
                            <div className="grid grid-cols-5 gap-4 items-center">
                                <div className="col-span-2">
                                    <Skeleton className="h-7 w-40" />
                                </div>
                                <Skeleton className="h-7 w-24 justify-self-end" />
                                <Skeleton className="h-8 w-32 justify-self-end" />
                                <div className="flex justify-end gap-3">
                                    <Skeleton className="h-10 w-28" />
                                    <Skeleton className="h-10 w-40" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Skeleton */}
                <div className="md:hidden space-y-4">
                    {[length].map((i) => (
                        <div key={i} className="bg-white border rounded-lg p-4">
                            <div className="flex gap-4 mb-4">
                                <Skeleton className="w-20 h-20 rounded" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-5 w-full" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Skeleton className="h-5 w-16" />
                                    <Skeleton className="h-5 w-20" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-5 w-20" />
                                    <div className="inline-flex items-center gap-2">
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                        <Skeleton className="h-6 w-6" />
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                    </div>
                                </div>
                                <div className="flex justify-between pt-2">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-7 w-24" />
                                </div>
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    ))}

                    {/* Mobile summary skeleton */}
                    <div className="bg-gray-100 border rounded-lg p-4 mt-6">
                        <Skeleton className="h-7 w-40 mb-4" />
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-7 w-32" />
                            </div>
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CartSkeleton;