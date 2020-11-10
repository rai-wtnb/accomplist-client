import React, { FC, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';

type Props = {
  id: string;
}

const validation = () =>
  Yup.object().shape({
    content: Yup
      .string().required('※入力してください')
      .max(100, '※100字以下にしてください')
  });

const TodoRegister: FC<Props> = ({ id }) => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const router = useRouter();

  return (
    <div>
      {registerOpen ? (
        <div>
          <Formik
            initialValues={{ user_id: id, content: '' }}
            validationSchema={validation()}
            onSubmit={(values) => {
              axios.post(`${process.env.ACCOMPLIST_API_BROWSER}/lists`, values)
                .then(function (response) {
                  router.push(`/users/${id}`);
                  values.content = "";
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <div className="pt-2">
                  <input
                    className="rounded border border-beige w-full text-black p-1"
                    name="content"
                    value={props.values.content}
                    onChange={props.handleChange}
                  />
                  <p className="text-sm text-red">{props.errors.content}</p>
                </div>
                <button type="submit" className="button w-full p-1 my-1 py-2">
                  登録
                </button>
              </form>
            )}
          </Formik>
          <p
            className="text-center bg-blue rounded text-beige cursor-pointer hover:bg-red py-2"
            onClick={() => setRegisterOpen(false)}
          >
            <FontAwesomeIcon icon="times" />
          </p>
        </div>
      ) : (
          <p
            className="text-center bg-blue rounded text-beige cursor-pointer hover:bg-red py-2"
            onClick={() => setRegisterOpen(true)}
          >
            <FontAwesomeIcon icon="plus" />
          </p>
        )
      }
    </div >
  );
};

export default TodoRegister;
