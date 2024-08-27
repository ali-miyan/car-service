import { BadRequestError } from "tune-up-library";
import { IUserRepository } from "../repositories";

export class WalletUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(wallet: any): Promise<any> {
    if (!wallet.userId || !wallet.amount || !wallet.stat) {
      throw new BadRequestError("cant find user");
    }

    await this.userRepository.addToWallet(
      wallet.userId,
      wallet.amount,
      wallet.stat
    );
  }
}
