import { Grid, Input, Badge } from "@chakra-ui/react";
import { FC } from "react";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import { EntityFormData } from "./EntityForm";
import { localize } from "@/localization/localize";

type Props = {
  field: FieldArrayWithId<EntityFormData, "data", "id">;
  control: Control<EntityFormData, any>;
  index: number;
  isAttrFixed?: boolean;
};

const NumberInput: FC<Props> = ({ field, control, index, isAttrFixed }) => {
  return (
    <Grid
      gridTemplateColumns={{
        base: "1fr",
        md: "1fr 1fr",
      }}
      columnGap={3}
    >
      <Controller
        control={control}
        name={`data.${index}.key` as const}
        rules={{ required: "必須" }}
        render={({ field: controllerField }) =>
          !isAttrFixed ? (
            <Input
              value={controllerField.value}
              onChange={controllerField.onChange}
              backgroundColor="white"
              placeholder="属性名"
            />
          ) : (
            <Badge marginBottom="3px">{localize(controllerField.value)}</Badge>
          )
        }
      />
      <Controller
        control={control}
        name={`data.${index}.value` as const}
        render={({ field: controllerField }) => (
          <Input
            value={controllerField.value}
            onChange={controllerField.onChange}
            backgroundColor="white"
            placeholder="値"
            type="number"
          />
        )}
      />
    </Grid>
  );
};

export default NumberInput;
