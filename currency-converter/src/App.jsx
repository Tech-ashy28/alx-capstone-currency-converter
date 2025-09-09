
import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Converter from "./components/Converter/Converter";

function App() {
  const [showConverter, setShowConverter] = useState(false);

  return (
    <div>
      {!showConverter ? (
        <>
          <Header />
          <Main onConvertClick={() => setShowConverter(true)} />
        </>
      ) : (
        <Converter />
      )}
    </div>
  );
}

export default App;
