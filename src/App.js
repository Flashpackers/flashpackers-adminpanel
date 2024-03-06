import React from 'react'
import DataContext from './app/Datacontext'
import { useState } from 'react';
import Page from '../src/app/auth/login/page';
import Dashboard from '../src/app/Dashboard/Dashboard'
// import AddProduct from './app/Dashboard/Product/AddProduct'
function App() {
  const [data, setData] = useState({});
  const [validFromChild, setvalidFromChild] = useState(false);
  const handleDataFromChild = (data) => {
    setvalidFromChild(data);
  };
  return (
    <>
    {/* <AddProduct/> */}
      <DataContext.Provider value={{ data, setData }}>
        {validFromChild === false && <Page sendtoparent={handleDataFromChild} />}
        {validFromChild !== false && <Dashboard sendtoparent={handleDataFromChild} />}
      </DataContext.Provider>
    </>
  )
}

export default App