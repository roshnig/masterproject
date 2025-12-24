/*********** Use Generic method - not required (as we have utils http methods now but can be used directly ************** */
import { apiRequest } from "./apiRequest";
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "./httpMethods";
//inside useEffect
const fetchData = async () => {
  //const {data, error, status} = await apiRequest({url: '/abc'});
  const res = await apiRequest({ url: "/abc" });
  console.log(res);
};
try {
  fetchData();
} catch (e) {
  console.error(e);
}

//************ */ how to use api utils methods in your app ************/

//******  GET - without query ***** */
type User = { id: string; email: string };

const res1 = await apiGet<User[]>("/users"); // if don't want to send any other req options

// OR add any option here from type CommonReqOptions. these will be added in your req appropriately
const res = await apiGet<User[]>("/users", {
  responseType: "json",
  headers: {},
  params: { page: 1, limit: 10 },
});
if (res.error) {
  //toast(res.error.message);
  console.error(res.error.message);
} else {
  //setUsers(res.data);
  console.log(res.data);
}

//******  POST - without react query ***** */
type CreateUserDto = { email: string; password: string };
type CreateUserResponse = { id: string };
const resB = await apiPost<CreateUserResponse, CreateUserDto>("/users", {
  email: "test@test.com",
  password: "12345",
});
if (!resB.error) {
  console.log(resB.data?.id);
}

//******  Patch ( will replace partial data) - without react query ***** */
await apiPatch("/users/123", {
  email: "new@test.com",
});

//******  Delete - without react query ***** */
await apiDelete("/users/1");

//******  File upload with progress ***** */
let progress = 0;
type UploadResponse = {}; // update as per your response type
const formData = new FormData();
//formData.append("file", file);  //commented because don't have a real file here to upload

await apiPost<UploadResponse, FormData>("/files/upload", formData, {
  headers: { "Content-Type": "multipart/form-data" },
  onUploadProgress: (currentProgress) => {
    progress = currentProgress; //you can display this value in progressBar/in modal etc
  },
});

//******  Download file with progress and file name ***** */
let progressD = 0;
const resC = await apiGet<Blob>("/file", {
  responseType: "blob",
  onDownloadProgress: (progress) => {
    progressD = progress;
  },
});
console.log(resC); // here you will get filename

/*********** Abortable request - serach, Autocomplete ***************/
const controller = new AbortController();
apiGet("/search", {
  params: { q: "myserachterm" },
  signal: controller.signal,
});
// on new request (when serach, we constantly fire new api call), cancel previous api call
controller.abort();
