import React from 'react';

import Button , { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
function App() {
  return (
    <div>
      <Button>default</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>primary</Button>
      <Button btnType={ButtonType.Link} href={"https://www.baidu.com"}>百度链接</Button>

      <h1>menu</h1>
      <Menu defaultIndex={1} onSelect={()=> {}}>
            <MenuItem>item</MenuItem>
            <MenuItem disabled={true}>disabled</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
