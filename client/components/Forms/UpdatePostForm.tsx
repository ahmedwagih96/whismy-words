"use client";
import useUpdatePost from "@/hooks/useUpdatePost";
import { PostType } from "@/typings/mongoTypes";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  PaperClipIcon,
  XCircleIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { Categories, LoadingIcon } from "@/components";
import Image from "next/image";
import QuillEditor from "../QuillEditor";
function UpdatePostForm({
  post,
  setModal,
}: {
  post: PostType;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    setCategory,
    updatePostHandler,
    setFile,
    setTitle,
    setDescription,
    title,
    description,
    file,
    loading,
    category,
  } = useUpdatePost(post, setModal);

  const handleSelectedImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
    e.target.value = "";
  };
  return (
    <form
      onSubmit={(e) => updatePostHandler(e, post._id)}
      className="create__form"
    >
      <div>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          type="text"
          placeholder="Post Title"
          className="create__input title"
        />
      </div>
      <QuillEditor description={description} setDescription={setDescription} />
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
      <div className="image__preview">
        {file ? (
          <>
            <XCircleIcon onClick={() => setFile(undefined)} />
            <Image
              src={URL.createObjectURL(file)}
              alt="image preview"
              width={50}
              height={50}
            />
          </>
        ) : (
          <Image
            src={post?.image?.url}
            alt="image preview"
            width={50}
            height={50}
          />
        )}
      </div>
      <button className="create__btn" disabled={loading} type="submit">
        {loading ? <LoadingIcon /> : "Publish"}
      </button>
    </form>
  );
}

export default UpdatePostForm;
