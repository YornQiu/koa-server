export default class BaseDAO {
  /**
   * 构造方法
   * @param {object} model mongoose model对象，初始化时必需
   */
  constructor(model) {
    this.model = model
  }
  /**
   * 条件查询，单个结果
   * @param {object} condition 查询条件
   * @return {object|null} 查询结果,为空时返回null
   */
  async findOne(condition) {
    const result = await this.model.findOne(condition)
    return result
  }
  /**
   * 条件查询，多个结果
   * @param {object} condition 查询条件
   * @return {array} 查询结果
   */
  async findMany(condition) {
    const result = await this.model.find(condition)
    return result
  }
  /**
   * 分页查询
   * @param {object} condition 查询条件
   * @param {number} pageNum 页码，默认1
   * @param {number} pageSize 每页数据量，默认10
   * @return {array} 查询结果
   */
  async findByPage(condition = {}, pageNum = 1, pageSize = 10) {
    const count = await this.model.countDocuments(condition)
    const list = await this.model
      .find(condition)
      .skip((parseInt(pageNum) - 1) * parseInt(pageSize))
      .limit(parseInt(pageSize))
      .sort({ _id: -1 })
      .exec()
    return { count, list }
  }
  /**
   * 根据id查询
   * @param {string} id
   * @return {object} 查询结果
   */
  async findById(id) {
    const result = await this.model.findById(id)
    return result
  }
  /**
   * 根据id删除
   * @param {string} id
   * @return {object} 查询结果
   */
  async deleteById(id) {
    const result = await this.model.findByIdAndRemove(id)
    return result
  }
  /**
   * 根据id更新
   * @param {string} id
   * @return {object} 查询结果，返回更新后的文档
   */
  async updateById(id, data, options) {
    const result = await this.model.findByIdAndUpdate(id, data, {
      new: true,
      ...options,
    })
    return result
  }
  /**
   * 新增
   * @param {object} data Json数据
   * @return {object} 新增的数据
   */
  async save(data) {
    const instance = new this.model(data)
    const result = await instance.save()
    return result
  }
  /**
   * 批量删除
   * @param {object} condition 条件
   */
  async delete(condition) {
    const result = await this.model.deleteMany(condition)
    return result
  }
  /**
   * 批量更新
   * @param {object} condition 条件
   * @param {object} data 数据
   * @param {object} options 配置项
   */
  async update(condition, data, options) {
    const result = await this.model.updateMany(condition, data, options)
    return result
  }
}
