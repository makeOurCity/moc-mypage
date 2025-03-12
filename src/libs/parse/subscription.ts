import { CreateSubscriptionRequest } from "@/codegens/orion/api";
import {
  HttpCustomField,
  SubscriptionFormData,
} from "@/components/orion/subscription/SubscriptionForm";

function parseHttpCustomValue(value: string): string | object {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function convertHttpCustomFields(
  fields: HttpCustomField[]
): Record<string, any> {
  const result: Record<string, any> = {};
  for (const field of fields) {
    if (field.key && field.value) {
      result[field.key] = parseHttpCustomValue(field.value);
    }
  }
  return result;
}

export function createSubscriptionRequest(
  data: SubscriptionFormData
): CreateSubscriptionRequest {
  const httpCustom = convertHttpCustomFields(data.httpCustomFields);

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
      http: { url: data.url },
      ...(Object.keys(httpCustom).length > 0 ? { httpCustom } : {}),
    },
    expires: "",
    throttling: 0,
  };
}
