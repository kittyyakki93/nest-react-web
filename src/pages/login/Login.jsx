import React from "react";
import S from "./style";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({ mode: "onChange" });

  //[] 바깥 ^는 문자열 처음을 의미
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;


  const login = async (member) => {
    const response = await fetch("http://localhost:10000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      credentials: "include",
      body: JSON.stringify(member)
    })
    
    return response.json()
  }
  
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => { 
      console.log(res)
    },
    onError: (error) => {
      console.log(error)
    }
    })

  const onSubmit = (formData) => {
    // 데이터 요청(react query)
    loginMutation.mutate(formData)
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Label>
        <S.Title>이메일</S.Title>
        <input
          type="text"
          placeholder="아이디를 입력하세요."
          {...register("memberEmail", {
            required: true,
            pattern: {
              value: emailRegex,
            },
          })}
        />
        {errors?.memberEmail?.type === "required" && (
          <S.ConfirmMessage>이메일을 입력해주세요</S.ConfirmMessage>
        )}
        {errors?.memberEmail?.type === "pattern" && (
          <S.ConfirmMessage>이메일 양식에 맞게 입력해주세요</S.ConfirmMessage>
        )}
      </S.Label>

      <S.Label>
        <S.Title>비밀번호</S.Title>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요."
          {...register("memberPassword", {
            required: true,
            pattern: {
              value: passwordRegex,
            },
          })}
        />
        {errors?.memberPassword?.type === "required" && (
          <S.ConfirmMessage>비밀번호를 입력해주세요</S.ConfirmMessage>
        )}
        {errors?.memberPassword?.type === "pattern" && (
          <S.ConfirmMessage>
            소문자, 숫자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.
          </S.ConfirmMessage>
        )}
      </S.Label>

      <button disabled={isSubmitting}>로그인</button>
    </S.Form>
  );
};

export default Login;
