import { useLocalStorage } from "@/hooks/useLocalStorage";
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
  const [file, setFile] = useState<File>();
  const [prevFile, setPrevFile] = useState<any>();
  const [isUploading, setIsUploading] = useState(false);
  const [fiwareService] = useLocalStorage<string | undefined>(
    "fiware-service",
    undefined
  );

  const upload = useCallback(
    async (onChange: (val: string) => void) => {
      if (!file) return;
      setIsUploading(true);
      try {
        const { data } = await axios.post("/api/media-upload/s3-presigned", {
          key: `${fiwareService}/${file.name}`,
        });
        await axios.put(data.signedUrl, file);

        onChange(data.objectUrl);
      } catch (error) {
        console.log(error);
        alert("アップロードに失敗しました");
      }
      setIsUploading(false);
    },
    [file, fiwareService]
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
        setPrevFile(reader.result);
      };
      setFile(value.target.files?.[0]);
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
              {prevFile ? (
                <img width="100%" src={prevFile} alt="" />
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
            {file && (
              <Button
                mt={2}
                colorScheme={controllerField.value ? "blackAlpha" : "green"}
                width="full"
                onClick={() => upload(controllerField.onChange)}
                disabled={!controllerField.value!}
                isLoading={isUploading}
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
