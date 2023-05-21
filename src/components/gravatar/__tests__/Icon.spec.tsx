
import Icon  from "@/components/gravatar/Icon";
import { render } from "@testing-library/react";

describe("Gravatar icon test", () => {
  test("Icon Test", async () => {
    const { getByText } = await render(<Icon email="test@example.com" />);
  });
});
