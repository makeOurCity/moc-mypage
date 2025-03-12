import { SubscriptionFormIdPatternTypeData } from "@/components/orion/subscription/SubscriptionFormIdPatternType";
import { CreateSubscriptionRequest } from "@/codegens/orion/api";
import { SubscriptionFormData } from "@/components/orion/subscription/SubscriptionForm";

export function SubscriptionFormIdPatternTypeDataToJson(
  data: SubscriptionFormIdPatternTypeData
): CreateSubscriptionRequest {
  return {
    description: data.description,
    subject: {
      entities: [
        {
          idPattern: data.idPattern,
        },
      ],
    },
    notification: {
      http: {
        url: data.url,
      },
    },
    expires: "",
    throttling: 0,
  };
}

export function createSubscriptionRequest(
  data: SubscriptionFormData
): CreateSubscriptionRequest {
  return {
    description: data.description,
    subject: {
      entities: [
        {
          idPattern: data.idPattern,
        },
      ],
    },
    notification:
      data.notificationType === "url"
        ? { http: { url: data.url } }
        : { httpCustom: data.httpCustom },
    expires: "",
    throttling: 0,
  };
}
