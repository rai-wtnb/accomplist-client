import User from "./user"

type FollowsAndFollowers = {
    follows: User[];
    followers: User[];
}

export default FollowsAndFollowers;
