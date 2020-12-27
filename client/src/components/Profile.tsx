import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import User from '../utils/types/user';
import { getUserCookie } from '../utils/mycookie';

type Props = {
  user: User;
}

const Profile: FC<Props> = ({ user }) => {
  const { id, name, twitter, description, img } = user;
  const userID = getUserCookie();

  return (
    <div className="mt-12 rounded border-beige border-2 p-2">
      <div className="flex items-center pb-2">
        <div className="h-20 w-20 md:h-32 md:w-32 rounded bg-beige inline-block">
          {
            img ?
              <img
                className="rounded object-cover h-20 w-20 md:h-32 md:w-32 w-full"
                src={String(img)}
              />
              :
              <div className="flex justify-center pt-8">
                <FontAwesomeIcon
                  className="text-4xl md:text-6xl text-blue items-center"
                  icon="user"
                />
              </div>
          }
        </div>
        <h1 className="pl-10 inline-block">{name}</h1>
      </div>

      <div className="flex items-center items-center pt-10 md:pt-0">
        <p className="inline-block">フォロー:-</p>
        <p className="px-4 inline-block">フォロワー:-</p>
        {
          twitter ?
            <a href={`https://twitter.com/${twitter}`}>
              <FontAwesomeIcon
                className="ml-4 text-3xl cursor-pointer text-blue hover:text-red text-center"
                icon={["fab", "twitter-square"]}
              />
            </a>
            :
            ""
        }
        {
          userID == user.id ?
            <Link href="/users/setting/[list-id]" as={`/users/setting/${id}`}>
              <a>
                <span className="text-beige bg-blue rounded px-2 py-1 cursor-pointer mx-4 hover:bg-red">設定</span>
              </a>
            </Link>
            :
            <span
              className="text-beige bg-blue rounded px-2 py-1 cursor-pointer mx-4 hover:bg-red"
              onClick={() => alert("Coming soon!")}
            >フォローする</span>
        }
      </div>

      <div className="py-8">
        <p>{description}</p>
        {!description && true && <p>プロフィールを書きましょう！</p>}
      </div>
    </div >
  );
};

export default Profile;
