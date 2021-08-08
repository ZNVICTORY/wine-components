import React from 'react';

import Button , { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div>
      <Button>default</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>primary</Button>
      <Button btnType={ButtonType.Link} href={"https://www.baidu.com"}>百度链接</Button>

      <h1>menu</h1>
      <Menu defaultIndex={'1'} onSelect={(index)=> {console.log(index)}} mode="vertical" defaultOpenSubMenu={['0']}> 
            <SubMenu title="test">
                  <MenuItem>test1</MenuItem>
                  <MenuItem>test2</MenuItem>
            </SubMenu>
            <MenuItem>item</MenuItem>
            <MenuItem >disabled</MenuItem>
            <MenuItem disabled={true}>disabled</MenuItem>
      </Menu>
      <FontAwesomeIcon icon={faCoffee} />
    </div>
  );
}

export default App;
