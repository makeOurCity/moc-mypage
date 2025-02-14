# 

## 1. Kong ManagerのConsumerページに遷移する

http://localhost:8002/ にアクセスすると、以下のような画面が表示されます。

<img src="./img/kong_manager_top.png" />

左側のメニューから `Consumers` をクリックすることで、以下のような画面に遷移します。

<img src="./img/kong_manager_consumers.png" />

ここで、`terraform apply` を行っている場合は `adminユーザー` が一覧に存在しているはずです。（上記スクリーンショットのような表示になるはずです。）

## 2. Credentialのページへの遷移

`adminユーザー` をクリックすると以下のような Consumer詳細が表示されます。

<img src="./img/kong_manager_consumer_admin.png" />

さらに `Credentials` タブを選択することで credentials 一覧ページに遷移します。

<img src="./img/kong_manager_consumer_credentials.png" />

## 3. Credentialの発行


<img src="./img/kong_manager_consumer_credentials_create.png" />
