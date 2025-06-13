// types.ts
export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

export interface DataTableProps<T> {
  title?: string;
  ImageType?: "circle" | "rectangle";
  buttonAdd?: string;
  isloading: boolean;
  description?: string;
  columns: Column<T>[];
  data: T[];
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onMakeAdmin?: (row: T) => void;
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
  CommentUnRead: number;
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

export interface Users {
  name: string;
  image: string;
  phone: string;
  email: string;
  id: number;
}

export interface Subject {
  id: number;
  name: string;
  image: string;
  imageFile?: File;
  stage_id: number;
  curricula_id: number;
}
export interface Stage {
  name: string;
  id: number;
}
export interface PivotItem {
  stages: Stage[];
  subjects: Subject[];
}
export interface Curriculum {
  id: number;
  name: string;
  image: string;
  pivot: PivotItem;
  imageFile?: File;
  stage_id?: number[];
}

export interface Offers {
  id: number;
  name: string;
  description: string;
  cost: string;
  courses: Course[];
  course_id: number[];
}

export interface Complaint {
  id: number;
  name: string;
  image?: string;
  text: string;
  phone: string;
  email: string;
  time: string;
}
