import { createQuery, FetchStatus } from "./index"

describe("createQuery", () => {
  describe("Happy path", () => {
    const requestMock = jest.fn(async (id: string) =>
      Promise.resolve(`Received: ${id}`)
    );

    let response: string | null;
    let responseStatus: FetchStatus | undefined;

    beforeAll(async () => {
      const useSlice = createQuery(requestMock);

      await useSlice.getState().request("foo");

      responseStatus = useSlice.getState().status;
      response = useSlice.getState().value;
    });

    it("should have the right response values", () => {
      expect(response).toEqual("Received: foo");
      expect(responseStatus).toEqual("success");
    });

    it("should call request method", () => {
      expect(requestMock).toHaveBeenCalledWith("foo");
    });
  });

  describe("With error", () => {
    const requestMock = jest.fn(async () => Promise.reject());

    let responseStatus: FetchStatus | undefined;

    beforeAll(async () => {
      const useSlice = createQuery(requestMock);

      await useSlice.getState().request();

      responseStatus = useSlice.getState().status;
    });

    it("should have a failed status", () => {
      expect(responseStatus).toEqual("error");
    });
  });
});
