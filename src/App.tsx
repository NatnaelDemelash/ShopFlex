import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex flex-wrap w-full justify-between">
          <Routes>
            <Route path="/" element={<MainContent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
