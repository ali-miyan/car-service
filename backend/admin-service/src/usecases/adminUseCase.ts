import { Admin } from "../entities/adminEntity";
// import { IAdminRepository } from "../repositories/interfaces/adminInterface";
import { IConfigService } from "../repositories/interfaces/validateCredintials";

export class RegisterUseCase {
  constructor(
    // private adminRepository: IAdminRepository,
    private configService:IConfigService
  ) {}

  async execute(email: string, password: string): Promise<boolean> {

    const isVerified = await this.configService.validateCredentials(email,password)
    
    if (!isVerified) {
      throw new Error('Invalid email or password')
    }

    const admin = new Admin({
      email,
      password,
    });

    return true

    console.log(admin, "admin entity object");
    // return await this.adminRepository.save(admin);
  }
}
