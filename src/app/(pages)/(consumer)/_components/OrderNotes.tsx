import { Control } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CheckoutFormData } from "@/schema/checkoutSchema";

interface OrderNotesProps {
    control: Control<CheckoutFormData>;
}

const OrderNotes = ({ control }: OrderNotesProps) => {
    return (
        <Card>
            <CardContent className="pt-6">
                <FormField
                    control={control}
                    name="orderNotes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Order Notes (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Any special instructions for your order..."
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    );
};

export default OrderNotes;