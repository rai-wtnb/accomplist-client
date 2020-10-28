import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Profile: FC = () => {
  return (
    <div className="mt-12 rounded border-beige border-2 p-2">
      <div className="grid grid-cols-6">
        <div className="col-span-1 h-32 w-32 rounded bg-beige inline-block">
          <div className="flex justify-center pt-8">
            <FontAwesomeIcon
              className="text-7xl text-blue items-center"
              icon="user"
            />
          </div>
        </div>

        <div className="col-span-5">
          <h1 className="inline-block pt-10 pl-10">user</h1>
        </div>
      </div>

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
          つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書
        </p>
      </div>
    </div>
  );
};

export default Profile;
