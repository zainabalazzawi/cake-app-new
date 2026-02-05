"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CreditCard as CreditCardIcon, ShieldCheck, Loader2 } from "lucide-react";
import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePayment, useOrder } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";

const PaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";

  const { data: order } = useOrder(orderId);
  const paymentMutation = usePayment();


  const handlePayment = (token: string) => {
    if (!order) return;

    paymentMutation.mutate(
      { sourceId: token, amount: order.total, orderId },
      {
        onSuccess: () => {
          toast.success("Payment successful!", { description: "Thank you for your purchase." });
          router.push("/");
        },
        onError: () => {
          toast.error("Payment failed", { description: "An unexpected error occurred." });
        },
      }
    );
  };

  return (
    <div className="bg-linear-to-b from-amber-50 via-white to-orange-50 py-12 px-5 min-h-screen max-w-md mx-auto">
      <Link
        href="/checkout/shipping"
        className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-8 font-medium"
      >
        <ArrowLeft size={20} />
        Back to Shipping
      </Link>

      <Card className="border-amber-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-amber-900 flex items-center gap-2">
            <CreditCardIcon className="h-5 w-5" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          {order && (
            <div className="mb-6 p-4 bg-amber-50 rounded-lg">
              <p className="text-amber-900 font-medium">Total: {formatPrice(order.total)}</p>
            </div>
          )}

          {paymentMutation.isPending ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-10 w-10 animate-spin text-amber-600 mb-4" />
              <p className="text-amber-900 font-medium">Processing payment...</p>
            </div>
          ) : order && (
            <PaymentForm
              applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID || ""}
              locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || ""}
              cardTokenizeResponseReceived={(token) => {
                if (token.status === "OK" && token.token) {
                  handlePayment(token.token);
                } else {
                  toast.error("Card validation failed", { description: "Please check your card details." });
                }
              }}
            >
              <CreditCard
                buttonProps={{
                  css: {
                    backgroundColor: "#d97706",
                    "&:hover": { backgroundColor: "#b45309" },
                    fontSize: "16px",
                    fontWeight: "600",
                  },
                }}
              />
            </PaymentForm>
          )}

          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-600">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
