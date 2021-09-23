module.exports = {
  name: "user",
  schema: {
    username: {
      type: String,
      required: true
    }, // 用户名
    password: {
      type: String,
      required: true
    }, // 密码
    nickname: String, // 昵称
    phone_num: String, // 电话号码
    email: String, // 邮箱
    birthday: String, // 生日
    last_login_time: String, // 上次登录时间
    create_time: {
      type: Date,
      default: Date.now
    }, // 创建时间
    update_time: {
      type: Date,
      default: Date.now
    }, // 修改时间
  },
  options: {
    timestamps: { createdAt: 'create_time', updatedAt: 'update_time' },
    toObject: { 
      transform(doc, ret) {
        ret.id = doc.id
        delete ret._id
        return ret
      }
    }
  }
};
