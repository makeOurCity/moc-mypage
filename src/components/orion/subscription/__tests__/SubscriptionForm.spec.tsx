import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import SubscriptionForm, { SubscriptionFormData } from "../SubscriptionForm";

describe("SubscriptionForm", () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  const TestComponent = () => {
    const { control, handleSubmit } = useForm<SubscriptionFormData>({
      defaultValues: {
        description: "",
        idPattern: "",
        notificationType: "url",
        url: "",
        httpCustomFields: []
      }
    });

    return (
      <SubscriptionForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isSubmitting={false}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows URL field when URL notification type is selected", () => {
    render(<TestComponent />);

    const urlRadio = screen.getByLabelText("標準 URL 通知");
    fireEvent.click(urlRadio);

    // URL入力フィールドの存在を確認
    const urlInput = screen.getByPlaceholderText("https://example.com");
    expect(urlInput).toBeInTheDocument();

    // HTTPカスタムフィールドが非表示であることを確認
    const httpCustomField = screen.queryByText("HTTP Custom設定");
    expect(httpCustomField).not.toBeInTheDocument();
  });

  it("shows HTTP Custom fields when HTTP Custom notification type is selected", () => {
    render(<TestComponent />);

    const httpCustomRadio = screen.getByLabelText("HTTP カスタム通知");
    fireEvent.click(httpCustomRadio);

    // URL入力フィールドが非表示であることを確認
    const urlInput = screen.queryByPlaceholderText("https://example.com");
    expect(urlInput).not.toBeInTheDocument();

    // HTTPカスタムフィールドの表示を確認
    const httpCustomField = screen.getByText("HTTP Custom設定");
    expect(httpCustomField).toBeInTheDocument();
  });

  it("calls onCancel when cancel button is clicked", () => {
    render(<TestComponent />);

    const cancelButton = screen.getByText("キャンセル");
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
