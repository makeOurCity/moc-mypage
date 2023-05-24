import { useOrion } from "@/hooks/useOrion";
import { logger } from "@/logger";
import { Button, FormControl, FormErrorMessage, Input, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

/**
 *
 * @returns
 *
 * https://fiware-orion.letsfiware.jp/3.7.0/user/multitenancy/
 */
export default function MultiTenancyForm() {
  const toast = useToast();
  const { fiwareService, setFiwareService, resetFiwareService } = useOrion();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit((v) => {
    logger.info(`Set Fiware-Service: ${v.name}`);
    setFiwareService(v.name);

    if (v.name) {
      toast({
        title: "マルチテナントの設定に成功しました。",
        description: `Fiware-Service: 「${v.name}」 を使用します。`,
      });
    } else {
      toast({
        title: "マルチテナントの設定に成功しました。",
        description: `Fiware-Serviceは使用しません。`,
      });
    }
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={Boolean(errors.name)}>
          <Input
            id="name"
            placeholder="Fiware-Service"
            {...register("name", {
              required: false,
              maxLength: { value: 1, message: "最大文字数は50文字です" },
            })}
          />
          <FormErrorMessage>
            <>
              {errors.name && errors.name.message}
            </>
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
