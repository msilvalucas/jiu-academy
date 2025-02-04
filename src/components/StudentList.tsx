import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Student } from '../types';
import { getStudents } from '../services/api';

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error('Erro ao buscar alunos', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(filter.toLowerCase()) ||
        student.belt.toLowerCase().includes(filter.toLowerCase()),
    );
    setFilteredStudents(filtered);
  }, [filter, students]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2 className="my-4">Lista de Alunos</h2>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Filtrar por nome ou faixa"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Form.Group>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Faixa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.belt}</td>
              <td>
                <Link to={`/graduacao/${student.id}`}>
                  <Button variant="primary" size="sm">
                    Graduar
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentList;
