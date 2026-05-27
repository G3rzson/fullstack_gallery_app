import { getAllUsers } from "../../db/dal/user.repository";
import { errorHandler } from "../../functions/errorHandler";

export async function getAllUsersService(search?: string) {
  try {
    // Ha van keresési kifejezés, szűrés
    let filter: Record<string, any> = {};
    if (search) {
      filter = {
        ...filter,
        username: { $regex: search, $options: "i" }, // case-insensitive keresés
      };
    }
    return await getAllUsers(filter);
  } catch (error) {
    errorHandler(error);
  }
}
