import { ValidationMode } from 'react-hook-form'

export interface IFormProps<T> {
  defaultValues?: Partial<T>
  mode?: keyof ValidationMode | undefined
}
