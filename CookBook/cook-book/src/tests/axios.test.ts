import axios from "axios";

jest.mock("axios");

test("should fetch users", () => {
  const resp = { data: [{ name: "Bob" }] };
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.get.mockResolvedValue(resp);

  // return Users.all().then((users) => expect(users).toEqual(resp.data));
});
