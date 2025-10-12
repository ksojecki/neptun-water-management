import { useForm } from 'react-hook-form';
import { TextInput } from '@ui/forms/textInput';
import { SubmitButton } from '@ui/forms/submitButton';
import { AuthCredentials } from '@neptun/data-model';
import { useAuthentication } from '../../context/authentication';



export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentials>();

  const { login, user } = useAuthentication();

  if(user) {
    return <div>You are logged in as {user.username}</div>
  }

  const authenticate = (credentials: AuthCredentials) => {
    login(credentials);
  }

  return (
    <form onSubmit={handleSubmit(authenticate)} className="flex flex-col gap-4">
      <TextInput
        {...register('username', {required: true})}
        className="w-[100%]"
        label="Login"
        isInvalid={!!errors.password}
        placeholder="Username"
        type={'text'}
      />
      <TextInput
        {...register('password', {required: true, minLength: 3})}
        className="w-[100%]"
        label="Password"
        placeholder="Password"
        type={'password'}
      />
      <SubmitButton />
    </form>
  );};
