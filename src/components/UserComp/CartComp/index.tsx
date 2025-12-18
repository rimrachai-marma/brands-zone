"use client";

import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "@/lib/store";
import {
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
} from "@/lib/features/cart/cartSlice";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableFooter,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import toast from "react-hot-toast";
import {Plus, Minus, Trash2, ShoppingCart, Loader2} from "lucide-react";
import {getUserCartData} from "@/lib/actions/user";
import CartSkeleton from "@/app/(pages)/(consumer)/_components/CartSkeleton";
import {useRouter} from "next/navigation";
import {attributes, CartItem} from "@/types";


const currency = (v: number) => {
    return v.toLocaleString(undefined, {style: "currency", currency: "USD"});
};


const CartComp = () => {
    const {items} = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
const navigation = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch cart data from API whenever items change
    useEffect(() => {
        const fetchCartData = async () => {
            if (!items || items.length === 0) {
                setCartItems([]);
                setCartTotal(0);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                await getUserCartData({cart: items}).then((res) => {
                    setCartItems(res.data.items);
                    setCartTotal(res.data.total);
                });
            } catch (err) {
                console.error(err);
                setError("Error fetching cart data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartData();
    }, [items]);

    const handleDecreaseQuantity = (itemId: string, variantId: string) => {
        const item = items.find(i => i.id == itemId && i.variantId == variantId);
        if (item && item.quantity > 1) {
            dispatch(decreaseQuantity(itemId));
        } else if (item) {
            toast.error(`"${item.title}" cannot be less than 1.`);
        }
    };

    const handleIncreaseQuantity = (itemId: string, variantId: string) => {
        const item = items.find(i => i.id == itemId && i.variantId == variantId);
        if (item) {
            dispatch(addToCart({id: itemId, variantId: variantId, quantity: 1}));
        }
    };

    const handleRemoveFromCart = (itemId: string, itemTitle: string) => {
        dispatch(removeFromCart(itemId));
        toast.error(`"${itemTitle}" was permanently removed from your cart.`, {
            icon: <Trash2 className="text-red-600"/>,
            style: {
                border: "1px solid #dc2626",
            },
        });
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.success(`Your entire cart has been cleared! Start shopping again.`, {
            icon: "🗑️",
            style: {
                border: "1px solid #10b981",
            },
        });
    };

    const handleCheckout = () => {
        toast(
            (t) => (
                <div className="bg-primary text-white shadow-xl p-4 flex items-center justify-between gap-4">
                    <Loader2 className="w-5 h-5 animate-spin"/>
                    <p>Processing your order...</p>
                    <Button
                        onClick={() => toast.dismiss(t.id)}
                        variant="outline"
                        size="sm"
                        className="bg-white text-primary"
                    >
                        Dismiss
                    </Button>
                </div>
            ),
            {
                duration: 1000,
            }
        );
        navigation.push('/checkout');
    };

    // Format attributes for display
    const formatAttributes = (attributes: attributes | string) => {
        if (!attributes) return null;
        if (typeof attributes === 'string') {
            try {
                attributes = JSON.parse(attributes);
            } catch {
                return attributes;
            }
        }
        return Object.entries(attributes)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
    };


    if (isLoading) {
        return (
            <CartSkeleton length={items.length || 2}/>
        );
    }

    // Empty cart state
    if (!items || items.length === 0 || cartItems.length === 0) {
        return (
            <div
                className="flex flex-col items-center justify-center p-8 md:p-20 text-center bg-gray-50 min-h-[40vh] m-4 md:m-10 shadow-lg rounded-lg">
                <ShoppingCart className="w-12 h-12 text-gray-400 mb-4"/>
                <h3 className="text-xl font-semibold mb-2">
                    Your Shopping Cart is Empty
                </h3>
                <p className="text-muted-foreground">
                    Add items to proceed to checkout!
                </p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div
                className="flex flex-col items-center justify-center p-8 md:p-20 text-center bg-gray-50 min-h-[40vh] m-4 md:m-10 shadow-lg rounded-lg">
                <ShoppingCart className="w-12 h-12 text-red-400 mb-4"/>
                <h3 className="text-xl font-semibold mb-2 text-red-600">
                    Error Loading Cart
                </h3>
                <p className="text-muted-foreground">{error}</p>
            </div>
        );
    }

    return (
        <section className="py-6 md:py-12 px-4">
            <div className="container mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                    Your Shopping Cart
                </h2>

                <div className="hidden md:block overflow-x-auto border border-gray-200">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="w-2/5 text-left font-semibold">
                                    Product
                                </TableHead>
                                <TableHead className="text-right font-semibold">
                                    Price
                                </TableHead>
                                <TableHead className="text-center font-semibold">
                                    Quantity
                                </TableHead>
                                <TableHead className="text-right font-semibold">
                                    Total
                                </TableHead>
                                <TableHead className="text-right font-semibold">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {cartItems.map((item) => (
                                <TableRow
                                    key={`${item.id}-${item.variant_id}`}
                                    className="hover:bg-secondary/5 transition-colors"
                                >
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-4">
                                            {item.image ? (
                                                <div
                                                    className="w-16 h-16 relative shrink-0 border overflow-hidden rounded">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : null}
                                            <div>
                                                <div className="font-medium text-lg line-clamp-2">
                                                    {item.name}
                                                </div>
                                                {item.attributes && (
                                                    <div className="text-xs text-muted-foreground capitalize mt-1">
                                                        {formatAttributes(item.attributes)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right font-medium">
                                        {currency(item.price)}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <div className="inline-flex items-center gap-2 border rounded-full p-0.5">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-7 w-7 rounded-full hover:bg-gray-200"
                                                onClick={() => handleDecreaseQuantity(item.id.toString(), item.variant_id.toString())}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-4 h-4"/>
                                            </Button>
                                            <span className="w-6 text-center font-semibold">
                                                {item.quantity}
                                            </span>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-7 w-7 rounded-full hover:bg-gray-200"
                                                onClick={() => handleIncreaseQuantity(item.id.toString(), item.variant_id.toString())}
                                                disabled={item.stock !== undefined && item.quantity >= item.stock}
                                            >
                                                <Plus className="w-4 h-4"/>
                                            </Button>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right font-bold text-lg text-primary">
                                        {currency(item.subtotal)}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => handleRemoveFromCart(item.id.toString(), item.name)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            title="Remove Item"
                                        >
                                            <Trash2 className="w-5 h-5"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                        <TableFooter className="bg-gray-100">
                            <TableRow className="hover:bg-gray-100">
                                <TableCell colSpan={2} className="text-left font-bold text-lg">
                                    Order Summary
                                </TableCell>
                                <TableCell className="text-right font-bold text-lg">
                                    Subtotal
                                </TableCell>
                                <TableCell className="text-right font-bold text-xl text-primary">
                                    {currency(cartTotal)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-3">
                                        <Button
                                            variant="outline"
                                            onClick={handleClearCart}
                                            className="border-red-500 text-red-500 hover:bg-red-50"
                                        >
                                            Clear Cart
                                        </Button>
                                        <Button
                                            className="hover:bg-secondary"
                                            variant="default"
                                            onClick={handleCheckout}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>

                {/* Mobile Card View - Visible only on Mobile */}
                <div className="md:hidden space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={`${item.id}-${item.variant_id}`}
                            className="bg-white border border-primary/20 rounded-lg shadow-md p-4"
                        >
                            <div className="flex gap-4 mb-4">
                                {item.image ? (
                                    <div className="w-20 h-20 relative shrink-0 border overflow-hidden rounded">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : null}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-base line-clamp-2 mb-1">
                                        {item.name}
                                    </h3>
                                    {item.attributes && (
                                        <p className="text-xs text-muted-foreground capitalize">
                                            {formatAttributes(item.attributes)}
                                        </p>
                                    )}
                                    {item.stock !== undefined && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Stock: {item.stock}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Price:</span>
                                    <span className="font-medium">{currency(item.price)}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">
                                        Quantity:
                                    </span>
                                    <div className="inline-flex items-center gap-2 border rounded-full p-0.5">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 rounded-full hover:bg-gray-200"
                                            onClick={() => handleDecreaseQuantity(item.id.toString(), item.variant_id.toString())}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4"/>
                                        </Button>
                                        <span className="w-8 text-center font-semibold">
                                            {item.quantity}
                                        </span>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 rounded-full hover:bg-gray-200"
                                            onClick={() => handleIncreaseQuantity(item.id.toString(), item.variant_id.toString())}
                                            disabled={item.stock !== undefined && item.quantity >= item.stock}
                                        >
                                            <Plus className="w-4 h-4"/>
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t">
                                    <span className="font-semibold">Total:</span>
                                    <span className="font-bold text-lg text-primary">
                                        {currency(item.subtotal)}
                                    </span>
                                </div>

                                <Button
                                    variant="outline"
                                    onClick={() => handleRemoveFromCart(item.id.toString(), item.name)}
                                    className="w-full text-red-500 border-red-500 hover:bg-red-50 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4 mr-2"/>
                                    Remove from Cart
                                </Button>
                            </div>
                        </div>
                    ))}

                    {/* Mobile Summary Section */}
                    <div className="bg-gray-100 border border-primary/20 rounded-lg shadow-md p-4 mt-6">
                        <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                        <div className="flex justify-between items-center mb-4 pb-4 border-b">
                            <span className="font-semibold text-base">Subtotal:</span>
                            <span className="font-bold text-xl text-primary">
                                {currency(cartTotal)}
                            </span>
                        </div>
                        <div className="space-y-3">
                            <Button
                                className="w-full"
                                variant="default"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleClearCart}
                                className="w-full border-red-500 text-red-500 hover:bg-red-50"
                            >
                                Clear Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartComp;