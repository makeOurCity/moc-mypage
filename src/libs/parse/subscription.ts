import { CreateSubscriptionRequest } from "@/codegens/orion/api";
import {
  HttpCustomField,
  SubscriptionFormData,
} from "@/components/orion/subscription/SubscriptionForm";

function processFieldValue(key: string, value: string): string | object {
  // JSONとして処理するフィールド
  if (key === "payload" || key === "qs") {
    try {
      // まずJSONとして解析可能か確認
      const jsonObject = JSON.parse(value);
      if (key === "payload") {
        // payloadの場合はJSONをURLエンコード
        return encodeURIComponent(JSON.stringify(jsonObject));
      }
      // qsの場合はオブジェクトとして返す
      return jsonObject;
    } catch {
      // JSON解析に失敗した場合は元の値をそのまま返す
      return value;
    }
  }
  return value;
}

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
      // フィールドの種類に応じて適切な処理を行う
      const processedValue = processFieldValue(field.key, field.value);
      if (processedValue !== undefined) {
        result[field.key] = processedValue;
      }
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
