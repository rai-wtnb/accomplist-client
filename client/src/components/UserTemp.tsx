import React, { FC } from "react";
import Link from "next/link";
import User from "../utils/types/user";

type Props = {
  key?: string;
  user: User;
}

const UserTemp: FC<Props> = ({ user }) => {
  return (
    <div className="border-2 border-beige my-2 py-1 pl-2 hover:opacity-75">
      <Link href="/users/[user-id]" as={`/users/${user.id}`}>
        <a>
          <h1 className="pb-2">{user.name}</h1>
          <p>{user.description}</p>
        </a>
      </Link>
    </div>
  )
}

export default UserTemp;
