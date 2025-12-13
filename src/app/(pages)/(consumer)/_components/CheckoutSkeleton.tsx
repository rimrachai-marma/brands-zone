import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";

const CheckoutSkeleton  =()=>{
    return (
    <div className="min-h-screen">
        <div className="">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left column skeleton */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-48"/>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <Skeleton className="h-10"/>
                                <Skeleton className="h-10"/>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-48"/>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <Skeleton className="h-10"/>
                                <Skeleton className="h-10"/>
                            </div>
                            <Skeleton className="h-10"/>
                            <Skeleton className="h-10"/>
                            <div className="grid md:grid-cols-3 gap-4">
                                <Skeleton className="h-10"/>
                                <Skeleton className="h-10"/>
                                <Skeleton className="h-10"/>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-48"/>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <Skeleton className="h-12"/>
                                <Skeleton className="h-12"/>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right column skeleton */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-48"/>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 mb-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3">
                                        <Skeleton className="w-16 h-16 rounded"/>
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-full"/>
                                            <Skeleton className="h-3 w-20"/>
                                            <Skeleton className="h-4 w-16"/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Separator className="my-4"/>
                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <Skeleton key={i} className="h-5"/>
                                ))}
                            </div>
                            <Separator className="my-4"/>
                            <Skeleton className="h-12 w-full"/>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
)
}

export default CheckoutSkeleton;