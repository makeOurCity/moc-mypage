import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Button,
  CardFooter,
  useBoolean,
} from "@chakra-ui/react";
import useAxios from "axios-hooks";
import { title } from "process";
import { ReactNode, useEffect, useState } from "react";

export default function MocTokenTable() {

  const title = "トークン情報";
  const defaultBody = "表示するボタンをクリックすると、トークン情報がここに表示されます。第三者に情報を見られないように注意してください。"

  const [buttonLabel, setButtonLabel] = useState<string>("表示する");
  const [body, setBody] = useState<string>(defaultBody);
  const [viewFlag, setViewFlag] = useBoolean(false);

  // const [
  //   { data: token, loading: loadingToken, error: getTokenError },
  //   getToken,
  // ] = useAxios({ url: "/api/token", method: "GET" }, { manual: true });

  return (
    <Card>
      <CardHeader>
        <Heading as="h1" size="md">
          { title }
        </Heading>
      </CardHeader>
      <CardBody>{ body }</CardBody>
      <CardFooter>
        <Button>{ buttonLabel }</Button>
      </CardFooter>
    </Card>
  );
}
