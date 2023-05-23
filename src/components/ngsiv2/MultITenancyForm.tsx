import { useMultiTenancy } from "@/hooks/useMultiTenancy";
import { Button, Input, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function MultiTenancyForm() {
  const toast = useToast();
  const { fiwareService, setFiwareService, reset } = useMultiTenancy();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit((v) => {
    setFiwareService(v.name);
    toast({
      title: "マルチテナントの設定に成功しました。",
      description: `Fiware-Service: 「${v.name}」 を使用します。`,
    })
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          id="name"
          placeholder="Fiware-Service"
          {...register("name", {})}
        />

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
