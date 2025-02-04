import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Student } from '../types';
import { getStudent, updateStudentBelt } from '../services/api';

const GraduationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [newBelt, setNewBelt] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      if (id) {
        try {
          const data = await getStudent(id);
          setStudent(data);
          setNewBelt(data.belt);
        } catch (error) {
          console.error('Error fetching student:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchStudent();
  }, [id]);

  const handleGraduation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (student && newBelt !== student.belt) {
      setIsSubmitting(true);
      try {
        await updateStudentBelt(student.id.toString(), newBelt);
        navigate('/');
      } catch (error) {
        console.error('Error updating student belt:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isLoading) return <div>Carregando...</div>;
  if (!student) return <div>Aluno não encontrado</div>;

  return (
    <div>
      <h2 className="my-4">Graduar Aluno</h2>
      <Form onSubmit={handleGraduation}>
        <Form.Group className="mb-3">
          <Form.Label>Nome do Aluno</Form.Label>
          <Form.Control type="text" value={student.name} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Faixa Atual</Form.Label>
          <Form.Control type="text" value={student.belt} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nova Faixa</Form.Label>
          <Form.Select
            value={newBelt}
            onChange={(e) => setNewBelt(e.target.value)}
          >
            <option value="Branca">Branca</option>
            <option value="Azul">Azul</option>
            <option value="Roxa">Roxa</option>
            <option value="Marrom">Marrom</option>
            <option value="Preta">Preta</option>
          </Form.Select>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting || newBelt === student.belt}
        >
          {isSubmitting ? 'Confirmando...' : 'Confirmar Graduação'}
        </Button>
      </Form>
    </div>
  );
};

export default GraduationPage;
