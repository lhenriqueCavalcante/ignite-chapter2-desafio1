import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  execute({ email, name }: IRequest): User {
    const userAlredyExists = this.usersRepository.findByEmail(email);

    if (userAlredyExists) {
      throw new Error("Email already registered");
    }
    const newUser = this.usersRepository.create({ email, name });
    return newUser;
  }
}

export { CreateUserUseCase };
