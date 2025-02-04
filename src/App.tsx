import type React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import GraduationPage from './components/GraduationPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/cadastro" element={<StudentForm />} />
            <Route path="/graduacao/:id" element={<GraduationPage />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
