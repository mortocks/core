import { render, getByTestId, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useAuthEmailPassForm from './loginForm'
import { AuthEmailPassDTO } from '@core/models/auth'

type TestPros = {
  defaultEmail?: string
  submitCallback?: (data: AuthEmailPassDTO) => void
}

function TestComponent({ defaultEmail = 'name@email.com', submitCallback }: TestPros): JSX.Element {
  const { getValues, register, handleSubmit } = useAuthEmailPassForm({
    defaultValues: {
      email: defaultEmail,
      password: 'pass',
    },
  })
  const { email, password } = getValues()

  const onSubmit = () => {
    console.log('Boop', email)
    if (submitCallback) {
      submitCallback({ email, password })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div data-testid="emailValue">{email}</div>
      <input data-testid="emailInput" {...register('email')} type="email" />
      <button type="submit" data-testid="submitButton">
        Submit
      </button>
    </form>
  )
}

describe('useAuthEmailPassForm', () => {
  it('should render', () => {
    expect(() => render(<TestComponent />)).toBeDefined()
  })

  it('default values should be returned on mount', () => {
    const { container } = render(<TestComponent />)

    const emailValue = getByTestId(container, 'emailValue')

    expect(emailValue.textContent).toBe('name@email.com')
  })

  it('updating values should update form state', async () => {
    const spy = jest.fn()
    const user = userEvent.setup()
    const { container } = render(<TestComponent defaultEmail="" submitCallback={(d) => spy(d)} />)

    const inputEl = getByTestId<HTMLInputElement>(container, 'emailInput')
    const buttonEl = getByTestId<HTMLButtonElement>(container, 'submitButton')
    await user.type(inputEl, 'test@mail.com')
    await fireEvent.blur(inputEl)

    await act(async () => {
      await user.click(buttonEl)
    })

    expect(inputEl.value).toBe('test@mail.com')
    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith({ email: '', password: 'pass' })
  })

  it('updating should not trigger re-render with live updating', async () => {
    const user = userEvent.setup()
    const { container } = render(<TestComponent defaultEmail="" />)

    const inputEl = getByTestId<HTMLInputElement>(container, 'emailInput')
    await user.type(inputEl, 'test@mail.com')
    await fireEvent.blur(inputEl)

    const emailValue = await getByTestId(container, 'emailValue')
    expect(inputEl.value).toBe('test@mail.com')
    expect(emailValue.textContent).toBe('')
  })
})
