import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

const Profile = () => {
  const memberId = 2;
  const { register, handleSubmit } = useForm({ mode: "onChange" });

  // 업데이트 처리
  const updateProfile = async ({ memberId, thumbnail }) => {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);

    const response = await fetch(
      `http://localhost:10000/members/profile/${memberId}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (!response.ok) throw new Error("response error");
    return response.json();
  };

  const profileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log("profile response error", error);
    },
  });

  const onSubmit = (formData) => {
    console.log(formData);
    profileMutation.mutate({
      memberId: memberId,
      thumbnail: formData.thumbnail[0],
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>프로필 수정</h2>
      <input type="file" {...register("thumbnail", { required: true })} />
      <button disabled={profileMutation.isLoading}>
        {profileMutation.isLoading ? "프로필 변경" : "프로필 변경"}
      </button>
    </form>
  );
};

export default Profile;
