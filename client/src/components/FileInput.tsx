import React, { FC } from "react";
import { FormikProps } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  setImg: React.Dispatch<string>;
  props: FormikProps<any>;
  existImg: string;
  isUser: boolean;
}

// FileInput is used in Formik form.
const FileInput: FC<Props> = ({ setImg, props, existImg, isUser }) => {

  var createObjectURL;
  if (process.browser) {
    createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.URL.createObjectURL;
  }
  const handleChangeFile = (e) => {
    var files = e.target.files;
    var imageUrl = files.length === 0 ? "" : createObjectURL(files[0]);
    setImg(imageUrl)
  }

  return (
    <>
      <div className="pt-4 pb-2">
        <label htmlFor="img" className="bg-blue hover:bg-red text-beige rounded p-1 px-6">
          画像を選択
        </label>
      </div>
      <input
        className="bg-blue text-beige hidden"
        name="img"
        id="img"
        type="file"
        onChange={e => {
          handleChangeFile(e);
          props.setFieldValue("img", e.currentTarget.files[0]);
        }}
      />
      <div className={isUser ? "h-32 w-32 rounded bg-beige" : ""}>
        {
          isUser ?
            existImg ?
              <img
                className="rounded object-cover h-32 w-full"
                src={existImg}
              />
              :
              <div className="flex justify-center pt-8">
                <FontAwesomeIcon
                  className="text-7xl text-blue items-center"
                  icon="user"
                />
              </div>
            :
            existImg ?
              <img
                className="rounded mx-auto object-cover w-2/3"
                src={existImg}
              />
              :
              <img className="p-2 mx-auto" src="https://via.placeholder.com/600x400" />
        }
      </div>
    </>
  )
}

export default FileInput;
