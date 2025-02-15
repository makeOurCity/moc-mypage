# MoC Mypage

[![Build Test](https://github.com/makeOurCity/moc-mypage/actions/workflows/build.yml/badge.svg)](https://github.com/makeOurCity/moc-mypage/actions/workflows/build.yml) [![Build Test](https://github.com/makeOurCity/moc-mypage/actions/workflows/build.yml/badge.svg)](https://github.com/makeOurCity/moc-mypage/actions/workflows/build.yml) [![Docker Build Test](https://github.com/makeOurCity/moc-mypage/actions/workflows/docker_build.yml/badge.svg)](https://github.com/makeOurCity/moc-mypage/actions/workflows/docker_build.yml)

Make our City mypage.
# Get Started

`.env.local` ファイルを作成し、編集してください。
kong, cognitoなど用途に合わせて `.env.example.cognito`, `.env.example.kong` をご利用ください。

```console
$ cp .env.example .env.local
$ vi .env.local
```

- `SECRET` は、以下のコマンドから生成した文字列を使用してください。

```console
$ openssl rand -base64 32
```


## Cognitoを使用する場合

### 環境変数

- `COGNITO_XXXX` の値は、管理者に問い合わせてください。

次に起動方法を以下から選択してください。

- Amazon Cognito を使用
  - [ローカルのnodeで起動する](#ローカル環境での実行)
  - [dockerを使用する](#docker-環境での実行)
- Kong API Gateway を使用
  - [dockerを使用する](#KONGを使用する場合(dockerのみ))  

### ローカル環境での実行

以下のコマンドで、依存ライブラリをインストールしてください。

```console
$ npm install
```

次に、ORIONを使用するAPIのクライアントを生成します。

```console
$ npm run codegen
```

以下のコマンドで起動します。

```console
$ npm run dev
```

http://localhost:3000 でアクセス可能です。

### Docker 環境での実行

以下のコマンドで、dockerイメージをビルドし、起動してください。

```console
$ docker compose build
$ docker compose up app
```

http://localhost:3000 にアクセス可能です。


## KONGを使用する場合(dockerのみ)

各種サービスの立ち上げ

```console
$ docker compose up -d # アプリケーションの起動
$ docker compose run --rm --no-deps terraform terraform apply -auto-approve # terraformによるkongの設定
```

kong manager(GUI) http://localhost:8002/ でadminユーザーにcredentialsを発行する。
（[Client ID と Client secret の取得方法](./docs/credential.md) を参照）

http://localhost:3000 にアクセスし、kong managerで発行・取得した `client id`, `client secret` を使用してログインする。

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
