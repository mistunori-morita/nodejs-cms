# nodejs-cms



## step1
- `npm init`でpackage.jsonを作成


## step2
- `npm install --save express ejs`をインストール

## step3 express構築
- app.jsに記述

```app.js
var express = require('express');
var path = require('path');

//init app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Set public folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req,res){
    res.send('working');
});

//State the server
var port = 3000;
app.listen(port, function() {
  console.log('Server stated on port' + port);
});

```

- 作成ディレクトリ直下に`routes`,`public`,`modeles`を作成
- ターミナルから`npm install -g nodemon`をインストール
- その後`nodemon app.js`を入力すると起動する


## step4 mongoDB setup
- 公式サイトにいってgettingstartのリンクをクリック`npm install mongoose`をターミナルに入力

```
var express = require('express');
var path = require('path');
↓これを追記
var mongoose = require('mongoose');


//Connect to db 追記 ※xxxのところは作成した最初のフォルダ名に変更
mongoose.connect('mongodb://localhost/xxx');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log('connected mongo db');
});


/init app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Set public folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req,res){
    res.send('working');
});

//State the server
var port = 3000;
app.listen(port, function() {
  console.log('Server stated on port' + port);
});
```
- 追記後`nodemon app.js`で接続できているかチェックする


### failed to connect to server [localhost:27017] on first connect [MongoError: connect ECONNREFUSED 127.0.0.1:27017エラーが出たら
- MongoDBがインストールされていない場合は接続できない

```
1 `brew search mongo`
2 `brew install mongodb`
3 'ln -s /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents/'
4 'launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist'
5 'mongod'
6 'mongo -version'

入力したのち、`nodemon app.js`を入力して[Connected to database']と入力されていればOK

それ以外の際はエラー文をググる
```

### ディレクトリにviewsファイルを追加
- `views/_layout` フォルダを作成その中に
- `adminheader,adminfooter,header,footer`を作成

1. フォルダ作成
2. bootstrapをコピーしてテンプレを作成
3. templateを作成
4. views直下にindex.ejsを作成
5. app.jsを修正
6. 記述後`nodemon app.js`をターミナルに入力して起動確認

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title></title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css">
  </head>
  <body>

    <nav class="navbar navbar-invere">
      <div class="d-flex justify-content-between hidden-lg-up">
        <a class="navbar-brand" href="/">home</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#bd-main-nav" aria-controls="bd-main-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <div class="collapse navbar-collapse" id="bd-main-nav">
        <ul class="nav navbar-nav">
          <li class="nav-item active">
            <a href=""></a>
          </li>
          <li class="nav-item">
            <a class="nav-item nav-link active" href="/getting-started/introduction/" onclick="ga('send', 'event', 'Navbar', 'Community links', 'Docs');">Documentation</a>
          </li>
          <li class="nav-item">
            <a href=""></a>
          </li>
          <li class="nav-item">
            <a href=""></a>
          </li>
          <li class="nav-item">
            <a href=""></a>
          </li>
          <li class="nav-item">
            <a href=""></a>
          </li>
          <li class="nav-item">
            <a href=""></a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      // ここから上はheader,adminheader


      // ここから下はfooter,adminfooter
    </div>
    <!-- /.container -->

    <!-- jQuery first, then Tether, then Bootstrap JS. -->
    <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>
    </body>
    </html>

```
- 各テンプレートに切り分けて貼り付ける
- 4index.ejsを作成して下記のようにする

```ejs
<%= include _layouts/header  %>

<h1>Hello ther</h1>

<%= include _layouts/footer  %>

```
- 5app.jsコード

```javascript  
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

//Connect to db
mongoose.connect('mongodb://localhost/nodejs-cms');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to database');
});

//init app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Set public folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req,res){
  //修正箇所
    res.render('index');
});

//State the server
var port = 3000;
app.listen(port, function() {
  console.log('Server stated on port' + port);
});
```
