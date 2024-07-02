import { IUserRepository } from "../repositories/interfaces/userInterface";
import { verifyPassword } from "../utils/bcrypt";

export class LoginUseCase {
  constructor(private loginRepository:IUserRepository ) {}

  async execute(email: string, password: string): Promise<{ }> {

    if (!email || !password) {
      throw new Error("Invalid input");
    }

    const user = await this.loginRepository.findByEmail(email)

    if(!user){
        throw new Error("User not found")
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return { success: false, message: "Invalid password" };
    }

    return { success: true };
  }
}
