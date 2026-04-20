// Midtrans client setup — wired up in a later session.
// Docs: https://docs.midtrans.com/

export const midtransConfig = {
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY ?? "",
  clientKey: process.env.MIDTRANS_CLIENT_KEY ?? "",
};
