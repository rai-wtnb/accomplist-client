import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { FC } from "react";
import Feedback from "../utils/types/feedback";
import User from "../utils/types/user";

type Props = {
  key?: string;
  userID: string;
  user: User;
  feedback: Feedback;
}

const FeedbackTemp: FC<Props> = ({ userID, user, feedback }) => {
  const dateFormat = (dateData, format) => {
    const date = new Date(dateData);
    format = format.replace(/YYYY/, date.getFullYear());
    format = format.replace(/MM/, date.getMonth() + 1);
    format = format.replace(/DD/, date.getDate());
    format = format.replace(/HH/, date.getHours());
    format = format.replace(/mm/, date.getMinutes());
    return format;
  }

  return (
    <div className="rounded border-beige border-2 p-2 my-2">

      <Link href="/users/[user-id]" as={`/users/${user.id}`}>
        <a className="flex items-center">
          <span className="hover:opacity-75 h-60">
            <span className="align-middle h-20 w-20 md:h-32 md:w-32 rounded bg-beige inline-block">
              {
                user.img ?
                  <img
                    className="rounded object-cover h-20 md:h-32 w-full inline-blok"
                    src={String(user.img)}
                  />
                  :
                  <span className="flex justify-center pt-8">
                    <FontAwesomeIcon
                      className="text-4xl md:text-6xl text-blue items-center"
                      icon="user"
                    />
                  </span>
              }
            </span>
            <h1 className="align-middle inline-block pl-10">{user.name}</h1>
          </span>
        </a>
      </Link>

      <div className="pt-6 pb-4">
        <img
          className="w-full object-cover rounded"
          src={String(feedback.img)}
        />
      </div>
      <h1 >{feedback.title}</h1>
      <p className="py-4">
        {feedback.body}
      </p>
      <p className="text-sm">{dateFormat(feedback.CreatedAt, 'YYYY.MM.DD HH:mm')}</p>

      <div className="flex flex-row-reverse p-2">
        {true ?
          <FontAwesomeIcon className="m-2 text-red text-3xl cursor-pointer hover:opacity-90" icon="heart" />
          :
          <FontAwesomeIcon className="m-2 text-blue text-3xl hover:text-red cursor-pointer" icon={['far', 'heart']} />
        }

        {
          userID == user.id ?
            <Link href="/lists/setting/[list-id]" as={`/lists/setting/${feedback.list_id}`}>
              <a>
                <button className="text-beige bg-blue hover:bg-red rounded py-1 px-2 m-2">編集</button>
              </a>
            </Link>
            :
            ""
        }
      </div>
    </div>
  )
}

export default FeedbackTemp;
