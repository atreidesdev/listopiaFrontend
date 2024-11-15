import { Button } from '@/shared/ui/button/button';
import React, { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import hide from './hide.svg';
import styles from './inputField.module.css';
import show from './show.svg';

export type InputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control?: Control<T>;
  placeholder: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  rules: {
    required: string;
    minLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
  };
};

export const InputField = <T extends FieldValues>({
  name,
  control,
  placeholder,
  type = 'text',
  rules,
}: InputFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={styles.inputContainer}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <input
            {...field}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              field.onChange(e);
            }}
            type={
              type === 'password' ? (showPassword ? 'text' : 'password') : type
            }
            placeholder={placeholder}
            className={styles.field}
          />
        )}
      />
      {type === 'password' && (
        <Button
          type="button"
          icon={showPassword ? hide : show}
          className={styles.toggleButton}
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </div>
  );
};