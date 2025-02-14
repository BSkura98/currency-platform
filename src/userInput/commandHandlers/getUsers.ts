import { getUsers } from "../../services/getUsers/service";

export const getUsersHandler = async (args: string[]) => {
  try {
    let users = await getUsers();

    console.log(`User ids: `);
    users.forEach((user: any) => console.log(user.id));
  } catch (error: any) {
    console.log(error.message);
  }
};
