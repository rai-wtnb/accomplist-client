import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Profile: FC = () => {
  return (
    <div className="mt-12 rounded border-beige border-2 p-2">
      <div className="h-32 w-32 rounded bg-beige inline-block">
        <div className="flex justify-center pt-8">
          <FontAwesomeIcon
            className="text-7xl text-blue items-center"
            icon="user"
          />
        </div>
      </div>

      <h1 className="pl-8 inline align-top">ユーザー名</h1>

      <div className="flex flex-row-reverse pr-2">
        <Link href="/users/setting/1">
          <a>
            <button className="text-beige bg-blue rounded px-2 py-1 cursor-pointer inline hover:bg-red text-beige">設定</button>
          </a>
        </Link>
        <button className="text-beige bg-blue rounded px-2 py-1 cursor-pointer inline mx-2 hover:bg-red text-beige">フォローする</button>
        <a href="https://twitter.com/mmuu_kkuu">
          <FontAwesomeIcon
            className="text-4xl cursor-pointer text-blue align-middle hover:text-red"
            icon={["fab", "twitter-square"]}
          />
        </a>
        <p className="pr-12">フォロワー:400</p>
        <p className="pr-4">フォロー:420</p>
      </div>

      <div className="py-4">
        <p>
          幼い頃から親の転勤によって様々な地域で生活した経験があるので、文化や言葉や習慣の違いにすぐに順応する事が自然と身に付きました。そのため、自分の常識や普通にとらわれずに、人や物事を多角的、客観的に見るという事が私の強みです。何事もまず受け入れて新しいものを吸収したいと思っていますので、自分の中の物差しで人や物事を量ることをしませんが、自分の与えられた仕事や環境には責任と決断力を持って臨みます。
        </p>
      </div>
    </div>
  );
};

export default Profile;
