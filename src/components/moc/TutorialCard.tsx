import { Environments } from "@/libs/environments";
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
  Link,
} from "@chakra-ui/react";
import useAxios from "axios-hooks";
import { title } from "process";
import { ReactNode, useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function MoCTutorialCard() {
  const tutorialLink = Environments.getTutorialUrl();

  if (!tutorialLink) {
    return <></>
  }

  return (
    <Card>
      <CardHeader>
        <Heading as="h1" size="md">
          チュートリアル
        </Heading>
      </CardHeader>
      <CardBody>
        <p>postmanによる<Link href={tutorialLink} color='teal.500' isExternal>チュートリアル</Link>を用意しています。</p>
        <p>基本的なエンティティの作成や削除が行えるようになりますので、Orionの使用が初めてと言う方は一度ご覧いただければと思います。</p>
      </CardBody>
    </Card>
  );
}
