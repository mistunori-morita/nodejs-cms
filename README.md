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
7. ブラウザをリロードして無事表示されていればOK
```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title></title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  </head>
  <body>

    <nav class="navbar navbar-inverse">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/">project-name</a>
            </div>
            <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li><a href="/">home</a></li>
                    <li><a href="/">home</a></li>
                    <li><a href="/">home</a></li>
                    <li><a href="/">home</a></li>
                </ul>
            </div><!--/.nav-collapse -->
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
<% include _layouts/header %>

//この中にかいたものが、<div class="container">xx</div>に入ってくる
<h1>Hello ther</h1>

<% include _layouts/footer %>

//このように書くと間違いなので注意
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


#### app.js追記 これを追記することでタイトル部分の表示が変わる
```javascript

app.get('/', function(req,res){
    res.render('index',{
      title: 'HOME' //このように記述して
    });
});

・header.ejs 追記
<title><%= title %></title>

このように記述すると「HOME」が表示されるようになる

```


### step4 routesの中にpages.jsを作成
```javascript
var express = require('express');
var router = express.Router();


router.get('/', function(req,res){
    res.render('index',{
      title: 'HOME'
    });
});



//Exports
module.exports = router;



```


```javascript
app.jsの修正

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


//Set routees
var pages = require('./routes/pages.js');

app.use('/', pages);

//State the server
var port = 3000;
app.listen(port, function() {
  console.log('Server stated on port' + port);
});


個人的に`require`とめちゃくちゃ打ち間違えるので注意！！
```

#### routesにadminPagersを追加
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


//Set routees
var pages = require('./routes/pages.js');
var adminPages = require('./routes/admin_pages.js');

//ここでURLを振り分けている
app.use('/admin/pages', adminPages);
app.use('/', pages);

//State the server
var port = 3000;
app.listen(port, function() {
  console.log('Server stated on port' + port);
});


```
- Set routesに記載したら`routes/admin_pages.js`を作成すればテンプレートとルーティングが作成できる
- `app.use('/', xxxx)`ここでURLを振り分けている

#### app.js
```javascript
//Set routees
var pages = require('./routes/pages.js');
var adminPages = require('./routes/admin_pages.js');

app.use('/admin/pages', adminPages); //admin_pagesを見る指定
app.use('/', pages); //pagesを見る指定

このようにしてルーティングを切り分けている
```

#### pages.js
```javascript
var express = require('express');
var router = express.Router();

//つまりここはトップページ
router.get('/', function(req,res){
    res.render('index',{
      title: 'HOME'
    });
});


//Exports
module.exports = router;
```

#### admin_pages
```javascript
var express = require('express');
var router = express.Router();


router.get('/', function(req,res){
    res.send('admin area');
});


//Exports
module.exports = router;

```


#### さらにその中でrotingを作る際は下記のように
- pages.js
```javascript
router.get('/', function(req,res){
    res.render('index',{
      title: 'HOME'
    });
});


//URLはpages/test
//つまりpagesの先でさらに/testを作っているという意味
router.get('/test', function(req,res){
    res.send('pages test');
});

```

- admin_pages.js
```javascript
router.get('/', function(req,res){
    res.send('admin area');
});

//URLはadmin/pages/test
//つまりadmin/pagesの先でさらに/testを作っているという意味
router.get('/test', function(req,res){
    res.send('admin test');
});

```


### `npm install --save body-parser`をインストール
- ターミナルでコマンドを実行
- https://www.npmjs.com/package/body-parser ドキュメントをみて処理を記述

```javascript

1. app.jsにインポート
var bodyParser = require('body-parser');

2.`app.use(express.static(path.join(__dirname, 'public')));`の下ぐらいに記述

//Body Parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


```

### `npm install --save express-session`をインストール
- ターミナルでコマンドを実行
- https://github.com/expressjs/session ドキュメントをみて処理を記述

```javascript
1 app.jsにインポート
var session = require('express-session')

2. 先ほどの`bodyparser`の後ぐらいに記述
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

```

### `npm install --save express-validator`をインストール
- ターミナルでコマンドを実行
- https://github.com/ctavan/express-validator ドキュメントをみて処理を記述

```javascript
1 app.jsにインポート
var expressValidator = require('express-validator');

2. 先ほどの`sesion`の後ぐらいに記述※今回のはv3.2.1（エラー出るかも）
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

```

### `npm install express-messages`をインストール
- ターミナルでコマンドを実行
- `npm install connect-flash`もインストール
- https://github.com/expressjs/express-messages ドキュメントをみて処理を記述

```javascript

1. 先ほどの`validator`の後ぐらいに記述
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

2. `views/message.ejs`を作成

//これを貼り付ける

<% Object.keys(messages).forEach(function (type) { %>
  <div class="alert alert-<%= type %>">
  <% messages[type].forEach(function (message) { %>
    <%= message %>
  <% }) %>
</div>
<% }) %>

3. adminheader,headerのcontainerの下に貼り付ける
<%- messages('messages', locals) %>
```

