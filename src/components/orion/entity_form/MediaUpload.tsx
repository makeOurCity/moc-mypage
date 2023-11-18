import { Box, Button, Flex, Grid, Input, InputGroup } from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, FC, useCallback, useRef, useState } from "react";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import { EntityFormData } from "./EntityForm";

type Props = {
  field: FieldArrayWithId<EntityFormData, "data", "id">;
  control: Control<EntityFormData, any>;
  index: number;
};

const MediaUploadInput: FC<Props> = ({ field, control, index }) => {
  const [prevImage, setPrevImage] = useState<any>();

  const upload = useCallback(
    async (onChange: (val: string) => void) => {
      if (!prevImage) return;
      try {
        const { data } = await axios.post("/api/media-upload/s3-presigned", {
          key: "test.jpg",
        });
        await axios.put(data.signedUrl, prevImage);

        onChange(data.objectUrl);
      } catch (error) {
        console.log(error);
        alert("アップロードに失敗しました");
      }
    },
    [prevImage]
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = useCallback(
    (value: ChangeEvent<HTMLInputElement>, onChange: (val: string) => void) => {
      onChange("");
      const reader = new FileReader();
      reader.onload = () => {
        setPrevImage(reader.result);
      };
      value.target.files && reader.readAsDataURL(value.target.files?.[0]);
    },
    []
  );

  return (
    <Grid
      gridTemplateColumns={{ base: "auto", md: "1fr 1fr" }}
      gap={3}
      key={field.id}
    >
      <Controller
        control={control}
        name={`data.${index}.key` as const}
        rules={{ required: "必須" }}
        render={({ field: controllerField }) => (
          <Input
            value={controllerField.value}
            onChange={controllerField.onChange}
            backgroundColor="white"
            placeholder="属性名"
          />
        )}
      />

      <Controller
        control={control}
        name={`data.${index}.value` as const}
        render={({ field: controllerField }) => (
          <Box cursor="pointer">
            <div onClick={handleClick}>
              {prevImage ? (
                <img width="100%" src={prevImage} alt="" />
              ) : (
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor="lightgray"
                  width="100%"
                  height="250px"
                  fontWeight="bold"
                  textAlign="center"
                  borderRadius="lg"
                >
                  クリックして画像を選択
                </Flex>
              )}
            </div>
            <input
              onChange={(v) => handleChange(v, controllerField.onChange)}
              type="file"
              accept="image/*"
              ref={inputRef}
              hidden
            />
            {prevImage && (
              <Button
                mt={2}
                colorScheme={controllerField.value ? "blackAlpha" : "green"}
                width="full"
                onClick={() => upload(controllerField.onChange)}
                disabled={!controllerField.value!}
              >
                {controllerField.value
                  ? "アップロード済"
                  : "クリックしてアップロード"}
              </Button>
            )}
          </Box>
        )}
      />
    </Grid>
  );
};

export default MediaUploadInput;
