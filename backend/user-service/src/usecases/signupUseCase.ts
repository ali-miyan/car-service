import { User } from "../entities/userEntity";
import { IUserRepository } from "../infrastructure/db/repositories/interfaces/userInterface";

export class SignupUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    username: string,
    email: string,
    phone: number,
    password: string
  ): Promise<User> {
    
    if (!username || !email || !password) {
      throw new Error("Invalid input");
    }

    const existingEmail = await this.userRepository.findByEmail(email);

    if (existingEmail) {
      throw new Error("User Email already registered");
    }

    const existingPhone = await this.userRepository.findByPhone(phone);

    if (existingPhone) {
      throw new Error("User already registered");
    }

    const user = new User({ username, email, phone, password });
    return await this.userRepository.save(user);
  }
}
