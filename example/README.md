
# NEJPack Demo

> 基于`regular + nej`搭建并借助`nej-toolkit2`打包的`hello world!`.

## Prepare

> 全局安装`npm install -g browser-sync`

```
cd app
bower install
```

## Run

```
npm run clean   # 清理因打包产生后的日志文件等
npm run dev     # 开发模式
npm run deploy  # 打包模式
```

## Scenes

1. 最简打包配置 + 单模板入口文件 + 无打包标记(app)
2. 最简打包配置 + 单模板入口文件 + 最简打包标记(app.1)
3. 最简打包配置 + 多模板入口文件 + 无打包标记(app.2-坑)
4. 最简打包配置 + 多模板入口文件 + 无打包标记(app.2.1)
5. 最简打包配置 + 多模板入口文件 + 最简打包标记(app.3)

### 最简打包配置定义

### 模板文件的基本结构定义

### 最简打包标记定义

## 最简打包配置 + 单模板入口文件 + 无打包标记 (app)

### in(src)

```
.
├── css
│   └── base.css
├── html
├── javascript
│   ├── lib
│   │   ├── nej
│   │   └── regularjs
│   └── module
│       ├── app.css
│       ├── app.html
│       └── app.js
└── views
    └── index.html
```

### out(pub)

```
├── s
│   └── pt_index.js
└── v
    └── index.html
```

## 最简打包配置 + 单模板入口文件 + 最简打包标记 (app.1)


### in(src)

> 打包标记只使用了`merge`,其他与上面的`src`没有任何差别。

略

### out(pub)

```
├── s
│   ├── libRegular.js
│   └── pt_index.js
└── v
    └── index.html
```

### 思考

1. `DEFINE`标记貌似不起作用，而且`toolkit2`文档中对此也并没有介绍

## 最简打包配置 + 多模板入口文件 + 无打包标记 (app.2) 

### in(src)

```
.
├── css
│   └── base.css
├── html
├── javascript
│   ├── lib
│   └── module
└── views
    ├── index.ftl  
    └── index.html  
```

### out(pub)

```
.
├── s
│   ├── core.css
│   ├── core.js
│   └── pt_index.js
└── v
    ├── index.ftl
    └── index.html
```

### 思考

1. 同级目录相同文件名且不同后缀的模板文件打包后是有问题的，她会直接导致另一个文件的脚本丢失。而最终引用的只是另一个文件的脚本。

## 最简打包配置 + 多模板入口文件 + 无打包标记 (app.2.1) 

> 2.1和2本质上没有区别，只不过2提供了一个错误的范例，提醒大家这里需要注意的点。

### in(src)

```
.
├── css
│   ├── base.css
│   ├── index.css
│   └── index2.css
├── html
├── javascript
│   ├── lib
│   └── module
└── views
    ├── a
    │   └── index.ftl
    ├── index.html
    └── index2.html
```

### out(pub)

```
.
├── s
│   ├── core.css
│   ├── core.js
│   ├── pt_a_index.js
│   ├── pt_index.js
│   └── pt_index2.js
└── v
    ├── a
    ├── index.html
    └── index2.html
```

### 思考

#### 样式

1. 只要一个样式文件被两个及两个以上的模板文件引用就会被抽出到core样式文件中去。并分别插入到对应模板文件中。
2. 只被一个模板文件引用的样式不会被抽出到样式文件中去，默认会以内嵌的方式进行插入到模板文件。

#### 脚本

1. 只要一个脚本文件被两个及两个以上的模板文件引用就会被抽出到core脚本文件中去。并分别插入到对应的模板文件中去。
2. 只被一个模板文件引用的脚本，默认会抽出到一个脚本文件进行引用

#### 问题

这边有一个很奇怪的逻辑，至少基于最简单的打包配置默认是这么处理的。这个逻辑基本上是这样的：  
    只要满足一个样式或者脚本被两个及两个以上的引用了就会被抽出到core文件中，然而在插入对象时的标准只要满足你用到了core文件的某一部分就会被整个塞入。换句话说当你写了一个很简单的页面，都可能引入一大坨当前页面无关的脚本。

## 最简打包配置 + 多模板入口文件 + 最简打包标记(app.3)

### in(src)

略

### out(pub)

略

### 思考

1. 如果一个脚本被两个及两个以上的模板文件引用，那么如果只在一个模板文件中针对其进行标记处理。那么很可能在未标记该模板运行时产生问题。
2. 脚本顺序也是个问题，即使按我们正常的理解未引用任何库的脚本执行可以放置在任何地方，至少不会运行异常。但由于打包的关系，最终的执行的这段代码很可能被抽象到新的文件中去，而且她的顺序是受制于打包工具的。所以这里需要格外注意。这里拿本例子中的`index.html`为例。你会发现当改变`regular.js`和`index.js`的上下顺序后，打包之久就会出现问题。






