const UsersRepository = require("../repositories/users-repository");

class UsersService {
  static async createUser(firstName, lastName, email, uid) {
    const result = await UsersRepository.create(firstName, lastName, email, uid);

    return result;
  }
}

module.exports = UsersService;
