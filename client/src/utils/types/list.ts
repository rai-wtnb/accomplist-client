import Feedback from "./feedback";
import User from "./user";

type List = {
  ID: string;
  user_id: string;
  content: string;
  done: boolean;
  feedback: Feedback;
  user: User;
}

export default List;
