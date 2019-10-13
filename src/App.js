import React from 'react';
import './App.css';
import { 
  Button, 
  Input, 
  Tabs, 
  Divider, 
  Typography,
  Alert
} from 'antd'

import qs from './utils/qs'
import copy from 'copy-to-clipboard'
import importCode from './utils/code'

const { Title, Paragraph } = Typography
const { TabPane } = Tabs
const InputGroup = Input.Group
const desc = "用`react`写的一个用来生成`api`查询字段的一个工具"
const wrapStyle = { 
  maxWidth: '450px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #d9d9d9',
  minHeight: '100vh'
}
const marginWrap = {
  margin: '12px 0'
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      baseUrl: 'https://baidu.com', // 基础 `url`
      qs: [
        {
          key: 'query',
          value: 'value'
        }
      ], // 查询字段
      FullURL: '',// 完整`url`
      isCloseMsg: true
    }
  }

  checkChange = key=> {}

  baseOnInput = e=> {
    let baseUrl = e.target.value.trim()
    this.setState({ baseUrl })
    this.createFullURL()
    this.createCode()
  }

  addQS= e=> {
    const XD = [{ key: '', value: '' }]
    const list = this.state.qs
    this.setState({
      qs: [...list, ...XD ]
    })
  }

  qsValue = (...args)=> {
    const [ e, index, flag ] = args
    const value = e.target.value.trim()
    let list = this.state.qs
    if (flag) {
      list[index].key = value
    } else list[index].value = value
    this.setState({
      qs: list
    })
    this.createFullURL()
    this.createCode()
  }

  qsDelItem = index=> {
    let list = this.state.qs
    list.splice(index,1)
    this.setState({
      qs: list
    })
    this.createFullURL()
    this.createCode()
  }

  createFullURL = ()=> {
    const url = this.state.baseUrl.trim()
    const list = this.state.qs
    let isHasKey = true
    list.some(item=> {
      if (!item.key) return !(isHasKey = false)
    })
    if (!url || !isHasKey) return
    const FullURL = qs.toString({ url, list })
    this.setState({ FullURL })
  }

  copyText = ()=> {
    const text = this.state.FullURL
    if (text) {
      copy(text)
      this.setState({
        isCloseMsg: false
      })
    }
  }

  createCode() {
    
  }

  render() {
    let copyWrap = ''
    let codeShif = ''
    if (this.state.FullURL) {
      const msg = this.state.isCloseMsg ? '' : <Alert message="复制成功" type="success" showIcon closeText="知道了" />
      copyWrap = (
        <div>
          <Title level={4}># 完整`url`</Title>
          { msg }
          <Input style={{ ...marginWrap, ...{ cursor: "pointer" } }} onClick={ this.copyText } value={ this.state.FullURL } />
        </div>
      )
    }

    const DocCode = importCode.get()
    DocCode.map(item=> {
      item.code = item.create()
      return item
    })
    codeShif = (
      <Tabs defaultActiveKey="1" onChange={ this.checkChange }>
        { DocCode.map((item,index)=> {
          return (
            <TabPane tab={ item.tab } key={ index+1 }>
              <pre>{ item.code }</pre>
            </TabPane>
          )
        }) }
      </Tabs>
    )

    return (
      <div style={ wrapStyle }>
        <Title level={2}># querystring</Title>
        <Paragraph>{ desc }</Paragraph>
        <div>
          <Title level={4}># 基础URL:</Title>
          <Input style={ marginWrap } value={ this.state.baseUrl } onChange={ this.baseOnInput } />
          <Title level={4}># 查询字段:</Title>
          <div>
          <div className="codebox">
              {this.state.qs.map((item,index)=>{
                return (
                <div style={ marginWrap } key={ index }>
                  <InputGroup compact>
                    <Input value={ this.state.qs[index].key } onChange={ ev=> { this.qsValue(ev, index, 1) } } placeholder="key" style={{ width: '40%' }}  />
                    <Input value={ this.state.qs[index].value } onChange={ ev=> { this.qsValue(ev, index, 0) } } placeholder="value" style={{ width: '40%' }}  />
                    <Button onClick={ this.qsDelItem.bind(this, index) } type="danger" style={{ width: '20%' }}>删除</Button>
                  </InputGroup>
                </div>
                )
              })}
            <Button style={ marginWrap } onClick={ this.addQS } type="primary"> 增加 </Button>
          </div>
        </div>
        </div>
        { copyWrap }
        <div>
          <Title level={4}># 测试接口(`CORS`) </Title>
          <div>
            <Button style={ marginWrap } type="primary"> 发送请求 </Button>
          </div>
        </div>
        <div>
          <Title level={4}># 生成代码 </Title>
          { codeShif }
          <Divider></Divider>
          <Button style={ marginWrap } type="primary"> 复制代码 </Button>
        </div>
      </div>
    );
  }
}

export default App;
