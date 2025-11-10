//Working but taking too long

// vi.mock("./App", () => ({
//   default: () => <div>Mock App</div>,
// }));
// const rootMock = { render: vi.fn() };
// const createRootMock = vi.fn(() => rootMock);

// test("main renders without crashing", async () => {
//   vi.mock("react-dom/client", () => ({
//     createRoot: createRootMock,
//   }));

//   await import("./main");

//   expect(createRootMock).toHaveBeenCalledTimes(1);
//   expect(rootMock.render).toHaveBeenCalledTimes(1);
// });
