import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, ButtonProps } from "@chakra-ui/react";
import React, {  useRef } from "react";

type Props = {
  id: string;
  onAccept?(id: string): Promise<void>;
  buttonLabel?: string;
  dialogTitle?: string;
  dialogBody?: string;
}

export default function DeleteButton(
  { id, onAccept, dialogTitle, dialogBody, buttonLabel }: Props
) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const onClick = async () => {
    if (onAccept) {
      await onAccept(id);
    }

    onClose();
    return;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        bg="red.700"
        color="white"
        _hover={{
          bg: "red.600",
          color: "white",
        }}
        size="xs"
      >
        { buttonLabel || "削除" }
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>{ dialogTitle || "本当に削除しますか？" }</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              { dialogBody || "この操作は元に戻せません。" }
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                onClick={onClick}
                bg='red.700' 
                color="white"
                _hover={{
                  bg: "red.600",
                  color: "white",
                }}
                ml={3}
              >
                削除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
