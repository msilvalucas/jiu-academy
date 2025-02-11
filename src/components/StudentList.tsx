import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import { Student } from '../types';
import { getStudents, updateStudentBelt } from '../services/api';

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const belts = ['Branca', 'Azul', 'Roxa', 'Marrom', 'Preta'];

  const getIndexBelt = (belt: string): number => {
    return belts.indexOf(belt);
  };

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

  const handleGraduation = async (id: string, newBelt: string) => {
    try {
      setIsSubmitting(true);
      await updateStudentBelt(id.toString(), newBelt);

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === id
            ? student.belt === 'Preta'
              ? student
              : { ...student, belt: newBelt }
            : student,
        ),
      );
    } catch (error) {
      console.error('Error updating student belt:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <div className="d-flex gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={isSubmitting}
                    onClick={() =>
                      handleGraduation(
                        student.id,
                        belts[getIndexBelt(student.belt) + 1],
                      )
                    }
                  >
                    {student.belt === 'Preta'
                      ? 'Graduação máxima'
                      : 'Promover para:' +
                        belts[getIndexBelt(student.belt) + 1]}
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => console.log('Despromover')}
                    disabled={isSubmitting}
                  >
                    Despromover para: {belts[getIndexBelt(student.belt) - 1]}
                  </Button>
                  {/* <Link to={`/graduacao/${student.id}`}>
                  <Button variant="primary" size="sm">
                    Graduar
                  </Button>
                </Link> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentList;
