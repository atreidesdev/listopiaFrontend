'use client';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/shared/ui/form/form';
import { InputFieldProps } from '@/shared/ui/inputField/inputField';
import { ButtonProps } from '@/shared/ui/button/button';
import { updateProfileName } from '@/widgets/UpdateProfileName/model/api';

type UpdateProfileNameFormValues = {
  profileName: string;
};

const UpdateProfileNameForm = ({ userId }: { userId: string | number }) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit: SubmitHandler<UpdateProfileNameFormValues> = async (data) => {
    const { error } = await updateProfileName(userId, data);

    if (!error) {
      setSuccess(true);
      setError(null);
    } else {
      setSuccess(false);
      setError(error);
    }
  };

  const fields: Omit<
    InputFieldProps<UpdateProfileNameFormValues>,
    'control'
  >[] = [
    {
      name: 'profileName',
      type: 'text',
      placeholder: 'Введите новое имя профиля',
      rules: {
        required: 'Имя профиля обязательно',
      },
    },
  ];

  const buttons: ButtonProps[] = [
    {
      name: 'Обновить имя профиля',
      type: 'submit',
      variant: 'primary',
    },
  ];

  return (
    <div>
      <Form fields={fields} onSubmit={onSubmit} buttons={buttons} />
      {success && <p className="success">Имя профиля успешно обновлено</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UpdateProfileNameForm;
