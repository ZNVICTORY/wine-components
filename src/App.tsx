import React from 'react';

import Button , { ButtonType, ButtonSize } from './components/Button/button';

function App() {
  return (
    <div>
      <Button>default</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>primary</Button>
      <Button btnType={ButtonType.Link} href={"https://www.baidu.com"}>百度链接</Button>
    </div>
  );
}

export default App;
