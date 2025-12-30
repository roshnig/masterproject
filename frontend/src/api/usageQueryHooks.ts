//@ts-nocheck
import type React from "react";
import { useApiGet, useApiPost } from "./hooks";

type UserDto = { id: string; email: string };
type CreateUserResponse = { message: string; user: UserDto }; // change as per ur api res data
type UsersData = { message: string; users: UserDto[] };

let currentProgress = 0;

//******  GET - with query ***** */
//option 1 - simple, no query options, no req options
const { data, isLoading, isError } = useApiGet<UsersData>("/users/");
console.log(data.data); //react query returns response inside data key and our response type also has data, error, status etc
console.log(
  data.error?.message,
  data?.status,
  data?.fileName,
  data?.uploadProgress,
);

//option 2 - add some request options which will be passed in apiGet
const { data, isLoading, isError } = useApiGet<UsersData>(
  "/users/", // url which will also be considered as query key if not passing any queryKey in next query Options parameters
  undefined, //add any UseQueryOptions here if want to add like staleTime, queryKey, queryFn etc
  {
    // add any request related options here in this object
    responseType: "json",
    headers: {},
    params: { page: 1, limit: 10 },
  },
);

//option 3 - add some request options and query options as well
const { data, isLoading, isError } = useApiGet<UsersData>(
  "/users/", // url which will also be considered as query key if not passing any queryKey in next query Options parameters
  {
    //add any UseQueryOptions here if want to add like staleTime, queryKey, queryFn etc or pass undefined if don't want to pass any query options
    staleTime: 0,
    queryKey: ["users"],
    queryFn: () => {}, //add your fn here
  },
  {
    // add any request related options here in this object
    responseType: "json",
    headers: {},
    params: { page: 1, limit: 10 },
  },
);

//******  POST - with query ***** */
const createNewUser = useApiPost<CreateUserResponse, UserDto>(
  "/users/", //api url
  ["users"], //invalidation keys here
  {
    //any query options inside this object
    onError: (e) => {
      console.error(e);
      setMessage("Error: Unexpected error occured");
    },
    onSuccess: (res) => {
      console.log(res);
      console.log(
        res.data,
        res.error,
        res.fileName,
        res.headers,
        res.uploadProgress,
        res.status,
      );
      if (res.error) {
        setMessage(res.error.message); //add toast logic here
      } else {
        setMessage(res.data?.message); //add toast logic here
      }
    },
  },
  {
    //add any api request related options here
    onUploadProgress: (progress) => {
      currentProgress = progress; // we can use currentProgress var to show progress
    },
    responseType: "blob",
    headers: {},
    params: {},
  },
);

//then we need to use this createNewUser inside handleSubmit method like below
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = {
    email: "test@gmail.com",
  };
  createNewUser.mutateAsync(formData); // use mutateAsync (if need async) or just use mutate if not async
};
