import React, { FC } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type MenuProps = {
  className?: string;
  userID: string;
};

const Menu: FC<MenuProps> = ({ userID }) => {
  const menuItems = [
    {
      icon: 'user',
      name: 'マイページ',
      href: '/users/[user-id]',
      as: `/users/${userID}`,
    },
    {
      icon: 'hands-helping',
      name: '友達のリスト',
      href: '/',
    },
    {
      icon: 'list',
      name: '話題のリスト',
      href: '/accomplishes/',
    },
    {
      icon: 'search',
      name: '検索',
      href: '/',
    },
    {
      icon: 'bell',
      name: 'お知らせ',
      href: '/',
    },
  ];

  return (
    <>
      <div className="hidden h-48 rounded text-beige p-2 divide-y divide-beige sticky top-custom md:block">
        {menuItems.map((item) => {
          return (
            <Link href={item.href} as={item.as} key={item.name}>
              <div className="p-4 hover:bg-red bg-blue rounded  cursor-pointer md:block">
                <a>
                  <FontAwesomeIcon
                    className="mr-4"
                    icon={item.icon as IconProp}
                  />
                  {item.name}
                </a>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="md:hidden text-beige flex fixed bottom-0 left-0 w-full">
        {menuItems.map((item) => {
          return (
            <Link href={item.href} as={item.as} key={item.name}>
              <div className="text-xs hover:bg-red text-center w-full bg-blue border-2 border-beige flex-shrink cursor-pointer inline">
                <a>
                  <FontAwesomeIcon
                    className="m-2 text-2xl"
                    icon={item.icon as IconProp}
                  /><br />
                  {item.name}
                </a>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Menu;
