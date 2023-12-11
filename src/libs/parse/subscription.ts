import { SubscriptionFormIdPatternTypeData } from "@/components/orion/subscription/SubscriptionFormIdPatternType";
import { CreateSubscriptionRequest } from "@/codegens/orion/api"

export function SubscriptionFormIdPatternTypeDataToJson(
    data: SubscriptionFormIdPatternTypeData,
): CreateSubscriptionRequest {
    return {
        description: data.description,
        subject: {
            entities: [
                {
                    idPattern: data.idPattern,
                }
            ],
        },
        notification: {
            http: {
                url: data.url,
            },
        },
        expires: "",
        throttling: 0,
    }
}