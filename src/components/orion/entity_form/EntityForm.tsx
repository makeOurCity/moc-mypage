import {
  Badge,
  Box,
  Button,
  CloseButton,
  Grid,
  Input,
  Stack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { FC, forwardRef, useCallback, useImperativeHandle } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { uuidv7 } from "uuidv7";
import AttrsSelector from "./AttrsSelector";
import BooleanInput from "./BooleanInput";
import DateTimeInput from "./DateTimeInput";
import NumberInput from "./NumberInput";
import TextInput from "./TextInput";
import { useOrion } from "@/hooks/useOrion";
import { ListEntityTypesResponse } from "@/codegens/orion";
import RelationInput from "./RelationInput";

const SimpleLocationFormatInput: any = dynamic(
  () => import("./SimpleLocationFormatInput"),
  {
    ssr: false,
  }
);

type Props = {
  onSuccess?: () => void;
  resetOnSuccess?: boolean;
};

export type EntityFormData = {
  id: string;
  type: string;
  data: { type: string; key: string; value: any }[];
};

const EntityForm = forwardRef(
  ({ onSuccess, resetOnSuccess = true }: Props, ref) => {
    const {
      api: { entitiesApi },
    } = useOrion();
    const { control, handleSubmit, setValue, watch, reset, formState } =
      useForm<EntityFormData>({
        defaultValues: { id: "", type: "", data: [] },
      });

    const { fields, append, remove, update } = useFieldArray({
      control,
      name: "data",
    });

    const setUUID = useCallback(() => {
      let id = `${watch("id")}${uuidv7()}`;

      const type = watch("type");
      if (type) {
        id = `urn:ngsild:${type}:${uuidv7()}`;
      }

      setValue("id", id);
    }, []);

    useImperativeHandle(ref, () => ({
      handleSelectType: (data: ListEntityTypesResponse) => {
        reset();
        setValue("type", data.type);
        for (const attrKey of Object.keys(data.attrs)) {
          const types = (data.attrs as any)[attrKey].types;
          let type = types[0];
          switch (true) {
            case types.includes("geo:point"):
              type = "geo:point";
              break;
            case types.includes("geo:line"):
              type = "geo:line";
              break;
            case types.includes("geo:polygon"):
              type = "geo:polygon";
              break;
            case types.includes("geo:box"):
              type = "geo:box";
              break;
            default:
              break;
          }
          append({ type, key: attrKey, value: undefined });
        }
      },
      handleSetData: (data: { [key: string]: any }) => {
        for (const attrKey of Object.keys(data)) {
          const index = fields.findIndex((f) => f.key === attrKey);
          update(index, {
            key: attrKey,
            value: data[attrKey],
            type: fields[index]?.type || "",
          });
        }
      },
    }));

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

    const submit = useCallback(
      async (data: EntityFormData) => {
        if (formState.isSubmitting) return;
        try {
          const ngsiEntity = {
            id: data.id,
            type: data.type,
            ...data.data.reduce((acc: any, cur) => {
              if (cur.type === "Text") {
                acc[cur.key] = { type: cur.type, value: cur.value };
              }
              if (cur.type === "Number") {
                acc[cur.key] = { type: cur.type, value: Number(cur.value) };
              }
              if (cur.type === "Boolean") {
                acc[cur.key] = { type: cur.type, value: cur.value };
              }
              if (cur.type === "DateTime") {
                acc[cur.key] = { type: cur.type, value: new Date(cur.value) };
              }
              if (cur.type === "Relationship") {
                acc[cur.key] = { type: cur.type, value: cur.value };
              }
              if (
                ["geo:point", "geo:line", "geo:polygon", "geo:box"].includes(
                  cur.type
                )
              ) {
                acc[cur.key] = {
                  type: cur.type,
                  value: cur.value,
                };
              }
              return acc;
            }, {}),
          };
          await entitiesApi.createEntity("application/json", ngsiEntity);
          resetOnSuccess && reset();
          onSuccess && onSuccess();
        } catch (error) {
          alert(error);
        }
      },
      [reset, formState.isSubmitting]
    );

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
                <Button colorScheme="blue" onClick={setUUID}>
                  ID生成
                </Button>
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
                    <NumberInput
                      control={control}
                      index={index}
                      field={field}
                    />
                  )}
                  {field.type === "Boolean" && (
                    <BooleanInput
                      control={control}
                      index={index}
                      field={field}
                    />
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
                  {field.type === "Relationship" && (
                    <RelationInput
                      control={control}
                      index={index}
                      field={field}
                    />
                  )}
                  <CloseButton onClick={() => remove(index)} />
                </Grid>
              </Box>
            ))}
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={formState.isSubmitting}
            >
              送信
            </Button>
          </Stack>
        </form>
        <AttrsSelector handleAppend={handleAppend} />
      </>
    );
  }
);

EntityForm.displayName = "EntityForm";

export default EntityForm;
