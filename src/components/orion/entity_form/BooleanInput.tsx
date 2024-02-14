import { Flex, Grid, Input, Switch } from "@chakra-ui/react";
import { FC } from "react";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import { EntityFormData } from "./EntityForm";

type Props = {
  field: FieldArrayWithId<EntityFormData, "data", "id">;
  control: Control<EntityFormData, any>;
  index: number;
};

const BooleanInput: FC<Props> = ({ field, control, index }) => {
  return (
    <Grid gridTemplateColumns="1fr 1fr" columnGap={3} key={field.id}>
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
          <Flex gap={2}>
            <Switch onChange={controllerField.onChange} size="lg" />
            {controllerField.value ? "true" : "false"}
          </Flex>
        )}
      />
    </Grid>
  );
};

export default BooleanInput;
