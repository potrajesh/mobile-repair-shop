// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page1 from './selectcomponents/page1';
import Page2 from './selectcomponents/page2';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/Page2" element={<Page2 />} />
      </Routes>
    </Router>
  );
}

export default App;
