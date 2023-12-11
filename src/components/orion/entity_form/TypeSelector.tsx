import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useOrion } from "@/hooks/useOrion";
import { Select } from "@chakra-ui/react";
import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { ListEntityTypesResponse } from "@/codegens/orion";

type Props = {
  onChange: (data: ListEntityTypesResponse) => void;
  value: string;
};

const TypeSelector: FC<Props> = ({ onChange, value }) => {
  const [types, setTypes] = useState<ListEntityTypesResponse[]>([]);
  const { api } = useOrion();
  const [fiwareService] = useLocalStorage<string | undefined>(
    "fiware-service",
    undefined
  );

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.typesApi.listEntityTypes();
      setTypes(data);
    };
    fetch();
  }, [fiwareService]);

  const selectOptions = useMemo(() => {
    return types.map((type) => {
      return {
        label: type.type,
        value: type.type,
      };
    });
  }, [types]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = types.find((type) => type.type === e.target.value);
    if (!type) return;
    onChange(type);
  };

  return (
    <Select
      backgroundColor="white"
      mb={5}
      onChange={handleChange}
      value={value}
    >
      <option value="">既存のTypeから選ぶ</option>
      {selectOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default TypeSelector;
