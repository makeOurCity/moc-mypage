import {
  Badge,
  Box,
  Button,
  CloseButton,
  Grid,
  IconButton,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { FC, useCallback } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import AttrsSelector from "./AttrsSelector";
import BooleanInput from "./BooleanInput";
import DateTimeInput from "./DateTimeInput";
import NumberInput from "./NumberInput";
import TextInput from "./TextInput";

const SimpleLocationFormatInput = dynamic(
  () => import("./SimpleLocationFormatInput"),
  {
    ssr: false,
  }
);

export type EntityFormData = {
  id: string;
  type: string;
  data: { type: string; key: string; value: any }[];
};

const EntityForm: FC = () => {
  const { control, handleSubmit } = useForm<EntityFormData>({
    defaultValues: { id: "", type: "", data: [] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "data" });

  const handleAppend = useCallback(
    (t: { type: string; geoJSONType?: string }) => {
      const defaultKey = [
        "geo:point",
        "geo:line",
        "geo:polygon",
        "geo:box",
        "geo:json",
      ].includes(t.type)
        ? "location"
        : "";
      append({ type: t.type, key: defaultKey, value: "" });
    },
    []
  );

  const submit = useCallback((data: EntityFormData) => {
    console.log(data);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Stack spacing={4}>
          <Box>
            <Badge colorScheme="blue">ID</Badge>
            <Grid gridTemplateColumns="1fr auto" columnGap={3} mt={1}>
              <Controller
                control={control}
                name="id"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    backgroundColor="white"
                    placeholder="ID"
                  />
                )}
              />
              <Button colorScheme="blue">UUID</Button>
            </Grid>
          </Box>
          <Box>
            <Badge colorScheme="blue">TYPE</Badge>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Input
                  mt={1}
                  value={field.value}
                  onChange={field.onChange}
                  backgroundColor="white"
                  placeholder="タイプ"
                />
              )}
            />
          </Box>
          {fields.map((field, index) => (
            <Box key={field.id}>
              <Badge colorScheme="blue">データ型: {field.type}</Badge>
              <Grid gridTemplateColumns="1fr auto" columnGap={3} mt={1}>
                {field.type === "Text" && (
                  <TextInput control={control} index={index} field={field} />
                )}
                {field.type === "Number" && (
                  <NumberInput control={control} index={index} field={field} />
                )}
                {field.type === "Boolean" && (
                  <BooleanInput control={control} index={index} field={field} />
                )}
                {field.type === "DateTime" && (
                  <DateTimeInput
                    control={control}
                    index={index}
                    field={field}
                  />
                )}
                {["geo:point", "geo:line", "geo:polygon", "geo:box"].includes(
                  field.type
                ) && (
                  <SimpleLocationFormatInput
                    control={control}
                    index={index}
                    field={field}
                  />
                )}
                <CloseButton onClick={() => remove(index)} />
              </Grid>
            </Box>
          ))}
          <Button colorScheme="blue" type="submit">
            送信
          </Button>
        </Stack>
      </form>
      <AttrsSelector handleAppend={handleAppend} />
    </>
  );
};

export default EntityForm;
