import axios from 'axios';
import { Student, Belt } from '../types';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
});

export const getStudents = async (): Promise<Student[]> => {
  const response = await api.get<Student[]>('/students');
  return response.data;
};

export const getBelts = async (): Promise<Belt[]> => {
  const response = await api.get<Belt[]>('/belts');
  return response.data;
};

export const getStudent = async (id: string): Promise<Student> => {
  const response = await api.get<Student>(`/students/${id}`);
  return response.data;
};

export const addStudent = async (
  student: Omit<Student, 'id'>,
): Promise<Student> => {
  const response = await api.post<Student>('/students', student);
  return response.data;
};

export const updateStudentBelt = async (
  id: string,
  newBelt: string,
): Promise<Student> => {
  const response = await api.patch<Student>(`/students/${id}`, {
    belt: newBelt,
  });
  return response.data;
};
