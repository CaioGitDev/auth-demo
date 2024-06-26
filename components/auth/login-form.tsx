import { CardWrapper } from './card-wrapper'

export function LoginForm() {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
      showSocial
    >
      login Form
    </CardWrapper>
  )
}
