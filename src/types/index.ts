// types.ts
export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

export interface DataTableProps<T> {
  title?: string;
  buttonAdd?: string;
  isloading: boolean;
  description?: string;
  columns: Column<T>[];
  data: T[];
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onView?: (row: T) => void;
}

export interface Course {
  name: string;
  image: string;
  imageFile?: File;
  description: string;
  contents: string;
  type: string;
  material: string;
  cost?: string;
  hours: string;
  requirements: string;
  summary: string;
  id: number;
}

export interface Curriculum {
  name: string;
  image: File[];
  stage_id?: number[];
}
export interface Subject {
  name: string;
  image: File[];
  stage_id: number;
  curricula_id: number;
}
export interface Stage {
  name: string;
}
export interface Offers {
  name: string;
  description: string;
  cost?: string;
  course_id?: number[];
}
