import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Profile: FC = () => {
  return (
    <div className="mt-12 rounded border-beige border-2 p-2">
      <img
        className="rounded inline"
        src="https://via.placeholder.com/60"
      />
      <h1 className="pl-2 inline align-middle">ユーザー名</h1>
      <div className="py-4">
        <p>
          幼い頃から親の転勤によって様々な地域で生活した経験があるので、文化や言葉や習慣の違いにすぐに順応する事が自然と身に付きました。そのため、自分の常識や普通にとらわれずに、人や物事を多角的、客観的に見るという事が私の強みです。何事もまず受け入れて新しいものを吸収したいと思っていますので、自分の中の物差しで人や物事を量ることをしませんが、自分の与えられた仕事や環境には責任と決断力を持って臨みます。
            </p>
      </div>
      <div className="flex flex-row-reverse">
        <p className="text-beige bg-blue rounded px-2 pt-3 cursor-pointer inline mx-2 hover:bg-red text-beige">フォローする</p>
        <FontAwesomeIcon
          className="text-5xl cursor-pointer text-blue align-middle hover:text-red"
          icon={["fab", "twitter-square"]}
        />
      </div>
    </div>
  );
};

export default Profile;
