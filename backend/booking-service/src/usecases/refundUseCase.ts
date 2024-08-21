import { BadRequestError } from "tune-up-library";
import { StripeService } from "../infrastructure/services";

export class RefundUseCase {
  constructor(private stripeService: StripeService) {}

  async execute(
    userId: string,
    orderId: string,
    refundAmount: number
  ): Promise<any> {
    console.log(orderId, refundAmount, userId, "usecase");

    if (!orderId || !refundAmount || !userId) {
      throw new BadRequestError("invalid input");
    }

    const sessionId = await this.stripeService.createCheckoutSession(
      refundAmount,
      { userId, orderId },
      true
    );

    return sessionId;
  }
}
