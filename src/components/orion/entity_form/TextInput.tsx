import { Grid, Input, Text, Textarea } from "@chakra-ui/react";
import { FC } from "react";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import { EntityFormData } from "./EntityForm";

type Props = {
  field: FieldArrayWithId<EntityFormData, "data", "id">;
  control: Control<EntityFormData, any>;
  index: number;
  isAttrFixed?: boolean;
};

const TextInput: FC<Props> = ({ field, control, index, isAttrFixed }) => {
  return (
    <Grid gridTemplateColumns={{
      base: "1fr",
      md: "1fr 1fr"
    }} columnGap={3}>
      <Controller
        control={control}
        name={`data.${index}.key` as const}
        rules={{ required: "必須" }}
        render={({ field: controllerField }) => (
          !isAttrFixed ? (
            <Input
              value={controllerField.value}
              onChange={controllerField.onChange}
              backgroundColor="white"
              placeholder="属性名"
            />
          ) : (
            <Text>{controllerField.value}</Text>
          )
        )}
      />
      <Controller
        control={control}
        name={`data.${index}.value` as const}
        render={({ field: controllerField }) => (
          <Textarea
            value={controllerField.value}
            onChange={controllerField.onChange}
            backgroundColor="white"
            placeholder="値"
          />
        )}
      />
    </Grid>
  );
};

export default TextInput;
