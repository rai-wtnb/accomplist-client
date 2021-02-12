import Count from "./count";
import List from "./list";

type User = {
  id: string;
  name: string;
  twitter?: string;
  description?: string;
  img?: File;
  lists: List[];
  Count: Count;
}

export default User;
