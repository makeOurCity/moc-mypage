# STH-Comet の動作確認

curlコマンドの `--insecure` は省略しておりますので適宜使用してください。

## 1. Orionでの subscription 作成

以下のリクエストにより、Orionにサブスクリプションを登録します。

```console
$ curl -X "POST" "https://localhost:8443/orion/v2/subscriptions" \
     -H 'Authorization: Bearer ${YOUR_TOKEN}' \
     -H 'Fiware-Service: ${YOUR_TENANT}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "subject": {
    "entities": [
      {
        "idPattern": ".*"
      }
    ]
  },
  "notification": {
    "http": {
      "url": "http://comet:8666/notify"
    },
    "attrsFormat": "legacy"
  },
  "description": "comet test"
}'
```

## 2. Entityの作成。

対象のテナントに対して簡単なEntityを作成してテストします。

```console
$ curl -X "POST" "https://localhost:8443/orion/v2/entities" \
     -H 'Authorization: Bearer ${YOUR_TOKEN}' \
     -H 'Fiware-Service: ${YOUR_TENANT}' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "id": "urn:ngsild:Test:00001",
  "type": "Test",
  "name": {
    "type": "Text",
    "value": "Test Man"
  }
}'

```

これで、subscriptionに従ってcometにもデータが飛んでいるはずです。

## 3. Orionでの確認

以下のコマンドでsubscriptionの一覧を取得します。

```console
$ curl "https://localhost:8443/orion/v2/subscriptions" \
     -H 'Authorization: Bearer ${YOUR_TOKEN}' \
     -H 'Fiware-Service: ${YOUR_TENANT}' | jq ".[0].notification.lastSuccess"
```

jqがある場合は以下が楽です。
```cosnole
$ curl "https://localhost:8443/orion/v2/subscriptions" \
     -H 'Authorization: Bearer ${YOUR_TOKEN}' \
     -H 'Fiware-Service: ${YOUR_TENANT}' | jq ".[0].notification.lastSuccess"
```

`lastSuccess` が Entity を作成した時間とほぼ一致するのであればcometへの送信がほぼ成功してるといえます。

また、以下のように特定のattributesを更新しておくことで、cometで履歴確認の際に見えやすいようになる予定です。

```console
$ curl -X "PUT" "https://localhost:8443/orion/v2/entities/urn:ngsild:Test:00001/attrs/name/value/" \
     -H 'Authorization: Bearer ${YOUR_TOKEN}' \
     -H 'Fiware-Service: ${YOUR_TENANT}' \
     -H 'Content-Type: text/plain; charset=utf-8' \
     -d "\"Test Man2\""
```

次に念の為comet上でも確認します。

## 4. Cometでの確認

cometにアクセスし、id, attributeを選択すると履歴が見れます。

```console
$ curl http://localhost:8666/STH/v1/contextEntities/type/Test/id/urn:ngsild:Test:00001/attributes/name
```
