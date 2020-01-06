module.exports = {
  name: "article",
  schema: {
    id: String, // ID
    title: {
      type: String,
      required: true
    }, // 标题
    author: String, // 作者
    username: {
      type: String,
      required: true
    }, //用户名
    content: {
      type: String,
      required: true
    }, // 内容
    abstract: String, // 摘要
    category: String, //分类
    state: Number, //0:草稿, 1:已发布, 2:已撤销
    create_time: String, // 创建时间
    modify_time: String, // 修改时间
  }
};