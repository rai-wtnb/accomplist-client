import React, { FC, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const validation = () =>
  Yup.object().shape({
    todo: Yup
      .string().required('※入力してください')
      .max(100, '※100字以下にしてください')
  });

const TodoRegister: FC = () => {
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <div>
      {registerOpen ? (
        <div>
          <Formik
            initialValues={{ todo: '' }}
            validationSchema={validation()}
            // TODO
            onSubmit={(values) => console.log(values)}
            render={(props) => (
              <form onSubmit={props.handleSubmit}>
                <div className="pt-2">
                  <input
                    className="rounded border border-beige w-full text-black p-1"
                    name="todo"
                    value={props.values.todo}
                    onChange={props.handleChange}
                  />
                  <p className="text-sm text-red">{props.errors.todo}</p>
                </div>
                <button type="submit" className="button w-full p-1 my-1 py-2">
                  登録
                </button>
              </form>
            )}
          />
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
        )}
    </div>
  );
};

export default TodoRegister;
