import { currentUser } from "@clerk/nextjs";
import { UserData } from "@/app/utils/interfaces";
export async function getUserData() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userData = user as unknown as UserData;
  console.log(userData);

  return userData;
}
