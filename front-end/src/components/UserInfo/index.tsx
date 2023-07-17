import React, {FC} from 'react';
import styles from './UserInfo.module.scss';

type UserInfoPropsType = {
    fullName: string
    avatarUrl: string
    additionalText: any
}
export const UserInfo: FC<any> = ({avatarUrl, fullName, additionalText}) => {
    console.log(fullName)
    return (
        <div className={styles.root}>
            <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName}/>
            <div className={styles.userDetails}>
                <span className={styles.userName}>{fullName}</span>
                <span className={styles.additional}>{additionalText}</span>
            </div>
        </div>
    );
};
