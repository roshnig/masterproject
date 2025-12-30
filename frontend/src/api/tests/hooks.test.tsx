// import { renderHook } from "@testing-library/react";
// import * as http from "../httpMethods";

// afterEach(() => vi.clearAllMocks());

// vi.mock("../httpMethods", () => ({
//   apiGet: vi.fn(),
//   apiPost: vi.fn(),
//   apiPut: vi.fn(),
//   apiPatch: vi.fn(),
//   apiDelete: vi.fn(),
// }));

// describe("useApiGet hooks tests", () => {
//   it("fetches data successfully", async () => {
//     (http.apiGet as any).mockResolvedValue({
//       data: { name: "testname" },
//       status: 200,
//     });

//     // const {result} = renderHook( () => useApiGet<{name: string}>('/test',undefined, {

//     // }))
//   });
// });
