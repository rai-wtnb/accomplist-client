import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import User from '../utils/types/user';
import { getUserCookie } from '../utils/mycookie';
import Count from '../utils/types/count';
import axios from 'axios';
import { useRouter } from 'next/router';

type Props = {
  user: User;
  count: Count;
}

const Profile: FC<Props> = ({ user, count }) => {
  const { id, name, twitter, description, img } = user;
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const userID = getUserCookie();
  const router = useRouter();

  const jsonData = {
    follow_id: userID,
    follower_id: user.id,
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(`${process.env.ACCOMPLIST_API_BROWSER}/relations/isfollow`, jsonData)
      setIsFollow(result.data.isFollow);
    }
    fetchData();
  }, []);

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

        <span className="inline-block hover:opacity-75">
          <Link href="/users/follows/[user-id]" as={`/users/follows/${id}`}>
            <a>
              フォロー:
              <span className="text-notifyBlue"> {count.followCount}</span>
            </a>
          </Link>
        </span>

        <span className="px-4 inline-block hover:opacity-75">
          <Link href="/users/follows/[user-id]" as={`/users/follows/${id}`}>
            <a>
              フォロワー:
              <span className="text-notifyBlue"> {count.followerCount}</span>
            </a>
          </Link>
        </span>

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
            <Link href="/users/setting/[user-id]" as={`/users/setting/${userID}`} >
              <a>
                <span className="text-beige bg-blue rounded px-2 py-1 cursor-pointer mx-4 hover:bg-red">設定</span>
              </a>
            </Link>
            :
            isFollow ?
              <span
                className="text-beige bg-blue rounded px-2 py-1 cursor-pointer mx-4 hover:bg-red"
                onClick={() => {
                  axios
                    .delete(
                      `${process.env.ACCOMPLIST_API_BROWSER}/relations`, { data: jsonData })
                    .then(() => {
                      router.reload();
                    });
                }}
              >フォロー中</span>
              :
              <span
                className="text-beige bg-blue rounded px-2 py-1 cursor-pointer mx-4 hover:bg-red"
                onClick={() => {
                  axios
                    .post(
                      `${process.env.ACCOMPLIST_API_BROWSER}/relations`, jsonData)
                    .then(() => {
                      router.reload();
                    });
                }}
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
