import React, {useState} from 'react';

import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Transition from './components/Transition/transition'
library.add(fas)

function App() {
    const [show, setShow] = useState(false);
  return (
    <div>
      <Button>default</Button>
      <Button btnType="primary" size={"lg"}>primary</Button>
      <Button btnType="link" href={"https://www.baidu.com"}>百度链接</Button>

      <h1>menu</h1>
      {/* <Menu defaultIndex={'1'} onSelect={(index)=> {console.log(index)}} mode="vertical" defaultOpenSubMenu={['0']}> 
            <SubMenu title="test">
                  <MenuItem>test1</MenuItem>
                  <MenuItem>test2</MenuItem>
            </SubMenu>
            <MenuItem>item</MenuItem>
            <MenuItem >disabled</MenuItem>
            <MenuItem disabled={true}>disabled</MenuItem>
      </Menu> */}
      <Menu defaultIndex={'1'} onSelect={(index)=> {console.log(index)}} mode="horizontal" defaultOpenSubMenu={['0']}> 
            <SubMenu title="test">
                  <MenuItem>test1</MenuItem>
                  <MenuItem>test2</MenuItem>
            </SubMenu>
            <MenuItem>item</MenuItem>
            <MenuItem >disabled</MenuItem>
            <MenuItem disabled={true}>disabled</MenuItem>
      </Menu>
      <Icon icon="coffee"  theme="warning" size="10x" />
      <Icon icon="arrow-alt-circle-down" type="dark" />
      <Button size="sm" btnType="danger" onClick={() => setShow(!show)}> showTransition</Button>
      <Transition in={show} timeout={300} animation="zoom-in-left">
            <div>
                <p>test1</p>
                <p>test2</p>
                <p>hhhhhhh</p>
            </div>
      </Transition>
      <Transition wrapper in={show} timeout={300} animation="zoom-in-left">
          <Button size="lg" btnType="primary"> a large button</Button>
      </Transition>
    </div>
  );
}

export default App;
