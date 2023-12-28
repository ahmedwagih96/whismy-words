"use client";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Categories, LoadingIcon } from "@/components";
import useCreatePost from "@/hooks/useCreatePost";
import {
  PaperClipIcon,
  XCircleIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import QuillEditor from "../QuillEditor";
function CreatePostForm({
  setModal,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    formSubmitHandler,
    setFile,
    setCategory,
    setTitle,
    setDescription,
    title,
    description,
    category,
    file,
    loading,
  } = useCreatePost(setModal);

  const handleSelectedImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
    e.target.value = "";
  };

  return (
    <form onSubmit={formSubmitHandler} className="create__form">
      <div>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          placeholder="Post Title"
          className="create__input title"
        />
      </div>
        <QuillEditor
          description={description}
          setDescription={setDescription}
        />
      <div className="select__inputs">
        <label className="upload__image">
          <PaperClipIcon className="image__icons" />
          <PhotoIcon className="image__icons" />
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => {
              handleSelectedImage(e);
            }}
          />
        </label>
        <Categories category={category} setCategory={setCategory} />
      </div>
      {file ? (
        <div className="image__preview">
          <XCircleIcon onClick={() => setFile(undefined)} />
          <Image
            src={URL.createObjectURL(file)}
            alt="image preview"
            width={50}
            height={50}
          />
        </div>
      ) : null}

      <button type="submit" className="create__btn" disabled={loading}>
        {loading ? <LoadingIcon /> : "Publish"}
      </button>
    </form>
  );
}

export default CreatePostForm;
