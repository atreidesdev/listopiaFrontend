import { Button, ButtonProps } from '@/shared/ui/button/button';
import { InputField, InputFieldProps } from '@/shared/ui/inputField/inputField';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './form.module.css';

type FormProps<T extends FieldValues> = {
  fields: Omit<InputFieldProps<T>, 'control'>[];
  onSubmit: SubmitHandler<T>;
  buttons: ButtonProps[];
};

export const Form = <T extends FieldValues>({
  fields,
  onSubmit,
  buttons,
}: FormProps<T>) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<T>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {fields.map((fieldProps, index) => (
        <InputField key={index} {...fieldProps} control={control} />
      ))}
      <div className={styles.buttonContainer}>
        {buttons.map((buttonProps, index) => (
          <Button
            key={index}
            {...buttonProps}
            disabled={Object.keys(errors).length > 0}
          />
        ))}
      </div>
    </form>
  );
};
