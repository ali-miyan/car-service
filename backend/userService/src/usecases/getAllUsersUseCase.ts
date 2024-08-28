import { IUserRepository } from "../repositories";

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(): Promise<any> {
    const monthlyUsers = await this.userRepository.getMonthlyUsers();
    const users = await this.userRepository.getAllUsersCount();

    console.log(users, monthlyUsers);

    return {
      monthlyUsers,
      users,
    };
  }
}
