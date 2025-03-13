import { CreateSubscriptionRequest } from "@/codegens/orion/api";
import {
  HttpCustomField,
  SubscriptionFormData,
} from "@/components/orion/subscription/SubscriptionForm";

function convertHttpCustomFields(
  fields: HttpCustomField[],
  url: string
): Record<string, any> {
  const result: Record<string, any> = {
    url, // notification.httpCustom.urlとしてURLを設定
  };

  // その他のカスタムフィールドを追加
  for (const field of fields) {
    if (field.key && field.value && field.key !== "url") {
      // 全ての値を文字列として扱う
      result[field.key] = field.value;
    }
  }
  return result;
}

export function createSubscriptionRequest(
  data: SubscriptionFormData
): CreateSubscriptionRequest {
  const httpCustom = convertHttpCustomFields(data.httpCustomFields, data.url);

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
      httpCustom, // notification.httpCustomとして設定
    },
    expires: "",
    throttling: 0,
  };
}
