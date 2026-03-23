import { request } from '@umijs/max';

export interface Student {
  id?: number;
  name: string;
  group: string;
  dateAdded?: string;
}

export async function getStudents() {
  return request<Student[]>('/api/students', { method: 'GET' });
}

export async function createStudent(data: Omit<Student, 'id'>) {
  return request<Student>('/api/students', { method: 'POST', data });
}

export async function updateStudent(id: number, data: Omit<Student, 'id'>) {
  return request<Student>(`/api/students/${id}`, { method: 'PUT', data });
}

export async function deleteStudent(id: number) {
  return request(`/api/students/${id}`, { method: 'DELETE' });
}