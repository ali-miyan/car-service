import { BadRequestError } from "tune-up-library";
import { IUserRepository } from "../repositories";

export class WalletUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(wallet: any): Promise<any> {
    try {
      if (!wallet.userId || !wallet.amount || !wallet.stat) {
        throw new BadRequestError("Missing required fields in wallet data.");
      }

      await this.userRepository.addToWallet(
        wallet.userId,
        wallet.amount,
        wallet.stat
      );

      return { success: true };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}
