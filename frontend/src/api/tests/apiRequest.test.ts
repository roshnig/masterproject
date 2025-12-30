import { mockAxiosInstance } from "@/tests/mocks/axiosMock";
import { apiRequest } from "../apiRequest";

describe("generic api tests", () => {
  it("should attach headers", async () => {
    mockAxiosInstance.request.mockResolvedValue({
      data: { name: "john" },
      status: 200,
      headers: {},
    });

    const res = await apiRequest<{ name: string }>({
      url: "/test",
      method: "GET",
      headers: {
        "x-test": "123",
      },
    });

    expect(res.data?.name).toBe("john");
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/test",
        method: "GET",
        headers: {
          "x-test": "123",
        },
      }),
    );
  });

  it("should pass params correctly", async () => {
    mockAxiosInstance.request.mockResolvedValue({
      data: { name: "john" },
      status: 200,
      headers: {},
    });

    await apiRequest<{ name: string }>({
      url: "/test",
      method: "GET",
      params: {
        page: "1",
      },
    });

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/test",
        method: "GET",
        params: {
          page: "1",
        },
      }),
    );
  });
});
