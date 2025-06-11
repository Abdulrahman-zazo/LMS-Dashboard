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

export interface DataCardsProps {
  title?: string;
  buttonAdd?: string;
  isloading: boolean;
  description?: string;
  data: Curriculum[];
  onAdd?: () => void;
  onEdit?: (row: Curriculum) => void;
  onDelete?: (row: Curriculum) => void;
  onView?: (row: Curriculum) => void;
}

export interface Course {
  name: string;
  image: string;
  imageFile?: File;
  description: string;
  contents: string;
  type: string;
  material: string;
  cost: string;
  hours: string;
  requirements: string;
  summary: string;
  id: number;
}

export interface Curriculum {
  id: number;
  name: string;
  image: string;
  pivot?: [Stage[], Subject[]];
  imageFile?: File;
  stage_id?: number[];
}
export interface Subject {
  name: string;
  image: File[];
  imageFile?: File;

  stage_id: number;
  curricula_id: number;
}
export interface Stage {
  name: string;
  id: number;
}
export interface Offers {
  name: string;
  description: string;
  cost?: string;
  course_id?: number[];
}
