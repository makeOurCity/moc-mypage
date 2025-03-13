import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import NotificationTypeSelector from "../NotificationTypeSelector";
import { SubscriptionFormData } from "../SubscriptionForm";

describe("NotificationTypeSelector", () => {
  const TestComponent = () => {
    const { control } = useForm<SubscriptionFormData>({
      defaultValues: {
        description: "",
        idPattern: "",
        notificationType: "url",
        url: "",
        httpCustomFields: []
      }
    });
    return <NotificationTypeSelector control={control} />;
  };

  it("renders notification type options", () => {
    render(<TestComponent />);

    expect(screen.getByLabelText("標準 URL 通知")).toBeInTheDocument();
    expect(screen.getByLabelText("HTTP カスタム通知")).toBeInTheDocument();
  });

  it("allows selecting different notification types", () => {
    render(<TestComponent />);

    const urlRadio = screen.getByLabelText("標準 URL 通知");
    const httpCustomRadio = screen.getByLabelText("HTTP カスタム通知");

    expect(urlRadio).toBeChecked();

    fireEvent.click(httpCustomRadio);
    expect(httpCustomRadio).toBeChecked();
    expect(urlRadio).not.toBeChecked();
  });
});
