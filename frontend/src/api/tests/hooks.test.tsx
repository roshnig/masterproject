import { renderHook, waitFor } from "@testing-library/react";
import * as http from "../httpMethods";
import {
  useApiDelete,
  useApiGet,
  useApiPatch,
  useApiPost,
  useApiPut,
} from "../hooks";
import { QueryTestWrapper } from "@/tests/mocks/queryWrapper";
import { act } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

afterEach(() => vi.clearAllMocks());

vi.mock("../httpMethods", () => ({
  apiGet: vi.fn(),
  apiPost: vi.fn(),
  apiPut: vi.fn(),
  apiPatch: vi.fn(),
  apiDelete: vi.fn(),
}));

describe("useApiGet hooks tests", () => {
  it("fetches data successfully", async () => {
    (http.apiGet as any).mockResolvedValue({
      data: { name: "testname" },
      status: 200,
    });

    const { result } = renderHook(
      () =>
        useApiGet<{ name: string }>("/test", undefined, {
          params: { page: 1 },
          headers: { "x-test": "123" },
        }),
      { wrapper: QueryTestWrapper },
    );

    await waitFor(() => {
      expect(result.current.data?.data?.name).toBe("testname");
    });
    expect(http.apiGet).toHaveBeenCalledWith("/test", {
      params: { page: 1 },
      headers: { "x-test": "123" },
    });
  });

  it("handles api error", async () => {
    (http.apiGet as any).mockResolvedValue({
      data: null,
      status: 500,
      error: { message: "Failed" },
    });

    const { result } = renderHook(() => useApiGet<{ name: string }>("/test"), {
      wrapper: QueryTestWrapper,
    });

    await waitFor(() => {
      expect(result.current.data?.error?.message).toBe("Failed");
    });
  });

  it("is in loading state initially", () => {
    (http.apiGet as any).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useApiGet<{ name: string }>("/test"), {
      wrapper: QueryTestWrapper,
    });
    expect(result.current.isLoading).toBe(true);
  });
});

describe("useApiPost hooks tests", () => {
  it("posts data successfully", async () => {
    vi.spyOn(http, "apiPost").mockResolvedValue({
      data: { id: 1 },
      status: 201,
    });
    const { result } = renderHook(
      () => useApiPost<{ id: number }, { name: string }>("/test"),
      {
        wrapper: QueryTestWrapper,
      },
    );

    await act(async () => {
      await result.current.mutateAsync({ name: "john" });
    });

    await waitFor(() => {
      expect(http.apiPost).toHaveBeenCalledWith(
        "/test",
        { name: "john" },
        undefined,
      );
    });
    expect(result.current.isSuccess).toBe(true);
  });

  it("handles api error", async () => {
    vi.spyOn(http, "apiPost").mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => useApiPost("/test"), {
      wrapper: QueryTestWrapper,
    });

    await act(async () => {
      try {
        await result.current.mutateAsync({ name: "john" });
      } catch {}
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });

  it("invalidates queries on success", async () => {
    const queryClient = new QueryClient();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
    vi.spyOn(http, "apiPost").mockResolvedValue({
      data: { id: 1 },
    });
    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useApiPost("/test", ["testkey"]), {
      wrapper,
    });

    await act(async () => {
      await result.current.mutateAsync({ name: "john" });
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ["testkey"],
      });
    });
  });

  it("calls on success function", async () => {
    const onSuccessSpy = vi.fn();
    const { result } = renderHook(
      () =>
        useApiPost("/test", ["testkey"], {
          onSuccess: onSuccessSpy,
          retry: false,
        }),
      {
        wrapper: QueryTestWrapper,
      },
    );

    await act(async () => {
      await result.current.mutateAsync({ name: "john" });
    });

    await waitFor(() => {
      expect(onSuccessSpy).toHaveBeenCalled();
    });
  });
});

