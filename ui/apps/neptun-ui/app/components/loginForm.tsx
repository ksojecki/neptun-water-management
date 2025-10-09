import { useForm } from 'react-hook-form';
import { TextInput } from '@ui/forms/textInput';
import { SubmitButton } from '@ui/forms/submitButton';

type Credentials = { email: string, password: string };

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>();

  const authenticate = (credentials: Credentials) => {
    console.log(credentials);
  }

  return (
    <form onSubmit={handleSubmit(authenticate)} className="flex flex-col gap-4">
      <TextInput
        {...register('email', {required: true})}
        isInvalid={!!errors.email}
        placeholder="Email"
        type={'email'}
      />
      <TextInput
        {...register('password', {required: true, minLength: 3})}
        placeholder="Password"
        type={'password'}
      />
      <SubmitButton />
    </form>
  );};
