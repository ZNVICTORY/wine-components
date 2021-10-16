import React, {useState} from 'react';

// import Button from './components/Button/button';
// import Menu from './components/Menu/menu';
// import MenuItem from './components/Menu/menuItem';
// import SubMenu from './components/Menu/subMenu';
// import Icon from './components/Icon/icon';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import Transition from './components/Transition/transition'
// library.add(fas)
import axios from 'axios';

function App() {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files) {
            const uploadFile = files[0];
            const formData = new FormData();
            formData.append(uploadFile.name, uploadFile);
            axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(resp => {
                console.log(resp, 'resp')
            })
        }
    }

  return (
    <div>
      <input type="file" name="my-input" onChange={handleChange} />
    </div>
  );
}

export default App;
