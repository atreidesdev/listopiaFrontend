'use client';

import { useState } from 'react';
import { UpdatePasswordForm } from '@/widgets/UpdatePasswordForm/ui/UpdatePasswordForm';
import { useStores } from '@/app/store/useStore';
import UpdateEmailForm from '@/widgets/UpdateEmailForm/ui/UpdateEmailForm';
import UpdateProfileName from '@/widgets/UpdateProfileName/ui/UpdateProfileName';
import UpdateUsernameForm from '@/widgets/UpdateUsernameForm/ui/UpdateUsernameForm';
import { Button } from '@/shared/ui/button/button';
import styles from './page.module.css';
import UpdateAvatarForm from '@/widgets/UpdateAvatarForm/ui/UpdateAvatarForm';
import { CreateCollectionForm } from '@/widgets/CreateCollectionForm/ui/CreateCollectionForm';

const SettingsPage = () => {
  const { authStore } = useStores();
  const id = authStore.userId || 1;

  const [activeForm, setActiveForm] = useState<
    'profileName' | 'password' | 'username' | 'email' | 'avatar' | 'collection'
  >('profileName');

  const renderActiveForm = () => {
    switch (activeForm) {
      case 'profileName':
        return <UpdateProfileName userId={id} />;
      case 'password':
        return <UpdatePasswordForm userId={id} />;
      case 'username':
        return <UpdateUsernameForm userId={id} />;
      case 'email':
        return <UpdateEmailForm userId={id} />;
      case 'avatar':
        return <UpdateAvatarForm userId={id} />;
      case 'collection':
        return <CreateCollectionForm />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.menu}>
        <Button
          onClick={() => setActiveForm('profileName')}
          variant="primary"
          name={'Изменить имя профиля'}
        />
        <Button
          onClick={() => setActiveForm('password')}
          variant="primary"
          name={'Изменить пароль'}
        />
        <Button
          onClick={() => setActiveForm('username')}
          variant="primary"
          name={'Изменить юзернейм'}
        />
        <Button
          onClick={() => setActiveForm('email')}
          variant="primary"
          name={'Изменить почту'}
        />
        <Button
          onClick={() => setActiveForm('avatar')}
          variant="primary"
          name={'Изменить аватар'}
        />
        <Button
          onClick={() => setActiveForm('collection')}
          variant="primary"
          name={'Создать коллекцию'}
        />
      </div>
      <div className={styles.form}>{renderActiveForm()}</div>
    </div>
  );
};

export default SettingsPage;