describe("useApiPut hooks tests", () => {
  it("updates data successfully", async () => {
    (http.apiPut as any).mockResolvedValue({
      data: { name: "updated" },
      status: 200,
    });
    const { result } = renderHook(
      () => useApiPut<{ name: string }, { name: string }>("/test/1"),
      {
        wrapper: QueryTestWrapper,
      },
    );

    await act(async () => {
      await result.current.mutateAsync({ name: "updated" });
    });

    await waitFor(() => {
      expect(http.apiPut).toHaveBeenCalledWith(
        "/test/1",
        { name: "updated" },
        undefined,
      );
    });
    expect(result.current.isSuccess).toBe(true);
  });

  it("handles api error", async () => {
    vi.spyOn(http, "apiPut").mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => useApiPut("/test/1"), {
      wrapper: QueryTestWrapper,
    });

    await act(async () => {
      try {
        await result.current.mutateAsync({ name: "updated" });
      } catch {}
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });

  it("invalidates queries on success", async () => {
    const queryClient = new QueryClient();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
    vi.spyOn(http, "apiPut").mockResolvedValue({
      data: { name: "updated" },
    });
    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useApiPut("/test/1", ["testkey1"]), {
      wrapper,
    });

    await act(async () => {
      await result.current.mutateAsync({ name: "updated" });
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ["testkey1"],
      });
    });
  });

  it("calls on success function", async () => {
    const onSuccessSpy = vi.fn();
    const { result } = renderHook(
      () =>
        useApiPut("/test/1", ["testkey1"], {
          onSuccess: onSuccessSpy,
          retry: false,
        }),
      {
        wrapper: QueryTestWrapper,
      },
    );

    await act(async () => {
      await result.current.mutateAsync({ name: "updated" });
    });

    await waitFor(() => {
      expect(onSuccessSpy).toHaveBeenCalled();
    });
  });
});

describe("useApiPatch hooks tests", () => {
  it("patches data successfully", async () => {
    (http.apiPatch as any).mockResolvedValue({
      data: { name: "patched" },
      status: 200,
    });
    const { result } = renderHook(
      () => useApiPatch<{ name: string }, { name: string }>("/test/1"),
      {
        wrapper: QueryTestWrapper,
      },
    );

    await act(async () => {
      await result.current.mutateAsync({ name: "patched" });
    });

    await waitFor(() => {
      expect(http.apiPatch).toHaveBeenCalledWith(
        "/test/1",
        { name: "patched" },
        undefined,
      );
    });
    expect(result.current.isSuccess).toBe(true);
  });

  it("handles api error", async () => {
    vi.spyOn(http, "apiPatch").mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => useApiPatch("/test/1"), {
      wrapper: QueryTestWrapper,
    });

    await act(async () => {
      try {
        await result.current.mutateAsync({ name: "patched" });
      } catch {}
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });

  it("invalidates queries on success", async () => {
    const queryClient = new QueryClient();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
    vi.spyOn(http, "apiPatch").mockResolvedValue({
      data: { name: "patched" },
    });
    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useApiPatch("/test/1", ["testkey1"]), {
      wrapper,
    });

    await act(async () => {
      await result.current.mutateAsync({ name: "patched" });
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ["testkey1"],
      });
    });
  });

  it("calls on success function", async () => {
    const onSuccessSpy = vi.fn();
    const { result } = renderHook(
      () =>
        useApiPatch("/test/1", ["testkey1"], {
          onSuccess: onSuccessSpy,
          retry: false,
        }),
      {
        wrapper: QueryTestWrapper,
      },
    );

    await act(async () => {
      await result.current.mutateAsync({ name: "patched" });
    });

    await waitFor(() => {
      expect(onSuccessSpy).toHaveBeenCalled();
    });
  });
});

describe("useApiDelete hook tests", () => {
  it("deletes data successfully", async () => {
    (http.apiDelete as any).mockResolvedValue({
      data: null,
      status: 204,
    });
    const { result } = renderHook(() => useApiDelete("/test/1"), {
      wrapper: QueryTestWrapper,
    });

    await act(async () => {
      await result.current.mutateAsync();
    });

    await waitFor(() => {
      expect(http.apiDelete).toHaveBeenCalledWith("/test/1");
    });
    expect(result.current.isSuccess).toBe(true);
  });

  it("handles api error", async () => {
    vi.spyOn(http, "apiDelete").mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => useApiDelete("/test/1"), {
      wrapper: QueryTestWrapper,
    });

    await act(async () => {
      try {
        await result.current.mutateAsync();
      } catch {}
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });

  it("invalidates queries on success", async () => {
    const queryClient = new QueryClient();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
    vi.spyOn(http, "apiDelete").mockResolvedValue({
      data: null,
    });
    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(
      () => useApiDelete("/test/1", ["deletekey"]),
      {
        wrapper,
      },
    );

    await act(async () => {
      await result.current.mutateAsync();
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ["deletekey"],
      });
    });
  });

  it("calls on success function", async () => {
    const onSuccessSpy = vi.fn();
    const { result } = renderHook(
      () =>
        useApiDelete("/test/1", ["deletekey"], {
          onSuccess: onSuccessSpy,
          retry: false,
        }),
      {
        wrapper: QueryTestWrapper,
      },
    );

    await act(async () => {
      await result.current.mutateAsync();
    });

    await waitFor(() => {
      expect(onSuccessSpy).toHaveBeenCalled();
    });
  });
});
