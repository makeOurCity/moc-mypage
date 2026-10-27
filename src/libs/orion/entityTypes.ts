import {
  EntitiesApiFactory,
  ListEntityTypesResponse,
  TypesApiFactory,
} from "@/codegens/orion";

/**
 * GET /v2/types に options=noAttrDetail を付けるためのリクエストオプション。
 *
 * noAttrDetail なしの /v2/types は、属性の型を調べるために対象エンティティを全件読み込むため、
 * エンティティ数が多いテナントでは Orion がメモリを使い切って落ちる。
 * 生成コードの options 引数は 'count' | 'values' しか受け付けないため、axios の params で渡す。
 */
export const NO_ATTR_DETAIL_REQUEST_OPTIONS = {
  params: { options: "noAttrDetail" },
};

/** 属性の型がサンプルエンティティから分からないときに使う型 */
const FALLBACK_ATTR_TYPE = "Text";

type TypesApi = Pick<ReturnType<typeof TypesApiFactory>, "listEntityTypes">;
type EntitiesApi = Pick<ReturnType<typeof EntitiesApiFactory>, "listEntities">;
type SampleEntity = { [key: string]: any } | undefined;

/**
 * 属性の型を含まない、軽量なエンティティタイプ一覧を取得する。
 * タイプ名・属性名・件数だけが必要な画面ではこちらを使う。
 */
export const fetchEntityTypeSummaries = async (
  typesApi: TypesApi
): Promise<ListEntityTypesResponse[]> => {
  const { data } = await typesApi.listEntityTypes(
    undefined,
    undefined,
    undefined,
    NO_ATTR_DETAIL_REQUEST_OPTIONS
  );
  return data;
};

/**
 * noAttrDetail で取得したタイプ情報に、サンプルエンティティから属性の型を補う。
 * サンプルにない属性は FALLBACK_ATTR_TYPE とする。
 */
export const toEntityTypeWithAttrTypes = (
  summary: ListEntityTypesResponse,
  sample: SampleEntity
): ListEntityTypesResponse => {
  const attrs = Object.keys(summary.attrs).reduce<{ [key: string]: any }>(
    (acc, attrKey) => {
      const attrType = sample?.[attrKey]?.type;
      acc[attrKey] = { types: [attrType || FALLBACK_ATTR_TYPE] };
      return acc;
    },
    {}
  );
  return { ...summary, attrs };
};

/**
 * 指定タイプのエンティティを1件だけ取得し、属性の型を補ったタイプ情報を返す。
 * GET /v2/types/{type} も全件を読み込むため使わない。
 */
export const fetchEntityTypeWithAttrTypes = async (
  entitiesApi: EntitiesApi,
  summary: ListEntityTypesResponse
): Promise<ListEntityTypesResponse> => {
  const { data } = await entitiesApi.listEntities(
    undefined,
    summary.type,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    1
  );
  return toEntityTypeWithAttrTypes(summary, data[0]);
};
