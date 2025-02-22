# Cognitoを使用した環境構築

Cognitoを使用する場合は、すでにAWS上にcognitoやorionなどが存在しているとします。それらのリソースがない場合は、[kongを使用した起動方法](./kong_with_docker.md)をお試しください。

## 環境変数の設定

`.env.local` ファイルを作成し、編集してください。

```console
$ cp .env.example.cognito .env.local
$ vi .env.local
```

- `SECRET` は、以下のコマンドから生成した文字列を使用してください。

```console
$ openssl rand -base64 32
```

- `COGNITO_XXXX` の値は、管理者に問い合わせてください。

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
$ docker compose up app
```

http://localhost:3000 にアクセス可能です。
