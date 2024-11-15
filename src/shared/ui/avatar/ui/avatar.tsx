import Image from 'next/image';
import Link from 'next/link';
import styles from './avatar.module.css';

export type AvatarProps = {
  size?: number;
  avatarPath: string;
  username: string;
  profileName?: string;
};

export const Avatar = (props: AvatarProps) => {
  return (
    <Link href={`/user/${props.username}`} className={styles.link}>
      {props.profileName && <span>{props.profileName}</span>}
      <Image
        src={props.avatarPath}
        alt={'avatar' + props.username}
        width={props.size}
        height={props.size}
        className={styles.avatar}
      />
    </Link>
  );
};
