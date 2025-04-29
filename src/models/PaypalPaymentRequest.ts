export interface PaypalPaymentRequest {
      amount: number;
      description: string;
     cancelUrl: string;
     successUrl: string;
}