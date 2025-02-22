# MoC Mypage

[![Build Test](https://github.com/makeOurCity/moc-mypage/actions/workflows/build.yml/badge.svg)](https://github.com/makeOurCity/moc-mypage/actions/workflows/build.yml) [![Build Test](https://github.com/makeOurCity/moc-mypage/actions/workflows/build.yml/badge.svg)](https://github.com/makeOurCity/moc-mypage/actions/workflows/build.yml) [![Docker Build Test](https://github.com/makeOurCity/moc-mypage/actions/workflows/docker_build.yml/badge.svg)](https://github.com/makeOurCity/moc-mypage/actions/workflows/docker_build.yml)

Make our City mypage.

# 開始方法

以下から該当する環境を構築してください。

- [kongを利用したdockerでの環境構築](docs/kong_with_docker.md)
- [Amazon Cognitoを利用した環境構築](docs/with_cognito.md)


# Development

[Next.js](https://nextjs.org/) を使用し、 [chakra-ui](https://chakra-ui.com/) を採用しています。
また、chakraに関して、以下を参考にしています。

- [chakra-templates](https://chakra-templates.dev/)

# Testing

以下のコマンドで、テストが実行できます。

```console
$ npm run test
```

# KONG情報

GUI http://localhost:8002/

## terraform for kong

https://registry.terraform.io/providers/Kong/kong-gateway/latest/docs

```bash
# 初期化
docker compose up terraform

# lockファイルの更新
docker compose run --rm --no-deps terraform terraform init -upgrade

# プラン確認
docker compose run --rm --no-deps terraform terraform plan

# 適用
docker compose run --rm --no-deps terraform terraform apply -auto-approve
```

```
$ curl http://localhost:8000/orion/version
```
