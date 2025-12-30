import { mockAxiosInstance } from "@/tests/mocks/axiosMock";
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "../httpMethods";
import { report } from "process";

beforeEach(() => vi.clearAllMocks());

describe("http methods tests", () => {
  it("GET: should attach headers", async () => {
    mockAxiosInstance.request.mockResolvedValue({
      data: { name: "john" },
      status: 200,
      headers: {},
    });

    const res = await apiGet<{ name: string }>("/test");

    expect(res.data?.name).toBe("john");
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/test",
        method: "GET",
      }),
    );
  });

  it("POST: shouldsend body correctly", async () => {
    mockAxiosInstance.request.mockResolvedValue({
      data: { id: "1" },
      status: 200,
      headers: {},
    });

    const res = await apiPost<{ id: number }, { name: string }>("/test", {
      name: "john",
    });

    expect(res.data?.id).toBe("1");
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/test",
        method: "POST",
        data: { name: "john" },
      }),
    );
  });

  it("PUT: should update data correctly", async () => {
    mockAxiosInstance.request.mockResolvedValue({
      data: { name: "updated" },
      status: 200,
      headers: {},
    });

    const res = await apiPut<{ name: string }, { name: string }>("/test/1", {
      name: "updated",
    });

    expect(res.data?.name).toBe("updated");
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/test/1",
        method: "PUT",
        data: { name: "updated" },
      }),
    );
  });

  it("PATCH: should patch data correctly", async () => {
    mockAxiosInstance.request.mockResolvedValue({
      data: { name: "patched" },
      status: 200,
      headers: {},
    });

    const res = await apiPatch<{ name: string }, { name: string }>("/test/1", {
      name: "patched",
    });

    expect(res.data?.name).toBe("patched");
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/test/1",
        method: "PATCH",
        data: { name: "patched" },
      }),
    );
  });

  it("DELETE: should delete data successfully", async () => {
    mockAxiosInstance.request.mockResolvedValue({
      data: null,
      status: 204,
    });

    await apiDelete("/test/1");

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/test/1",
        method: "DELETE",
      }),
    );
  });

  it("should normalize api error", async () => {
    mockAxiosInstance.request.mockRejectedValue({
      response: {
        data: { message: "server error" },
      },
      config: { url: "/test" },
    });

    const res = await apiGet("/test");

    expect(res.error?.message).toBe("server error");
    expect(res.error?.url).toBe("/test");
  });

  it("should throw api error message", async () => {
    mockAxiosInstance.request.mockRejectedValue({
      message: "api error",
    });

    const res = await apiGet("/test");

    expect(res.error?.message).toBe("api error");
    expect(res.error?.url).toBe("/test");
  });

  it("should throw generic api error message", async () => {
    mockAxiosInstance.request.mockRejectedValue({
      status: 500,
    });

    const res = await apiGet("/test");

    expect(res.error?.message).toBe("Unknown API Error");
  });

  it(" should extract filename from blob type response", async () => {
    const blob = new Blob(["test"]);

    mockAxiosInstance.request.mockResolvedValue({
      data: blob,
      status: 201,
      headers: {
        "content-disposition": 'attachment; filename="report.pdf"',
      },
    });

    const res = await apiGet<Blob>("/file", {
      responseType: "blob",
    });

    expect(res.fileName).toBe("report.pdf");
  });

  it("should report download progress", async () => {
    let progressValue = 0;

    mockAxiosInstance.request.mockImplementationOnce((config) => {
      config.onDownloadProgress({ loaded: 50, total: 100 });
      return Promise.resolve({
        data: {},
        status: 200,
      });
    });

    await apiGet("/download", {
      onDownloadProgress: (p) => (progressValue = p),
    });

    expect(progressValue).toBe(50);
  });

  it("should report upload progress", async () => {
    let progressValue = 0;

    const newFile = new File(["hello"], "test.png", { type: "image/png" });
    const formData = new FormData();
    formData.append("file", newFile);

    mockAxiosInstance.request.mockImplementationOnce((config) => {
      config.onUploadProgress({ loaded: 50, total: 100 });
      return Promise.resolve({
        data: {},
        status: 200,
      });
    });

    await apiPost("/upload", formData, {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (p) => (progressValue = p),
    });

    expect(progressValue).toBe(50);
  });
});
