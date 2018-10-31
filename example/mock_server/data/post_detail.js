var Mock = require('mockjs')

module.exports = {
  id: Mock.Random.id(),
  title: Mock.Random.title(),
  description: Mock.Random.sentence(),
  banner: Mock.Random.image('500x300', Mock.Random.color()),
  content: Mock.Random.paragraph(100),
}