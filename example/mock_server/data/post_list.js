var Mock = require('mockjs')

var posts = [];

for(let i=0; i < 10; i++) {
  posts.push(
    {
      id: Mock.Random.id(),
      title: Mock.Random.title(),
      description: Mock.Random.sentence(),
      banner: Mock.Random.image('500x300', Mock.Random.color())
    }
  )
}

const post_list = {
  total: 10,
  items: posts
}

module.exports = post_list