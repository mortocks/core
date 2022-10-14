import { useForm } from 'react-hook-form'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { AuthEmailPassDTO } from '@core/models/auth'
import { IFormProps } from './forms'

const resolver = classValidatorResolver(AuthEmailPassDTO)

export type TDefaultValues = Partial<AuthEmailPassDTO>

const useAuthEmailPassForm = (props: IFormProps<AuthEmailPassDTO>) =>
  useForm<AuthEmailPassDTO>({
    resolver,
    ...props,
  })

export default useAuthEmailPassForm
