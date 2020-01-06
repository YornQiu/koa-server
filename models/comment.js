module.exports = {
  name: "comment",
  schema: {
    id: String, // ID
    content: {
      type: String,
      required: true
    }, // 内容
    article_id: {
      type: String,
      required: true
    }, // 文章id
    username: String,// 用户名
    nickname: {
      type: String,
      required: true
    },// 昵称
    replyTo: String,// 回复
    pid: String, // parent
    create_time: String, // 创建时间
    modify_time: String, // 修改时间
  }
};