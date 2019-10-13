import React from 'react';
import './App.css';

import { 
  Button, 
  Input, 
  Tabs, 
  Divider, 
  Typography 
} from 'antd'

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const InputGroup = Input.Group;
const desc = "用`react`写的一个用来生成`api`查询字段的一个工具"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      baseUrl: '', // 基础 `url`
      qs: [
        {
          key: 'limit',
          value: '20'
        }
      ], // 查询字段
      FullURL: '', // 完整`url`
    }
    // TODO: this 指向问题
    // this.callback = this.callback.bind(this)
  }

  callback = key=> {
  }

  baseOnInput = e=> {
    let baseUrl = e.target.value
    this.setState({ baseUrl })
  }

  qsInput = e=> {
    
  }

  addQS= e=> {
    console.log('state middle inter')
    const XD = [{ key: '', value: '' }]
    const list = this.state.qs
    this.setState({
      qs: [...list, ...XD ]
    })
  }

  render() {
    return (
      <div>
        <Title level={2}># querystring</Title>
        <Paragraph>{ desc }</Paragraph>
        <div>
          <Title level={4}># 基础URL:</Title>
          <Input onChange={ this.baseOnInput } />
          <Title level={4}># 查询字段:</Title>
          <div>
          <div className="codebox">
              {this.state.qs.map((item,index)=>{
                return (
                <div key={ index }>
                  <InputGroup compact>
                    <Input placeholder="key" style={{ width: '50%' }}  />
                    <Input placeholder="value" style={{ width: '50%' }}  />
                  </InputGroup>
                </div>
                )
              })}
            <Button onClick={ this.addQS } type="primary"> 增加 </Button>
          </div>
        </div>
        </div>
        <div>
          <Title level={4}># 完整`url`</Title>
          <Input />
        </div>
        <div>
          <Title level={4}># 测试接口(`CORS`) </Title>
          <div>
            <Button type="primary"> 发送请求 </Button>
          </div>
        </div>
        <div>
          <Title level={4}># 生成代码 </Title>
          <Tabs defaultActiveKey="1" onChange={ this.callback}>
            <TabPane tab="Jquery" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="fetch" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="js原生" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
          <Divider></Divider>
          <Button type="primary"> 复制代码 </Button>
        </div>
      </div>
    );
  }
}

export default App;
