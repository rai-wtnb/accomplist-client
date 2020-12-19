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
      <div className="flex items-center">
        <div className="h-32 w-32 rounded bg-beige inline-block">
          {
            img ?
              <img
                className="rounded object-cover h-32 w-full"
                src={String(img)}
              />
              :
              <div className="flex justify-center pt-8">
                <FontAwesomeIcon
                  className="text-7xl text-blue items-center"
                  icon="user"
                />
              </div>
          }
        </div>
        <h1 className="pl-10 inline-block">{name}</h1>
      </div>

      <div className="flex flex-row-reverse pr-2 items-center pt-10 md:pt-0">
        {
          userID == user.id ?
            <Link href="/users/setting/[list-id]" as={`/users/setting/${id}`}>
              <a>
                <span className="text-beige bg-blue rounded px-2 py-2 cursor-pointer mx-2 hover:bg-red">設定</span>
              </a>
            </Link>
            :
            <span className="text-beige bg-blue rounded px-2 py-2 cursor-pointer mx-2 hover:bg-red">フォローする</span>
        }
        {
          twitter ?
            <a href={`https://twitter.com/${twitter}`}>
              <FontAwesomeIcon
                className="text-4xl cursor-pointer text-blue hover:text-red"
                icon={["fab", "twitter-square"]}
              />
            </a>
            :
            ""
        }
        <p className="pr-4">フォロワー:-</p>
        <p className="pr-4">フォロー:-</p>
      </div>

      <div className="py-8">
        <p>{description}</p>
        {!description && true && <p className="text-red">プロフィールを書きましょう！</p>}
      </div>
    </div >
  );
};

export default Profile;
