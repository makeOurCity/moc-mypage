import {
  NO_ATTR_DETAIL_REQUEST_OPTIONS,
  fetchEntityTypeSummaries,
  fetchEntityTypeWithAttrTypes,
  toEntityTypeWithAttrTypes,
} from "../entityTypes";
import { ListEntityTypesResponse, TypesApiFactory } from "@/codegens/orion/api";
import axios from "axios";

describe("NO_ATTR_DETAIL_REQUEST_OPTIONS", () => {
  it("adds options=noAttrDetail to the query", () => {
    expect(NO_ATTR_DETAIL_REQUEST_OPTIONS).toEqual({
      params: { options: "noAttrDetail" },
    });
  });
});

describe("fetchEntityTypeSummaries", () => {
  it("requests /v2/types with options=noAttrDetail and returns the list", async () => {
    const summaries: ListEntityTypesResponse[] = [
      { type: "Camera", attrs: { in: { types: [] } }, count: 3 },
    ];
    const listEntityTypes = jest.fn().mockResolvedValue({ data: summaries });

    const result = await fetchEntityTypeSummaries({ listEntityTypes });

    expect(listEntityTypes).toHaveBeenCalledWith(
      undefined,
      undefined,
      undefined,
      NO_ATTR_DETAIL_REQUEST_OPTIONS
    );
    expect(result).toEqual(summaries);
  });

  it("sends options=noAttrDetail in the URL through the generated client", async () => {
    let requestedUri = "";
    const instance = axios.create({
      baseURL: "/api/orion",
      adapter: async (config) => {
        requestedUri = instance.getUri(config);
        return { data: [], status: 200, statusText: "OK", headers: {}, config };
      },
    });

    await fetchEntityTypeSummaries(TypesApiFactory(undefined, "", instance));

    expect(requestedUri).toBe("/api/orion/v2/types/?options=noAttrDetail");
  });
});

describe("toEntityTypeWithAttrTypes", () => {
  const summary: ListEntityTypesResponse = {
    type: "CrowdFlowObserved",
    attrs: {
      peopleCount: { types: [] },
      location: { types: [] },
      note: { types: [] },
    },
    count: 2,
  };

  it("fills attribute types from the sample entity", () => {
    const sample = {
      id: "urn:ngsild:CrowdFlowObserved:1",
      type: "CrowdFlowObserved",
      peopleCount: { type: "Number", value: 1 },
      location: { type: "geo:json", value: { type: "Point", coordinates: [0, 0] } },
      note: { type: "Text", value: "a" },
    };

    const result = toEntityTypeWithAttrTypes(summary, sample);

    expect(result).toEqual({
      type: "CrowdFlowObserved",
      attrs: {
        peopleCount: { types: ["Number"] },
        location: { types: ["geo:json"] },
        note: { types: ["Text"] },
      },
      count: 2,
    });
  });

  it("falls back to Text for attributes missing in the sample entity", () => {
    const sample = {
      id: "urn:ngsild:CrowdFlowObserved:1",
      type: "CrowdFlowObserved",
      peopleCount: { type: "Number", value: 1 },
    };

    const result = toEntityTypeWithAttrTypes(summary, sample);

    expect(result.attrs).toEqual({
      peopleCount: { types: ["Number"] },
      location: { types: ["Text"] },
      note: { types: ["Text"] },
    });
  });

  it("falls back to Text for all attributes when there is no sample entity", () => {
    const result = toEntityTypeWithAttrTypes(summary, undefined);

    expect(result.attrs).toEqual({
      peopleCount: { types: ["Text"] },
      location: { types: ["Text"] },
      note: { types: ["Text"] },
    });
  });

  it("does not mutate the given summary", () => {
    toEntityTypeWithAttrTypes(summary, undefined);

    expect(summary.attrs).toEqual({
      peopleCount: { types: [] },
      location: { types: [] },
      note: { types: [] },
    });
  });
});

describe("fetchEntityTypeWithAttrTypes", () => {
  it("fetches one entity of the type and fills attribute types from it", async () => {
    const summary: ListEntityTypesResponse = {
      type: "Camera",
      attrs: { in: { types: [] } },
      count: 10,
    };
    const listEntities = jest.fn().mockResolvedValue({
      data: [{ id: "c1", type: "Camera", in: { type: "Number", value: 0 } }],
    });

    const result = await fetchEntityTypeWithAttrTypes({ listEntities }, summary);

    expect(listEntities).toHaveBeenCalledTimes(1);
    const args = listEntities.mock.calls[0];
    expect(args[1]).toBe("Camera"); // type
    expect(args[9]).toBe(1); // limit
    expect(result.attrs).toEqual({ in: { types: ["Number"] } });
  });
});
