'use client';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/shared/ui/form/form';
import { InputFieldProps } from '@/shared/ui/inputField/inputField';
import { ButtonProps } from '@/shared/ui/button/button';
import { updateUsername } from '@/widgets/UpdateUsernameForm/model/api';

type UpdateUsernameFormValues = {
  username: string;
};

const UpdateUsernameForm = ({ userId }: { userId: string | number }) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit: SubmitHandler<UpdateUsernameFormValues> = async (data) => {
    const { error } = await updateUsername(userId, data);

    if (!error) {
      setSuccess(true);
      setError(null);
    } else {
      setSuccess(false);
      setError(error || 'Ошибка обновления юзернейма');
    }
  };

  const fields: Omit<InputFieldProps<UpdateUsernameFormValues>, 'control'>[] = [
    {
      name: 'username',
      type: 'text',
      placeholder: 'Введите новый юзернейм',
      rules: {
        required: 'Юзернейм обязателен',
      },
    },
  ];

  const buttons: ButtonProps[] = [
    {
      name: 'Обновить юзернейм',
      type: 'submit',
      variant: 'primary',
    },
  ];

  return (
    <div>
      <Form fields={fields} onSubmit={onSubmit} buttons={buttons} />
      {success && <p className="success">Юзернейм успешно обновлен</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UpdateUsernameForm;