## mongooseの設定
### modeles/page.jsを作成
```javascript
//page.jsに記述

var mongoose = require('mongoose');

// Page Schema
var PageSchema = mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  sorting: {
    type: Number
  },
});

var Page = module.exports = mongoose.model('Page', PageSchema);

```

## admin_pages編集
### routes/admin_pages.jsを編集
```javascript
var express = require('express');
var router = express.Router();

// Get pages index

router.get('/', function(req,res){
    res.send('admin area');
});

// Get add page

router.get('/add-page', function(req,res){
    var title = "";
    var slug = "";
    var content = "";

    res.render('admin/add-page',{
      title: title,
      slug: slug,
      content: content
    });

});

//Exports
module.exports = router;


```
### views/adminを作成してadd_page.ejsを作成
```javascript
書き換える
<%- include('../_layouts/adminheader') %>


<%- include('../_layouts/adminfooter') %>

※打ち間違えていなければ
http://localhost:3000/admin/pages/add-pageでアクセスできるようになる


//追記２
<%- include('../_layouts/adminheader') %>

<h2 class="page-title">Add a page</h2>
<a href="/admin/pages" class="btn btn-primary">Back to all pages</a>
<br><br>


<form method="post" action="/admin/pages/add-page">
  <div class="form-group">
    <label for="">Title</label>
    <input class="form-control" type="text" name="title" value="<%= title %>" placeholder="タイトル">
  </div>

  <div class="form-group">
    <label for="">Slug</label>
    <input class="form-control" type="text" name="slug" value="<%= slug %>" placeholder="スラッグ">
  </div>

  <div class="form-group">
    <label for="">Content</label>
    <textarea name="content" class="form-control"rows="8" cols="80" placeholder="コンテンツ"><%= content %></textarea>
  </div>

  <button class="btn btn-default">送信</button>
</form>

<%- include('../_layouts/adminfooter') %>

※この時点で入力フォームができるようになる

//adminheader.ejs修正
<!DOCTYPE html>
<html lang="ja">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title></title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  </head>
  <body>

    <nav class="navbar navbar-inverse">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                //リンク先をtopに戻るように
                <a class="navbar-brand" href="/" target="_blank">CmsShoppingCart</a>
            </div>
            <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                //admin/pagesに戻るように設定
                    <li><a href="/admin/pages">Pages</a></li>

                </ul>
            </div><!--/.nav-collapse -->
        </div>
    </nav>

    <div class="container">
    <%- messages('messages', locals) %>


//adminfooter修正
</div>
<!-- /.container -->
<br><br><br>
<hr>
//追記はこれ
<p class="text-center">&copy; CmsShoppingCart</p>

<!-- jQuery first, then Tether, then Bootstrap JS. -->
<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>
</body>
</html>

これでadmin/pages/add-pageのページで入力画面が完成される

```

### post add page1 追加
- admin_pagesに追記()
- postページの作成1

```javascript

ベースはget add pageを編集する
// Post add page
router.post('/add-page', function(req,res){

    req.checkBody('title', 'Title must have a value.').notEmpty();
    req.checkBody('content', 'Content must have a value.').notEmpty();


    var title = req.body.title;
    var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
    if(slug == '') slug = title.replace(/\s+/g, '-').toLowerCase();
    var content = req.body.content;

    var errors = req.validationErrors();

    if(errors) {
      res.render('admin/add_page',{
        errors: errors,
        title: title,
        slug: slug,
        content: content
      });
    }else{
      console.log('success');
    }
});


//adminhederに追記
<div class="container">
<%- messages('messages', locals) %>
//ここより下に追加
<% if (errors) {%>
  <% errors.forEach(function(error) { %>
    <div class="alert alert-danger">
      <%= error.msg %>
    </div>
  <% });%>
<% }%>

//app.jsを追加することでバリデートを表示できる

//SEt global errors variable
app.locals.errors = null;

■これを追加してリロードすることでエラーメッセージがヘッダーの下あたりに表示させる

```


### post add page2 追加
- admin_pagesに追記()
- postページの作成2

```javascript
//これをadmin_pagesに追記

// GEt Page modeles
var Page = require('../models/page');

if(errors) {
  res.render('admin/add_page',{
    errors: errors,
    title: title,
    slug: slug,
    content: content
  });
}else{
  Page.findOne({slug: slug}, function(err, page){
    if(page){
       req.flash('danger', 'Page slug exists, choose anotehr,');
       res.render('admin/add_page',{
         errors: errors,
         title: title,
         slug: slug,
         content: content
       });
    }else{
      var page = new Page ({
        title: title,
        slug: slug,
        content: content,
        sorting: 0
      });

      page.save(function(err){
        if(err) return console.log(err);

        req.flash('success', 'Page added!');
        res.redirect('/admin/pages');
      });
    }
  });
}

```
