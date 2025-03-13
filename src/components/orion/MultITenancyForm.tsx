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
import { useFiwareServiceHistory } from "@/hooks/useFiwareServiceHistory";

type Props = {
  onSubmitFiwareService?: (fiwareService?: string) => void;
}

/**
 *
 * @returns
 *
 * https://fiware-orion.letsfiware.jp/3.7.0/user/multitenancy/
 */
export default function MultiTenancyForm({ onSubmitFiwareService }: Props = {}) {
  const toast = useToast();
  const {setFiwareServiceHeader} = useOrion();
  const [fiwareService, setFiwareService, loadingLocalStorage] = useLocalStorage<string | undefined>("fiware-service", undefined);
  const { addHistory } = useFiwareServiceHistory();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  /**
   * ローカルストレージから読み込んだFiware-Serviceをヘッダーにセットする。
   */
  useEffect(() => {
    logger.info("loadingLocalStorage", loadingLocalStorage, fiwareService);
    setFiwareServiceHeader(fiwareService || "");

    if (loadingLocalStorage === false) {
      if (onSubmitFiwareService) {
        onSubmitFiwareService(fiwareService);
      }
    }
  }, [loadingLocalStorage]);

  /**
   * Fiware-Serviceの設定ボタンsubmit時の挙動
   */
  const onSubmit = handleSubmit((v) => {
    setFiwareService(fiwareService);
    setFiwareServiceHeader(fiwareService || "");

    if (fiwareService) {
      // 設定ボタンクリック時に履歴に追加
      addHistory(fiwareService);
    }

    if (onSubmitFiwareService) {
      onSubmitFiwareService(fiwareService);
    }

    if (fiwareService) {
      toast({
        title: "マルチテナントの設定に成功しました。",
        description: `Fiware-Service: 「${fiwareService}」 を使用します。`,
        duration: 1100,
      });
    } else {
      toast({
        title: "マルチテナントの設定に成功しました。",
        description: `Fiware-Serviceは使用しません。`,
        duration: 900,
      });
    }
  });

  /**
   * フォームに入力された内容をリアルタイムでlocalStorageに反映する。
   */
  const onNameChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    register("name").onChange(e);
    const { name, value } = e.target;
    logger.debug("on name change handler", { name, value });
    setFiwareService(value);
  }, [setFiwareService, register]);

  // 外部から履歴が選択された場合の処理
  useEffect(() => {
    if (fiwareService) {
      setValue("name", fiwareService);
    }
  }, [fiwareService, setValue]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={Boolean(errors.name)}>
          <Input
            id="name"
            value={fiwareService || ""}
            placeholder="Fiware-Serviceヘッダーに値を入れたい場合はここに入力してください"
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
