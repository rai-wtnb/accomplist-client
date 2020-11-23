import React, { FC } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import axios from 'axios';

import List from '../utils/types/list'

type Props = {
  lists: List[];
  userID: string;
}

const ListIndex: FC<Props> = ({ lists, userID }) => {
  const router = useRouter();

  return (
    <div className="divide-y divide-beige">
      <h1 className="pb-4 text-center">AccompList</h1>

      {lists.map(list => {
        return (
          <div key={list.ID} className="grid grid-cols-9">

            <div className="col-span-1 pt-4">
              {
                list.done ?
                  <Link href="/lists/[list-id]" as={`/lists/${list.ID}`}>
                    <a className="align-middle pr-2 text-blue text-3xl hover:text-red">
                      <FontAwesomeIcon icon={["far", "check-square"]} />
                    </a>
                  </Link>
                  :
                  list.user_id == userID ?
                    <Link href="/lists/setting/[list-id]" as={`/lists/setting/${list.ID}`}>
                      <a className="align-middle pr-2 text-blue text-3xl hover:text-red">
                        <FontAwesomeIcon icon={['far', 'square']} />
                      </a>
                    </Link>
                    :
                    <div className="align-middle pr-2 text-blue text-3xl">
                      <FontAwesomeIcon icon={['far', 'square']} />
                    </div>
              }
            </div>

            <div className="col-span-5">
              <p className="py-4">
                {list.content}
              </p>
            </div>

            <div className="col-span-1" />

            <div className="col-span-2">
              {
                list.done ?
                  <Link href="/lists/[list-id]" as={`/lists/${list.ID}`}>
                    <button className="button w-20 text-center my-4 ml-auto">
                      <a>done!</a>
                    </button>
                  </Link>
                  :
                  ""
              }

              {
                list.user_id == userID ?
                  <div>
                    <FontAwesomeIcon
                      className="text-4xl text-blue hover:text-red cursor-pointer mr-4 mb-2 pt-4"
                      icon="trash"
                      onClick={() => {
                        axios.delete(`${process.env.ACCOMPLIST_API_BROWSER}/lists/specific/${String(list.ID)}`)
                        if (list.done) {
                          axios.delete(`${process.env.ACCOMPLIST_API_BROWSER}/feedbacks/${String(list.ID)}`)
                        }
                        router.push(`/users/${list.user_id}`);
                      }}
                    />
                  </div>
                  :
                  ""
              }
            </div>

          </div>
        )
      })}

    </div >
  )
}

export default ListIndex;
