import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Loader2, ShieldCheck } from "lucide-react";
import {CartItem} from "@/types";

type cartData ={
    item_count: number;
    total: number;
    items: CartItem[];
}

interface OrderSummaryProps {
    cartData: cartData;
    items: CartItem[];
    isSubmitting: boolean;
}

const currency = (v: number) => {
    return v.toLocaleString(undefined, { style: "currency", currency: "USD" });
};

const OrderSummary = ({ cartData, items, isSubmitting }: OrderSummaryProps) => {
    const shippingCost = 0.0;
    const tax =  0;
    const grandTotal = cartData?.items?.length > 0 ? cartData.total + shippingCost + tax : 0;
    console.log(cartData)
    return (
        <div className="lg:col-span-1">
            <Card className="sticky top-4">
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
                        {cartData?.items?.map((item: CartItem) => (
                            <div key={`${item.id}-${item.variant_id}`} className="flex gap-3">
                                {item.image && (
                                    <div className="w-16 h-16 relative border rounded overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                        />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0 capitalize">
                                    <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                                   <div className={'flex items-center gap-1'}>
                                       <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                       {item.attributes.size && <p className="text-xs text-muted-foreground">Size: {item.attributes.size}</p>}
                                       {item.attributes.color &&  <p className="text-xs text-muted-foreground">color: {item.attributes.color}</p>}
                                   </div>
                                    <p className="text-sm font-semibold">{currency(item.subtotal)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-medium">{currency(cartData?.total || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="font-medium">{currency(shippingCost)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax (0%)</span>
                            <span className="font-medium">{currency(tax)}</span>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between text-lg font-bold mb-6">
                        <span>Total</span>
                        <span className="text-primary">{currency(grandTotal)}</span>
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting || items.length === 0}
                        className="w-full h-12 text-lg"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <ShieldCheck className="w-5 h-5 mr-2" />
                                Place Order
                            </>
                        )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground mt-4">
                        Your payment information is secure and encrypted
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default OrderSummary;