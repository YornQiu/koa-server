/**
 * pm2配置文件
 */
module.exports = {
  apps : [{
    name: 'API',
    script: './bin/www',                      //执行脚本
    args: '',                                 //传递给脚本的参数
    instances: 1,                             //实例个数
    autorestart: true,
    watch: true,
    ignore_watch: [                           // 不用监听的文件
      'node_modules',
      'logs'
    ],
    error_file: "./logs/app-err.log",         // 错误日志文件
    out_file: "./logs/app-out.log",           // 正常日志文件
    log_date_format: "YYYY-MM-DD HH:mm:ss",   // 日志时间格式
    max_memory_restart: '1G',                 // 最大内存限制
    env_pro: {
      "NODE_ENV": "production",
      "REMOTE_ADDR": ""
    },
    env_dev: {
      "NODE_ENV": "development",
      "REMOTE_ADDR": ""
    },
    env_test: {
      "NODE_ENV": "test",
      "REMOTE_ADDR": ""
    }
  }]
};
