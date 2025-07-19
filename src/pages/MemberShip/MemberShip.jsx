import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import PaymentForm from "./shared/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);

console.log('publishable key', import.meta.env.VITE_Payment_Key);

const MemberShip = () => {
  return (
    <div className="mt-24">
      <Elements stripe={stripePromise}>
        <PaymentForm></PaymentForm>
      </Elements>
    </div>
  );
};

export default MemberShip;
