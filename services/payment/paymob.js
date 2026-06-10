"use server";

import axios from "axios";

export async function createPaymobOrder(
  totalPrice,
  paymentMethod,
  userData,
  myOrderId,
) {
  try {
    const apiKey = process.env.PAYMOB_API_KEY;
    const integrationId =
      paymentMethod === "card"
        ? process.env.NEXT_PUBLIC_PAYMOB_CARD_INTEGRATION_ID
        : process.env.NEXT_PUBLIC_PAYMOB_WALLET_INTEGRATION_ID;

    if (!apiKey || !integrationId) {
      throw new Error("Paymob Environment Variables are missing!");
    }

    // auth token
    const authResponse = await axios.post(
      "https://egypt.paymob.com/api/auth/tokens",
      {
        api_key: apiKey,
      },
    );
    const authToken = authResponse.data.token;
    console.log("Auth Response:", authResponse.data);
    // order registration in paymob
    const amountInCents = Math.round(Number(totalPrice) * 100);
    const orderResponse = await axios.post(
      "https://egypt.paymob.com/api/ecommerce/orders",
      {
        auth_token: authToken,
        delivery_needed: false,
        amount_cents: amountInCents,
        currency: "EGP",
        merchant_order_id: String(myOrderId),
        items: [],
      },
    );
    const paymobOrderId = orderResponse.data.id;

    // Payment Key Generation
    const paymentKeyResponse = await axios.post(
      "https://egypt.paymob.com/api/accept/payment_keys",
      {
        auth_token: authToken,
        amount_cents: amountInCents,
        expiration: 3600,
        order_id: paymobOrderId,
        billing_data: {
          first_name: userData.firstName || "Customer",
          last_name: userData.lastName || "Customer",
          email: userData.email,
          phone_number: userData.phoneNumber,
          apartment: "NA",
          floor: "NA",
          street: "NA",
          building: "NA",
          shipping_method: "NA",
          postal_code: "NA",
          city: "Cairo",
          country: "EG",
          state: "Cairo",
        },
        currency: "EGP",
        integration_id: Number(integrationId),
      },
    );

    const paymentToken = paymentKeyResponse.data.token;

    let redirectUrl = "";
    if (paymentMethod === "card") {
      redirectUrl = `https://egypt.paymob.com/api/accept/iframe/1416?payment_token=${paymentToken}`;
    } else if (paymentMethod === "wallet") {
      const walletresponse = await axios.post(
        "https://egypt.paymob.com/api/acceptance/void_payments/pay",
        {
          source: {
            identifier: userData.phoneNumber,
            subtype: "WALLET",
          },
          payment_token: paymentToken,
        },
      );
      redirectUrl = walletresponse.data.iframe_redirection_url;
    }
    return { success: true, redirectUrl };
  } catch (error) {
    console.error("Paymob Error:", error.response?.data || error.message);
    console.log("Paymob Detailed Error:", error.response?.data);
    return {
      success: false,
      message: error.response?.data?.detail || "Payment configuration failed",
    };
  }
}
