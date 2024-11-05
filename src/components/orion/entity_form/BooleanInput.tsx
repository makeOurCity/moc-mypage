import { Flex, Grid, Input, Switch, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import { EntityFormData } from "./EntityForm";

type Props = {
  field: FieldArrayWithId<EntityFormData, "data", "id">;
  control: Control<EntityFormData, any>;
  index: number;
  isAttrFixed?: boolean;
};

const BooleanInput: FC<Props> = ({ field, control, index, isAttrFixed }) => {
  return (
    <Grid gridTemplateColumns={{
      base: "1fr",
      md: "1fr 1fr"
    }} columnGap={3} key={field.id}>
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
          ): (
            <Text>{controllerField.value}</Text>
          )
        )}
      />
      <Controller
        control={control}
        name={`data.${index}.value` as const}
        render={({ field: controllerField }) => (
          <Flex gap={2}>
            <Switch
              onChange={controllerField.onChange}
              size="lg"
              defaultChecked={controllerField.value}
            />
            {controllerField.value ? "true" : "false"}
          </Flex>
        )}
      />
    </Grid>
  );
};

export default BooleanInput;
