"use client";
import { UserType } from "@/typings/mongoTypes";
import useUpdateProfile from "@/hooks/useUpdateUser";
import {
  LockClosedIcon,
  XCircleIcon,
  UserIcon,
  CameraIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { LoadingIcon } from "..";
function UpdateUserForm({
  user,
  setUpdateModal,
}: {
  user: UserType;
  setUpdateModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { loading, updateUserHandler, handleChange, userData, file, setFile } =
    useUpdateProfile(user);

  const handleSelectedImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
    e.target.value = "";
  };
  return (
    <form
      onSubmit={async (e) => {
        await updateUserHandler(e);
        setUpdateModal(false);
      }}
      className="edit__form"
    >
      <div className="user__image-wrapper">
        <img
          src={file ? URL.createObjectURL(file) : user?.profilePhoto.url}
          alt=""
          className="user__image"
        />
        <div className="icon__container">
          {!file ? (
            <label>
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) => {
                  handleSelectedImage(e);
                }}
              />
              <CameraIcon className="editIcon" />
            </label>
          ) : (
            <XCircleIcon
              onClick={() => setFile(undefined)}
              className="closeIcon"
            />
          )}
        </div>
      </div>
      <div className="form__group">
        <label htmlFor="username" className="form__label">
          Username
        </label>
        <div className="input__group">
          <UserIcon />
          <input
            onChange={handleChange}
            value={userData.username}
            type="text"
            name="username"
            placeholder="Username"
            className="form__input"
          />
        </div>
      </div>
      <div className="form__group">
        <label htmlFor="username" className="form__label">
          Bio
        </label>
        <div className="input__group">
          <BookOpenIcon />
          <input
            value={userData.bio}
            onChange={handleChange}
            type="text"
            className="form__input"
            placeholder="Bio"
            name="bio"
          />
        </div>
      </div>
      <div className="form__group">
        <label htmlFor="email" className="form__label">
          Password
        </label>
        <div className="input__group">
          <LockClosedIcon />
          <input
            onChange={handleChange}
            value={userData.password}
            type="password"
            name="password"
            placeholder="Password"
            className="form__input"
          />
        </div>
      </div>
      <div className="form__group">
        <label htmlFor="password" className="form__label">
          Confirm Password
        </label>
        <div className="input__group">
          <LockClosedIcon />
          <input
            onChange={handleChange}
            value={userData.verifyPassword}
            type="password"
            name="password"
            placeholder="Re-enter  password"
            className="form__input"
          />
        </div>
      </div>
      <button disabled={loading} className="edit__btn" type="submit">
        {loading ? <LoadingIcon /> : "Save"}
      </button>
    </form>
  );
}

export default UpdateUserForm;
