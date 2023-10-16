import { Grid, Input, Textarea } from "@chakra-ui/react";
import { FC } from "react";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import { EntityFormData } from "./EntityForm";

type Props = {
  field: FieldArrayWithId<EntityFormData, "data", "id">;
  control: Control<EntityFormData, any>;
  index: number;
};

const TextInput: FC<Props> = ({ field, control, index }) => {
  return (
    <Grid gridTemplateColumns="1fr 1fr" columnGap={3}>
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
