import {Suspense} from "react";
import CheckoutSkeleton from "@/app/(pages)/(consumer)/_components/CheckoutSkeleton";
import CheckoutForm from "@/app/(pages)/(consumer)/_components/CheckoutForm";

const Checkout = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="container mx-auto max-w-7xl">
                <h1 className={'text-3xl pb-5 font-semibold'}>Checkout</h1>
                <Suspense fallback={<CheckoutSkeleton/>}>
                    <CheckoutForm/>
                </Suspense>
            </div>
        </div>
    )
}
export default Checkout;