let express = require('express')
let sha1 = require('sha1')

let app = express()
app.use(express.urlencoded({extended:true}))

app.use((request,response,next)=>{
  let {signature,echostr,timestamp,nonce} = request.query;
  /*
    { signature: '6d648e8ff9e40fff51758d3bb204aa68753ce159',//微信服务器经过特殊加密后的字符串
      echostr: '2162932268975124447',//微信服务器返回的随机字符串
      timestamp: '1566895755',//时间戳
      nonce: '23986079' }//微信服务器返回的随机数字

      1.把nonce、timestamp、事先在网页里约定好的token（atguigu），放入一个数组。
      2.将该数组进行字典排序
      3.将数组中的每个元素依次取出，拼接成一个字符串
      4.将第三步的字符串，进行sha1加密
      5.将第四步加密后的字符串与signature进行对比
          --相同：返回echostr给微信服务器
          --不相同：驳回
  */
  let arr = [nonce,timestamp,'atguigu']
  let sortedArr = arr.sort()
  let str = sortedArr.join('')
  let sha1Str = sha1(str)
  console.log(sha1Str)
  console.log(signature)
  if(sha1Str === signature){
    response.send(echostr)
  }else {
    response.send('禁止发送非法请求')
  }

  response.send(echostr)
})

app.listen(3000,function (err) {
  if (!err) console.log('服务器启动成功')
  else console.log(err)
})