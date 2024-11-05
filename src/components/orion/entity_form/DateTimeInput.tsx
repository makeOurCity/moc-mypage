import { Grid, Input, Badge } from "@chakra-ui/react";
import dayjs from "dayjs";
import { ChangeEvent, FC, use, useCallback } from "react";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import { EntityFormData } from "./EntityForm";
import { localize } from "@/localization/localize";

type Props = {
  field: FieldArrayWithId<EntityFormData, "data", "id">;
  control: Control<EntityFormData, any>;
  index: number;
  isAttrFixed?: boolean;
};

const DateTimeInput: FC<Props> = ({ field, control, index, isAttrFixed }) => {
  const handleOnchange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, onChange: (v: any) => void) => {
      try {
        const value = dayjs(e.target.value).toISOString();
        onChange(value);
      } catch (_) {}
    },
    [control, field]
  );

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
              value={localize(controllerField.value)}
              onChange={controllerField.onChange}
              backgroundColor="white"
              placeholder="属性名"
            />
          ) : (
            <Badge marginBottom="3px">{localize(controllerField.value)}</Badge>
          )
        )}
      />
      <Controller
        control={control}
        name={`data.${index}.value` as const}
        render={({ field: controllerField }) => (
          <Input
            type="datetime-local"
            value={dayjs(controllerField.value).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) => handleOnchange(e, controllerField.onChange)}
            backgroundColor="white"
            placeholder="値"
          />
        )}
      />
    </Grid>
  );
};

export default DateTimeInput;
