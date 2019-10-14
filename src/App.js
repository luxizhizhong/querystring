import React from 'react';
import './App.css';
import {
  Drawer,
  Button, 
  Input, 
  Tabs, 
  Divider, 
  Typography,
  Alert,
  Spin,
  message,
  Modal
} from 'antd'

import qs from './utils/qs'
import copy from 'copy-to-clipboard'
import importCode from './utils/code'
import ReactJson from 'react-json-view'
import { Foot } from './components/footer'

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
      baseUrl: '', // 基础 `url`
      qs: [ { key: '', value: ''} ], // 查询字段
      FullURL: '', // 完整`url`
      isCloseMsg: true, // 复制`msg` (已废弃)
      visible: false,
      DrawerPos: `right`, // 显示
      jsonData: {
        code: '200',
        msg: '快夸夸我可爱呀, 我超甜的呢'
      }, // 返回的 `json` 数据
      codes: [], // 代码片段
      isGetAJAX: false, // loading
      activeKey: 1 // code[index]
    }
  }

  checkChange = key=> {
    key = Number.parseInt(key)
    this.setState({
      activeKey: key
    })
  }

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

  copyText = (flag, data)=> {
    if (!flag) {
      let text = this.state.FullURL
      text = data ? data : text
      copy(text)
    }
    // this.setState({ isCloseMsg: flag })
    message.success('复制成功',2);
  }

  createCode = ()=> {
    const url = this.state.FullURL
    const data = this.state.qs
    const Res = importCode.set({url, data})
    this.setState({
      codes: Res
    })
  }

  initCode = ()=> {
    const DocCode = importCode.get()
    DocCode.map(item=> {
      item.code = item.create()
      return item
    })
    this.setState({
      codes: DocCode
    })
  }

  DrawerFetch = ()=> {
    const url = this.state.baseUrl
    let isJSON = false
    this.setState({ isGetAJAX: true })
    fetch(url).then(r=> {
      this.setState({
        isGetAJAX: false
      })
      let result
      try {
        result = r.json()
        isJSON = true
      } catch(err) {
        result = r.text()
      }
      return result
    }).then(r=> {
      this.setState({
        jsonData: r
      })
    }).catch(err=> {
      this.setState({
        isGetAJAX: false
      })
      Modal.error({
        title: '跨域问题',
        content: '关于跨域问题可以参考阮一峰老师的blog: http://www.ruanyifeng.com/blog/2016/04/cors.html',
      });
      console.log(err)
      // throw new Error('error: ', err)
    })
  }

  componentDidMount = ()=> {
    this.initCode()
  }

  copyCodes = ()=> {
    const code = this.state.codes
    let index = this.state.activeKey
    --index
    const current = code[index]
    this.copyText(false, current.code)
  }

  render() {
    let codeShif = '', copyWrap = '', textAPI = ''
    codeShif = (
      <Tabs defaultActiveKey="2" onChange={ this.checkChange }>
        { this.state.codes.map((item,index)=> {
          return (
            <TabPane tab={ item.tab } key={ index+1 }>
              <pre>{ item.code }</pre>
            </TabPane>
          )
        }) }
      </Tabs>
    )
    if (this.state.FullURL) {
      copyWrap = (
        <div>
          <Title level={4}># 完整`url`</Title>
          { this.state.isCloseMsg ? null : (
            <Alert message="复制成功" type="success" showIcon closeText="知道了" afterClose={ e=> this.copyText(true) } />
          ) }
          <Input style={{ ...marginWrap, ...{ cursor: "pointer" } }} onClick={ e=> this.copyText(false) } value={ this.state.FullURL } />
        </div>
      )
      textAPI = (
        <div>
          <Title level={4}># 测试接口(`CORS`) </Title>
          <div>
            <Button onClick={ e=> {
              if (this.state.FullURL) {
                this.setState({ visible: true }) 
              }
            } } style={ marginWrap } type="primary"> 发送请求 </Button>
          </div>
        </div>
      )
    }

    return (
      <div style={ wrapStyle }>
        <Drawer onClose={ e=> { this.setState({
          visible: false
        }) }} placement={ this.state.DrawerPos } visible={ this.state.visible } title="发送请求" width={ 420 }>
          <Button onClick={ this.DrawerFetch } type="primary">发送请求🍓</Button>
          <Button type={ this.state.DrawerPos == 'right' ? '' : 'danger' } style={{ marginLeft: '12px' }} onClick={ e=> {
            let l = 'left', r = 'right'
            let DrawerPos = this.state.DrawerPos
            DrawerPos = DrawerPos == l ? r : l
            this.setState({ DrawerPos })
           }}>反向🍎</Button>
          <Spin spinning={ this.state.isGetAJAX } tips="加载中, 等等鸭~"></Spin>
          <Tabs defaultActiveKey="2" onChange={ this.checkChange }>
            <TabPane tab="源数据" key="1">
              <Title>没有,下一位..</Title>
            </TabPane>
            <TabPane tab="格式化" key="2">
              <ReactJson src={ this.state.jsonData } />
            </TabPane>
          </Tabs>
        </Drawer>
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
        { textAPI }

        <div>
          <Title level={4}># 生成代码 </Title>
          { codeShif }
          <Divider></Divider>
          <Button onClick={ this.copyCodes } style={ marginWrap } type="primary"> 复制代码 </Button>
        </div>

        <Foot />

      </div>
    );
  }
}

export default App;
