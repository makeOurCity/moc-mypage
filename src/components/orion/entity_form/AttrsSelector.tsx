import { Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  handleAppend: (t: { type: string; geoJSONType?: string }) => void;
};

const AttrsSelector: FC<Props> = ({ handleAppend }) => {
  const basicTypes = [
    {
      type: "Text",
      name: "テキスト",
    },
    {
      type: "Number",
      name: "数値",
    },
    {
      type: "Boolean",
      name: "真偽値",
    },
    {
      type: "DateTime",
      name: "日時",
    },
    {
      type: "SingleFile",
      name: "ファイル",
    },
    {
      type: "geo:point",
      name: "地点（シンプル・ロケーション・フォーマット）",
    },
    {
      type: "geo:line",
      name: "線（シンプル・ロケーション・フォーマット）",
    },
    {
      type: "geo:polygon",
      name: "多角形（シンプル・ロケーション・フォーマット）",
    },
    {
      type: "geo:box",
      name: "ボックス（シンプル・ロケーション・フォーマット）",
    },
    {
      type: "Relationship",
      name: "リレーション",
    },
    // {
    //   type: "geo:json",
    //   geoJSONType: "Point",
    //   name: "地点（GeoJSON）",
    // },
    // {
    //   type: "geo:json",
    //   geoJSONType: "LineString",
    //   name: "線（GeoJSON）",
    // },
    // {
    //   type: "geo:json",
    //   geoJSONType: "Polygon",
    //   name: "多角形（GeoJSON）",
    // },
  ];

  return (
    <>
      <Divider my={5} borderColor="black" />
      <Heading as="h3" fontSize="lg" mb={5}>
        属性追加
      </Heading>
      <Flex gap={3} overflow="auto" mt={0}>
        {basicTypes.map((t, index) => (
          <Flex
            justifyContent="center"
            alignItems="center"
            p={3}
            border="1px solid gray"
            borderRadius={5}
            backgroundColor="white"
            key={index}
            cursor="pointer"
            onClick={() => handleAppend(t)}
          >
            <Text w="150px" fontSize="sm" textAlign="center">
              {t.name}
            </Text>
          </Flex>
        ))}
      </Flex>
    </>
  );
};

export default AttrsSelector;
