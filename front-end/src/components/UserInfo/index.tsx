import React, {FC} from 'react';
import styles from './UserInfo.module.scss';
import defaultUserAvatar from './defaultUserAvatar.png'

type UserInfoPropsType = {
    additionalText?: string
    user?: {
        _id: string
        fullName: string
        email: string
        avatarUrl?: string
    }
}
export const UserInfo: FC<UserInfoPropsType> = ({user, additionalText}) => {
    
    return (
        <div className={styles.root}>
            <img className={styles.avatar} src={user?.avatarUrl ? user.avatarUrl : defaultUserAvatar}
                 alt={user?.fullName}/>
            <div className={styles.userDetails}>
                <span className={styles.userName}>{user?.fullName}</span>
                <span className={styles.additional}>{additionalText?.slice(0, 10)}</span>
            </div>
        </div>
    );
};
