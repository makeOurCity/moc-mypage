import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Button,
  CardFooter,
  useBoolean,
  Code,
  Textarea,
  useClipboard,
  ButtonGroup,
} from "@chakra-ui/react";
import useAxios from "axios-hooks";
import { title } from "process";
import { ReactNode, useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function MocTokenTable() {

  const title = "トークン情報";
  const defaultBody = "表示するボタンをクリックすると、トークン情報がここに表示されます。第三者に情報を見られないように注意してください。"
  const buttonView = "表示する"
  const buttonHide = "隠す"

  const [buttonLabel, setButtonLabel] = useState<string>(buttonView);
  const [body, setBody] = useState<string | ReactNode>(defaultBody);
  const [viewFlag, setViewFlag] = useBoolean();
  const { onCopy, value: tokenValue, setValue: setToken, hasCopied } = useClipboard(defaultBody);

  const [
    { },
    getToken,
  ] = useAxios({ url: "/api/token", method: "GET" }, { manual: true });

  const onClick = async () => {
    if (viewFlag === false) {
      const token = await getToken()
      setToken(token.data.idToken)
      setBody(<Textarea isDisabled value={token.data.idToken}></Textarea>)
      setViewFlag.on()
      setButtonLabel(buttonHide)
    } else {
      setBody(defaultBody)
      setViewFlag.off()
      setButtonLabel(buttonView)
    }
  }

  const copyButton = () => {
    if (viewFlag === true) {
      return (
        <Button variant='ghost' onClick={onCopy}>{hasCopied ? "コピーされました！" : "コピー"}</Button>
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <Heading as="h1" size="md">
          { title }
        </Heading>
      </CardHeader>
      <CardBody>{ body }</CardBody>
      <CardFooter>
        <ButtonGroup spacing={2}>
          <Button colorScheme="teal" onClick={onClick}>{ buttonLabel }</Button>
          { copyButton()}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
