import './App.css';
import { Routes, Route } from 'react-router-dom';
import ScannerList from './components/Scanners/Scanners';
import Form from './components/Form/Form';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Form />} />
      <Route path='/scanners' element={<ScannerList />} />
    </Routes>);
}

export default App;
