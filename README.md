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
