// Here we define the types of the props that we are going to use in our components.
export interface PaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}

export interface InfoCardProps {
  title: string;
  content: string;
  icon: JSX.Element;
}
