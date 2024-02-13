// import React, { useState } from 'react'
import React from 'react'
// import { useState } from 'react';
// import Page from '../src/app/auth/login/page';
import Dashboard from '../src/app/Dashboard'
function App() {
//   const [validFromChild, setvalidFromChild] = useState(false);
//   const handleDataFromChild = (data) => {
//   setvalidFromChild(data);
// };
// console.log(validFromChild);
return (
  <>
    <Dashboard />
    {/* {validFromChild===false&&<Page sendtoparent={handleDataFromChild}/>}
    {validFromChild!==false&&<Dashboard sendtoparent={handleDataFromChild}/>} */}

  </>
)
}

export default App