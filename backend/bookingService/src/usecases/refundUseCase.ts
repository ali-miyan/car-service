import { BadRequestError } from "tune-up-library";
import { StripeService } from "../infrastructure/services";

export class RefundUseCase {
  constructor(private stripeService: StripeService) {}

  async execute(
    userId: string,
    orderId: string,
    refundAmount: number
  ): Promise<any> {
    try {
      if (!orderId || !refundAmount || !userId) {
        throw new BadRequestError(
          "Invalid input: missing orderId, refundAmount, or userId"
        );
      }

      const sessionId = await this.stripeService.createCheckoutSession(
        refundAmount,
        { userId, orderId },
        true
      );

      return sessionId;
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
