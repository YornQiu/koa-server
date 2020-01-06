module.exports = {
  name: "user",
  schema: {
    id: String, // ID
    username: {
      type: String,
      required: true
    }, // 用户名
    password: {
      type: String,
      required: true
    }, // 密码
    nickname: String, //昵称
    phone_num: String, //电话号码
    email: String, //邮箱
    birthday: String, //生日
    create_time: String, // 创建时间
    modify_time: String, // 修改时间
    last_login_time: String, // 上次登录时间
  }
};
