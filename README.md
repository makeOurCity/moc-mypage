# MoC Mypage

[![Build Test](https://github.com/makeOurCity/moc-mypage/actions/workflows/build.yml/badge.svg)](https://github.com/makeOurCity/moc-mypage/actions/workflows/build.yml) [![Build Test](https://github.com/makeOurCity/moc-mypage/actions/workflows/build.yml/badge.svg)](https://github.com/makeOurCity/moc-mypage/actions/workflows/build.yml) [![Docker Build Test](https://github.com/makeOurCity/moc-mypage/actions/workflows/docker_build.yml/badge.svg)](https://github.com/makeOurCity/moc-mypage/actions/workflows/docker_build.yml)

Make our City mypage.
# Get Started

`.env.local` ファイルを作成し、編集してください。

```console
$ cp .env.example .env.local
$ vi .env.local
```

- `COGNITO_XXXX` の値は、管理者に問い合わせてください。
- `SECRET` は、以下のコマンドから生成した文字列を使用してください。

```console
$ openssl rand -base64 32
```

次に起動方法を以下から選択してください。

- [ローカルのnodeで起動する](#ローカル環境での実行)
- [dockerを使用する](#docker-環境での実行)

## ローカル環境での実行

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

## Docker 環境での実行

以下のコマンドで、dockerイメージをビルドし、起動してください。

```console
$ docker compose build
$ docker compose up
```

http://localhost:3000 でアクセス可能です。


# Development

[Next.js](https://nextjs.org/) を使用し、 [chakra-ui](https://chakra-ui.com/) を採用しています。
また、chakraに関して、以下を参考にしています。

- [chakra-templates](https://chakra-templates.dev/)

# Testing

以下のコマンドで、テストが実行できます。

```console
$ npm run test
```

# KONG

```bash
# 初期化
docker compose up terraform


# lockファイルの更新
docker compose run --rm terraform terraform init -upgrade

# プラン確認
docker compose run --rm terraform terraform plan

# 適用
docker compose run --rm terraform terraform apply
```
