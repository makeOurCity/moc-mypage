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

function convertHttpCustomFields(
  fields: SubscriptionFormData["httpCustomFields"]
) {
  const result: Record<string, string> = {};
  for (const field of fields) {
    if (field.key && field.value) {
      result[field.key] = field.value;
    }
  }
  return result;
}

export function createSubscriptionRequest(
  data: SubscriptionFormData
): CreateSubscriptionRequest {
  const httpCustom =
    data.notificationType === "httpCustom"
      ? convertHttpCustomFields(data.httpCustomFields)
      : undefined;

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
        : { httpCustom },
    expires: "",
    throttling: 0,
  };
}
