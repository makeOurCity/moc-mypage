import { createSubscriptionRequest } from "../subscription";
import { CreateSubscriptionRequest } from "@/codegens/orion/api";
import { SubscriptionFormData } from "@/components/orion/subscription/SubscriptionForm";

describe("createSubscriptionRequest", () => {
  it("processes qs field as JSON object", () => {
    const formData: SubscriptionFormData = {
      description: "Test subscription",
      idPattern: ".*",
      notificationType: "httpCustom",
      url: "https://example.com",
      httpCustomFields: [
        {
          key: "qs",
          value: JSON.stringify({
            param1: "value1",
            param2: "value2",
          }),
        },
      ],
    };

    const result = createSubscriptionRequest(formData);
    expect(result.notification).toEqual({
      httpCustom: {
        url: "https://example.com",
        qs: {
          param1: "value1",
          param2: "value2",
        },
      },
    });
  });

  it("processes headers field as JSON object", () => {
    const formData: SubscriptionFormData = {
      description: "Test subscription",
      idPattern: ".*",
      notificationType: "httpCustom",
      url: "https://example.com",
      httpCustomFields: [
        {
          key: "headers",
          value: JSON.stringify({
            "Content-Type": "application/json",
            Authorization: "Bearer token",
          }),
        },
      ],
    };

    const result = createSubscriptionRequest(formData);
    expect(result.notification).toEqual({
      httpCustom: {
        url: "https://example.com",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer token",
        },
      },
    });
  });

  it("keeps headers as string when invalid JSON is provided", () => {
    const formData: SubscriptionFormData = {
      description: "Test subscription",
      idPattern: ".*",
      notificationType: "httpCustom",
      url: "https://example.com",
      httpCustomFields: [
        {
          key: "headers",
          value: "invalid-json",
        },
      ],
    };

    const result = createSubscriptionRequest(formData);
    expect(result.notification).toEqual({
      httpCustom: {
        url: "https://example.com",
        headers: "invalid-json",
      },
    });
  });

  it("keeps qs as string when invalid JSON is provided", () => {
    const formData: SubscriptionFormData = {
      description: "Test subscription",
      idPattern: ".*",
      notificationType: "httpCustom",
      url: "https://example.com",
      httpCustomFields: [
        {
          key: "qs",
          value: "invalid-json",
        },
      ],
    };

    const result = createSubscriptionRequest(formData);
    expect(result.notification).toEqual({
      httpCustom: {
        url: "https://example.com",
        qs: "invalid-json",
      },
    });
  });
});
