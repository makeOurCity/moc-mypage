# kongを使用したDokcerでの環境構築

### 1.環境変数の設定

`.env.local` ファイルを作成し、編集してください。

```console
$ cp .env.example.kong .env.local
$ vi .env.local
```

- `SECRET` は、以下のコマンドから生成した文字列を使用してください。

```console
$ openssl rand -base64 32
```

### 2. SSL証明書の作成

```console
$ openssl req -newkey rsa:2048 -nodes -keyout ssl/key.pem -x509 -days 365 -out ssl/cert.pem -subj "/C=AU/ST=Some-State/L=City/O=Organization/OU=Unit/CN=example.com/emailAddress=email@example.com"
```

### 3.各種サービスの立ち上げ

```console
$ docker compose up -d # アプリケーションの起動
$ docker compose run --rm --no-deps terraform terraform apply -auto-approve # terraformによるkongの設定
```

### 4. 認証情報の取得

kong manager(GUI) http://localhost:8002/ でadminユーザーにcredentialsを発行する。
（[Client ID と Client secret の取得方法](./docs/credential.md) を参照）


### 3. ログイン
http://localhost:3000 にアクセスし、kong managerで発行・取得した `client id`, `client secret` を使用してログインする。
