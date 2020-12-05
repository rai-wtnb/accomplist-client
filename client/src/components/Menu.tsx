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
      icon: 'search',
      name: '検索',
      href: '/',
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
      icon: 'bell',
      name: 'お知らせ',
      href: '/',
    },
  ];

  return (
    <div className="h-48 rounded text-beige p-2 divide-y divide-beige sticky top-custom">
      {menuItems.map((item) => {
        return (
          <Link href={item.href} as={item.as} key={item.name}>
            <div className="p-4 hover:bg-red bg-blue rounded  cursor-pointer">
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
  );
};

export default Menu;
