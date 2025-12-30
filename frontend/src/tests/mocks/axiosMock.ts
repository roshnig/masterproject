export const mockAxiosInstance = {
  request: vi.fn(),
  interceptors: {
    request: { use: vi.fn() },
    response: { use: vi.fn() },
  },
};

export const createMock = vi.fn(() => mockAxiosInstance);

vi.mock("axios", async () => {
  const actual = await vi.importActual<any>("axios");
  return {
    ...actual,
    default: {
      create: createMock,
    },
  };
});
