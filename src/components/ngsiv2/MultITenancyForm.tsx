import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useOrion } from "@/hooks/useOrion";
import { logger } from "@/logger";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  onChangeFiwareService?: (fiwareService: string) => void;
}

/**
 *
 * @returns
 *
 * https://fiware-orion.letsfiware.jp/3.7.0/user/multitenancy/
 */
export default function MultiTenancyForm({ onChangeFiwareService }: Props = {}) {
  const toast = useToast();
  const {setFiwareServiceHeader} = useOrion();
  const [fiwareService, setFiwareService] = useLocalStorage<string>("fiware-service", "");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit((v) => {
    setFiwareService(fiwareService);
    setFiwareServiceHeader(fiwareService);

    if (onChangeFiwareService) {
      onChangeFiwareService(fiwareService);
    }

    if (fiwareService) {
      toast({
        title: "マルチテナントの設定に成功しました。",
        description: `Fiware-Service: 「${fiwareService}」 を使用します。`,
      });
    } else {
      toast({
        title: "マルチテナントの設定に成功しました。",
        description: `Fiware-Serviceは使用しません。`,
      });
    }
  });

  const onNameChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    register("name").onChange(e);
    const { name, value } = e.target
    // logger.info("on name change handler", { name, value });
    setFiwareService(value)
  }, [setFiwareService, register]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={Boolean(errors.name)}>
          <Input
            id="name"
            value={fiwareService || ""}
            placeholder="Fiware-Service"
            {...register("name", {
              required: false,
              maxLength: { value: 50, message: "最大文字数は50文字です" },
            })}
            onChange={onNameChangeHandler}
          />
          <FormErrorMessage>
            <>{errors.name && errors.name.message}</>
          </FormErrorMessage>
        </FormControl>

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          設定
        </Button>
      </form>
    </>
  );
}
