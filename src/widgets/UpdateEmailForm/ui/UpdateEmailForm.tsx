'use client';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/shared/ui/form/form';
import { InputFieldProps } from '@/shared/ui/inputField/inputField';
import { ButtonProps } from '@/shared/ui/button/button';
import { updateEmail } from '@/widgets/UpdateEmailForm/model/api';

type UpdateEmailFormValues = {
  email: string;
};

const UpdateEmailForm = ({ userId }: { userId: string | number }) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit: SubmitHandler<UpdateEmailFormValues> = async (data) => {
    const { error } = await updateEmail(userId, data);

    if (!error) {
      setSuccess(true);
      setError(null);
    } else {
      setSuccess(false);
      setError(error);
    }
  };

  const fields: Omit<InputFieldProps<UpdateEmailFormValues>, 'control'>[] = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Введите новую почту',
      rules: {
        required: 'Почта обязательна',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Введите корректный адрес почты',
        },
      },
    },
  ];

  const buttons: ButtonProps[] = [
    {
      name: 'Обновить почту',
      type: 'submit',
      variant: 'primary',
    },
  ];

  return (
    <div>
      <Form fields={fields} onSubmit={onSubmit} buttons={buttons} />
      {success && <p className="success">Почта успешно обновлена</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UpdateEmailForm;
