export interface Res<T> {
  data: T;
  errors: string;
  code: number;
}
