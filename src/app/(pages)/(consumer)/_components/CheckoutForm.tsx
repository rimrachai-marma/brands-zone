"use client";

import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import CheckoutSkeleton from "@/app/(pages)/(consumer)/_components/CheckoutSkeleton";
import {CheckoutFormData, checkoutSchema} from "@/schema/checkoutSchema";
import ContactInformation from "./ContactInformation";
import ShippingAddress from "./ShippingAddress";
import OrderNotes from "./OrderNotes";
import OrderSummary from "./OrderSummary";
import PaymentModal from "./PaymentModal";
import {
    Form,
} from "@/components/ui/form";
import {checkout, getUserCartData} from "@/lib/actions/user";

const CheckoutForm = () => {
    const {items} = useSelector((state: RootState) => state.cart);
    const [isLoading, setIsLoading] = useState(false);
    const [cartData, setCartData] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(true);
    const [orderData, setOrderData] = useState<any>(null);


    // Initialize react-hook-form
    const form: UseFormReturn<CheckoutFormData> = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            email: "",
            phone: "",
            firstName: "",
            lastName: "",
            address: "",
            apartment: "",
            city: "",
            state: "",
            postalCode: "",
            country: "United States",
            paymentMethod: "card",
            cardNumber: "",
            cardName: "",
            expiryDate: "",
            cvv: "",
            orderNotes: "",
        },
    });

    const {control, handleSubmit, setValue, formState: {errors}, reset} = form;
    console.log(errors);
    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        setIsLoading(true);
        try {
            await getUserCartData({cart: items}).then((res: any) => {
                setCartData(res.data);
            });
        } catch (error) {
            console.error("Error fetching cart:", error);
            toast.error("Failed to load cart data");
        } finally {
            setIsLoading(false);
        }
    };


    const onSubmit = async (data: CheckoutFormData) => {


        setIsSubmitting(true);

        try {
            const orderData = {
                cart: items,
                contact: {
                    email: data.email,
                    phone: data.phone,
                },
                shipping: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    apartment: data.apartment,
                    city: data.city,
                    state: data.state,
                    postalCode: data.postalCode,
                    country: data.country,
                },
                notes: data.orderNotes,
            };

            await checkout(orderData).then((result: any) => {
                if (result.status === 'success') {
                    // dispatch(clearCart());
                    toast.success("Order placed successfully!");
                    setIsPaymentModalOpen(true);
                    // setCartData(null);
                    // reset()
                    console.log(result);
                    setOrderData(result.data);
                } else {
                    toast.error(result.message || "Failed to place order");
                    console.log(result);
                }
            }).catch((err) => {
                console.log(err);
            });


        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("An error occurred during checkout");
            console.log(error)
        } finally {
            setIsSubmitting(false);
        }
    };

    // Loading state with skeletons
    if (isLoading && !cartData) {
        return <CheckoutSkeleton/>;
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <ContactInformation control={control}/>
                        <ShippingAddress control={control}/>
                        <OrderNotes control={control}/>
                    </div>

                    <OrderSummary
                        cartData={cartData}
                        items={items}
                        isSubmitting={isSubmitting}
                    />
                </div>

            </form>

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                orderData={orderData}
                currency="usd"
            />
        </Form>
    );
};

export default CheckoutForm;