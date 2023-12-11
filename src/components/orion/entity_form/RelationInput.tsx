import { useOrion } from "@/hooks/useOrion";
import { Grid, Input, Select } from "@chakra-ui/react";
import { FC, use, useEffect, useMemo, useState } from "react";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import {
  ListEntitiesResponse,
  ListEntityTypesResponse,
} from "@/codegens/orion";
import { EntityFormData } from "./EntityForm";

type Props = {
  field: FieldArrayWithId<EntityFormData, "data", "id">;
  control: Control<EntityFormData, any>;
  index: number;
};

const RelationInput: FC<Props> = ({ field, control, index }) => {
  const [types, setTypes] = useState<ListEntityTypesResponse[]>([]);
  const [entities, setEntities] = useState<ListEntitiesResponse[]>([]);
  const [selectedType, setSelectedType] = useState<string>();
  const { api } = useOrion();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.typesApi.listEntityTypes();
      setTypes(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (!field.key) return;
    setSelectedType(field.key.replace("ref", ""));
  }, [field.key]);

  useEffect(() => {
    const fetch = async () => {
      if (!selectedType) return;
      const { data } = await api.entitiesApi.listEntities(
        undefined,
        selectedType
      );
      setEntities(data);
    };
    fetch();
  }, [selectedType]);

  const typeSelectOptions = useMemo(() => {
    return types.map((type) => {
      return {
        label: type.type,
        value: type.type,
      };
    });
  }, [types]);

  const entitySelectOptions = useMemo(() => {
    return entities.map((entity: any) => {
      return {
        label: entity.name.value || entity.id,
        value: entity.id,
      };
    });
  }, [entities]);

  return (
    <Grid gridTemplateColumns="1fr 1fr" columnGap={3}>
      <Controller
        control={control}
        name={`data.${index}.key` as const}
        rules={{ required: "必須" }}
        render={({ field: controllerField }) => (
          <Select
            backgroundColor="white"
            onChange={(e) => {
              controllerField.onChange(`ref${e.target.value}`);
              setSelectedType(e.target.value);
            }}
            value={selectedType}
          >
            <option value="">Typeを選択</option>
            {typeSelectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )}
      />
      <Controller
        control={control}
        name={`data.${index}.value`}
        render={({ field: controllerField }) => (
          <Select backgroundColor="white" onChange={controllerField.onChange}>
            <option value="">Entityを選択</option>
            {entitySelectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )}
      />
    </Grid>
  );
};

export default RelationInput;
