import { ChatGPTAPI } from 'chatgpt'


export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if(req.method=='POST'){
    res.send({"res":'post接口还没准备好'})
  }else{
    let key = req.query.gptkey;
    let question = req.query.question;
    console.log(key,question)
    if(!key){res.send({'res':'Request Faild: API key not found, please click on the settings button above to configure.'});return;}
    if(!question){res.send({'res':'Request Faild: No quesetion detected.'});return }  
    try{
      let api = new ChatGPTAPI({
        apiKey: key
      })
      question = question + '（后面仅仅与返回格式相关：如果回答结果涉及到代码，请以```包裹。）'
      let gptanswer = await api.sendMessage(question)
      res.send({"res":gptanswer.text})
    }catch{
      res.send({'res':'Request Faild: Incorrect API key provided: key. You can find your API key at https://platform.openai.com/account/api-keys.'})
    }
  }
}
