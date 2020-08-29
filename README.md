### 一、安装
node.js v7.6.0+
npm v3.x+
须安装pm2
数据库连接见项目说明

全局安装pm2
```npm i -g pm2```

安装依赖
```npm i```

启动development
```npm run dev```

启动production
```npm run build```

启动test
```npm run test```

### 二、项目结构

```
├─.gitignore                // 忽略文件配置
├─app.js                    // 应用入口
├─config.js                 // 公共配置文件
├─ecosystem.config.js       // pm2配置文件
├─package.json              // 依赖文件配置
├─README.md                 // README文档
├─routes                    // 路由
|   ├─private.js                // 校验接口
|   ├─public.js                 // 公开接口
|   └view.js                    // 页面接口
├─models                    // 模型
|   ├─index.js                  // 配置
|   └user.js                    // schema
├─controllers               // 操作业务逻辑
|      ├─index.js               // 配置
|      ├─login.js               // 登录
|      └test.js                 // 测试
├─services                  // 业务
|      ├─index.js               // 配置
|      └user.js                 // 用户
├─middlewares               // 中间件
|      ├─cors.js                // 跨域中间件
|      ├─jwt.js                 // jwt中间件
|      ├─logger.js              // 日志打印中间件
|      └response.js             // 响应及异常处理中间件
├─logs                      // 日志目录
├─lib                       // 依赖库
|  ├─error.js                   // 异常处理
|  ├─baseDAO.js                 // 基础业务类
|  └mongoDB.js                  // mongoDB配置
├─bin                       // 启动目录
|  ├─.sh/.bat                   // 启动和停止批处理文件
|  └www                         // 启动文件配置

```

### 三、项目说明
1. routes 路由
  - public 无需校验，可直接访问
  - private 需登录，身份验证通过后可访问
  - view 前端页面路由，非必须，见下节

2. views 页面
  - 页面目录，首页默认为index.html，可在routes/view中修改，如需使用模板引擎可自行安装
  - 现在的一贯做法是，前后端分离，将前端文件放入代理服务器中。如将vue项目打包后的dist文件丢进nginx中，但为了保证该框架的完整性，还是保留了views目录

3. services 业务
  - index.js 的作用为自动扫描注册当前文件夹下的业务类，但不会扫描子文件下的js文件，因此通常业务都直接放在services文件夹下，如有特殊情况，则新建子文件夹并自行处理，如该框架下的fileService目录
  - service都采用了类的写法，因此需node版本支持，并且都继承自lib目录下的baseDAO类，baseDAO中是一些基础方法，由此可避免重复编写find/delete等方法，如有其它需要，则可在service中自行扩展
  - service中导出的类名需与js文件名一致

4. models 模型
  - index.js 文件同services，如有特殊需要，新建子文件夹并自行处理
  - model实质上为mongoose的schema，按照mongoose的方法来定义字段类型，验证规则等

5. controllers 控制器
  - index.js 文件同services，如有特殊需要，新建子文件夹并自行处理
  - controller中为路由对应的方法，由于需操作数据库且koa2采用了async/await，因此该目录下方法都是async方法，编写时需注意异步的问题。
  - controller.js中方法的编写格式为：“'METHOD url': async function()”， 即：“'请求类型 请求地址'：处理方法”，method需大写，接口api统一以'/api'开头

6. pm2 
  - pm2主要用来守护应用，有兴趣可自行学习
  - pm2并非koa项目必须，但由于在package.json的scripts中使用了pm2命令，因此需先安装，或使用serve命令

7. mongodb 数据库
  - 启动本项目前需要安装MongoDB并设置用户名和密码，否则会报错
  - 数据库配置见config.js，默认端口27017，默认用户名密码为root，根据需要自行修改
  - authSource是身份验证所使用的数据库，默认为admin,一般不需要修改。由于MongoDB可以为每一个数据库单独设置用户及权限，因此在需要限制权限的时候，可以为当前项目所使用数据库单独创建用户并使用该用户来进行身份验证

8. 其他
  - 其他目录说明见项目结构章节
  - 配置文件见config.js