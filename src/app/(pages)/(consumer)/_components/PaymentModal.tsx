import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, } from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Loader2, CreditCard, Lock, AlertCircle} from "lucide-react";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
    Elements,
} from "@stripe/react-stripe-js";
import {loadStripe, StripeElementsOptions} from "@stripe/stripe-js";
import {clientEnv} from "@/data/env";
import {payment} from "@/lib/actions/payment";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {clearCart} from "@/lib/features/cart/cartSlice";

// Initialize Stripe
const stripePromise = loadStripe(clientEnv.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Validation schema
const paymentSchema = z.object({
    cardholderName: z.string().min(1, "Cardholder name is required"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderData: {
        order_id: string;
        total: number;
        contact?: {
            name?: string;
            email?: string;
        };
        shipping: {
            address_line_1: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
        };
    };
    currency: string;
}

// Stripe Card Elements Style
const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

const PaymentModalInner = ({
                               isOpen,
                               onClose,
                               orderData,
                           }: PaymentModalProps) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const stripe = useStripe();
    const elements = useElements();
const navigate =useRouter()
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            cardholderName: orderData?.contact?.name || "",
        },
    });

    const onSubmit = async (formData: PaymentFormData) => {
        if (!stripe || !elements) {
            setError("Payment system not ready. Please try again.");
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            // Use the element type string instead of the component reference
            const cardNumberElement = elements.getElement('cardNumber');

            if (!cardNumberElement) {
                throw new Error("Card element not found");
            }

            // Create payment method with shipping address
            const {error: stripeError, paymentMethod} = await stripe.createPaymentMethod({
                type: "card",
                card: cardNumberElement,
                billing_details: {
                    name: formData.cardholderName,
                    email: orderData?.contact?.email || "",
                    address: {
                        line1: orderData.shipping.address_line_1,
                        city: orderData.shipping.city,
                        state: orderData.shipping.state,
                        postal_code: orderData.shipping.postal_code,
                        country: 'US', // Use the country from shipping data
                    },
                },
            });

            if (stripeError) {
                setError(stripeError.message || "Failed to process card details.");
                setIsProcessing(false);
                return;
            }

            if (!paymentMethod) {
                setError("Failed to create payment method.");
                setIsProcessing(false);
                return;
            }

            // Call your payment API
            const paymentResponse = await payment({
                order_id: orderData.order_id,
                payment_method_id: paymentMethod.id,
            });

            if (!paymentResponse) {
                setError(
                    paymentResponse?.message || "Payment failed. Please try again."
                );
                setIsProcessing(false);
                return;
            }
            toast.success('Payment proceed successful');
            reset();
            onClose();
            dispatch(clearCart())
            navigate.push('/search')
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            setIsProcessing(false);
        }
    };

    const handlePaymentClick = () => {
        handleSubmit(onSubmit)();
    };

    const totalAmount = orderData?.total;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] lg:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5"/>
                        Secure Payment
                    </DialogTitle>
                    <DialogDescription>Total Amount: ${totalAmount}</DialogDescription>
                </DialogHeader>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="space-y-6">
                    {/* Card Details Section */}
                    <div className="space-y-4 border p-4 rounded-lg">
                        <h3 className="font-semibold">Card Information</h3>

                        <div className="space-y-2">
                            <Label htmlFor="cardholderName">Cardholder Name *</Label>
                            <Input
                                id="cardholderName"
                                type="text"
                                placeholder="John Doe"
                                {...register("cardholderName")}
                                disabled={isProcessing}
                            />
                            {errors.cardholderName && (
                                <p className="text-sm text-red-500">
                                    {errors.cardholderName.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <div className="border rounded-md p-3">
                                <CardNumberElement
                                    id="cardNumber"
                                    options={CARD_ELEMENT_OPTIONS}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="expiryDate">Expiry Date *</Label>
                                <div className="border rounded-md p-3">
                                    <CardExpiryElement
                                        id="expiryDate"
                                        options={CARD_ELEMENT_OPTIONS}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cvc">CVC *</Label>
                                <div className="border rounded-md p-3">
                                    <CardCvcElement
                                        id="cvc"
                                        options={CARD_ELEMENT_OPTIONS}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Lock className="w-4 h-4"/>
                        <span>Your payment details are secure and encrypted</span>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isProcessing}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handlePaymentClick}
                            disabled={!stripe || isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                                    Processing...
                                </>
                            ) : (
                                `Pay $${totalAmount}`
                            )}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Wrap with Stripe Elements provider
const PaymentModal = (props: PaymentModalProps) => {
    // Check if total is 0 or invalid before creating options
    if (!props.orderData?.total || props.orderData.total <= 0) {
        return null;
    }

    const options: StripeElementsOptions = {
        mode: "payment",
        amount: props.orderData.total, // Already validated as positive number
        currency: props.currency || "usd",
        appearance: {
            theme: "stripe",
            variables: {
                colorPrimary: "#2563eb",
                borderRadius: "8px",
            },
        },
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <PaymentModalInner {...props} />
        </Elements>
    );
};

export default PaymentModal;