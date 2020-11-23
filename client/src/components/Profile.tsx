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
      <div className="grid grid-cols-6">
        <div className="col-span-1 h-32 w-32 rounded bg-beige inline-block">
          {
            img ?
              <img
                className="rounded object-cover h-32 w-full"
                src={img}
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

        <div className="col-span-5">
          <h1 className="inline-block pt-10 pl-10">{name}</h1>
        </div>
      </div>

      <div className="flex flex-row-reverse pr-2">
        {
          userID == user.id ?
            <Link href="/users/setting/[list-id]" as={`/users/setting/${id}`}>
              <a>
                <button className="text-beige bg-blue rounded px-2 py-2 cursor-pointer inline mx-2 hover:bg-red text-beige">設定</button>
              </a>
            </Link>
            :
            <button className="text-beige bg-blue rounded px-2 py-2 cursor-pointer inline mx-2 hover:bg-red text-beige">フォローする</button>
        }
        {
          twitter ?
            <a href={`https://twitter.com/${twitter}`}>
              <FontAwesomeIcon
                className="text-4xl cursor-pointer text-blue align-middle hover:text-red"
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
        {/* 自分のページのみ表示 */}
        {!description && true && <p>プロフィールを書きましょう！！</p>}
      </div>
    </div>
  );
};

export default Profile;
