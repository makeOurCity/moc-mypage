import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Button,
  CardFooter,
} from "@chakra-ui/react";
import useAxios from "axios-hooks";
import { title } from "process";

export default function MocTokenTable() {
  const [
    { data: token, loading: loadingToken, error: getTokenError },
    getToken,
  ] = useAxios({ url: "/api/token", method: "GET" }, { manual: true });

  function loadToken() {
    getToken();
  }

  const title = "トークン情報";
  const body = [];
  body.push(
    "表示するボタンをクリックすると、トークン情報がここに表示されます。第三者に情報を見られないように注意してください。"
  );

  return (
    <Card>
      <CardHeader>
        <Heading as="h1" size="md">
          {title}
        </Heading>
      </CardHeader>
      <CardBody>{body}</CardBody>
      <CardFooter>
        <Button onClick={loadToken}>表示する</Button>
      </CardFooter>
    </Card>
  );
}
