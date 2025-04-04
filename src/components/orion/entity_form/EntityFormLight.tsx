import { Badge, Box, Button, CloseButton, Grid, Stack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { forwardRef, useCallback, useEffect, useImperativeHandle } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { uuidv7 } from "uuidv7";
import BooleanInput from "./BooleanInput";
import DateTimeInput from "./DateTimeInput";
import NumberInput from "./NumberInput";
import TextInput from "./TextInput";
import { useOrion } from "@/hooks/useOrion";
import { ListEntityTypesResponse } from "@/codegens/orion";
import RelationInput from "./RelationInput";
import { localize } from "@/localization/localize";

const SimpleLocationFormatInput: any = dynamic(
  () => import("./SimpleLocationFormatInput"),
  {
    ssr: false,
  }
);

type Props = {
  onSuccess?: () => void;
  resetOnSuccess?: boolean;
  initialData?: any;
};

export type EntityFormData = {
  id: string;
  type: string;
  data: { type: string; key: string; value: any }[];
};

const EntityForm = forwardRef(
  ({ onSuccess, resetOnSuccess = true, initialData }: Props, ref) => {
    const {
      api: { entitiesApi },
    } = useOrion();

    const { control, handleSubmit, setValue, reset, formState } =
      useForm<EntityFormData>({
        defaultValues: { id: "", type: "", data: [] },
      });

    const { fields, append, remove, update } = useFieldArray({
      control,
      name: "data",
    });

    useImperativeHandle(ref, () => ({
      handleSelectType: (data: ListEntityTypesResponse) => {
        reset();
        setValue("type", data.type);
        setValue("id", `urn:ngsild:${data.type}:${uuidv7()}`);
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
          if (initialData) {
            delete ngsiEntity.id;
            delete ngsiEntity.type;
            await entitiesApi.updateExistingEntityAttributes(
              initialData.id,
              "application/json",
              ngsiEntity
            );
          } else {
            await entitiesApi.createEntity("application/json", ngsiEntity);
          }
          resetOnSuccess && reset();
          onSuccess && onSuccess();
        } catch (error) {
          alert(error);
        }
      },
      [reset, formState.isSubmitting, initialData]
    );

    // Editページの場合initialDataをセット
    useEffect(() => {
      if (initialData) {
        setValue("id", initialData.id);
        setValue("type", initialData.type);
        for (const key of Object.keys(initialData)) {
          if (key === "id" || key === "type") continue;
          const type = initialData[key].type;
          if (fields.some((f) => f.key === key)) continue;
          const value = initialData[key].value;
          append({ type, key, value });
        }
      }
    }, [initialData]);

    return (
      <>
        <form onSubmit={handleSubmit(submit)}>
          <Stack spacing={4}>
            {fields.map((field, index) => (
              <Box key={field.id}>
                <Badge colorScheme="blue">
                  データ型: {localize(field.type)}
                </Badge>
                <Grid gridTemplateColumns="1fr auto" columnGap={3} mt={1}>
                  {field.type === "Text" && (
                    <TextInput
                      control={control}
                      index={index}
                      field={field}
                      isAttrFixed
                    />
                  )}
                  {field.type === "Number" && (
                    <NumberInput
                      control={control}
                      index={index}
                      field={field}
                      isAttrFixed
                    />
                  )}
                  {field.type === "Boolean" && (
                    <BooleanInput
                      control={control}
                      index={index}
                      field={field}
                      isAttrFixed
                    />
                  )}
                  {field.type === "DateTime" && (
                    <DateTimeInput
                      control={control}
                      index={index}
                      field={field}
                      isAttrFixed
                    />
                  )}
                  {["geo:point", "geo:line", "geo:polygon", "geo:box"].includes(
                    field.type
                  ) && (
                    <SimpleLocationFormatInput
                      control={control}
                      index={index}
                      field={field}
                      isAttrFixed
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
      </>
    );
  }
);

EntityForm.displayName = "EntityForm";

export default EntityForm;
