import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const PaymentForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (cardElement == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
      return;
    } else {
      setErrorMessage("");
      console.log("payment method", paymentMethod);
    }

    // 20$ to join
    const amount = 20;

    try {
      // create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: amount,
      });

      const clientSecret = res.data.clientSecret;

      // confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

      //   check if else payment
      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const paymentData = {
          userName: user?.displayName,
          userEmail: user?.email,
          amount,
          transactionId: result?.paymentIntent?.id,
          method: result?.paymentIntent?.payment_method_types,
          paidAt: new Date().toISOString(),
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);
        console.log(paymentRes);

        if (paymentRes.data.paymentResult.insertedId) {
          Swal.fire({
            title: `Payment Successful`,
            text: `Paid By: ${user?.displayName}`,
            icon: "success",
          });
          navigate("/dashboard/my-profile");
        } else {
          toast.error("Payment Already Done");
        }
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Membership Payment - $20</h2>
      <form onSubmit={handleSubmit}>
        <CardElement className="border p-3 rounded mb-4" />
        <button
          className="btn btn-primary w-full"
          disabled={!stripe || isProcessing}
        >
          {/* {loading ? "Processing..." : "Pay $"} */}
          {isProcessing ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>{" "}
              Paying
            </>
          ) : (
            "Pay $"
          )}
        </button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
