import React from "react"
import './style.css'
import Restaurants from "../organisms/restaurants"
import Map from "../organisms/map"
import Options from "../organisms/options"
import {DataStoreContextProvider} from "../../context"


function App() {

return (
  <div className="app-container">
    <DataStoreContextProvider>
      <Restaurants/>
      <Map/>
      <Options/>
    </DataStoreContextProvider>
  </div>
  );
}

export default App;