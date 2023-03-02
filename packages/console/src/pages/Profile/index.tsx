import { useTranslation } from 'react-i18next';

import Button from '@/components/Button';
import CardTitle from '@/components/CardTitle';
import { isCloud } from '@/consts/cloud';
import useLogtoUserInfo from '@/hooks/use-logto-userinfo';
import * as resourcesStyles from '@/scss/resources.module.scss';

import BasicUserInfoSection from './components/BasicUserInfoSection';
import CardContent from './components/CardContent';
import PasswordSection from './components/PasswordSection';
import Section from './components/Section';
import * as styles from './index.module.scss';

const Profile = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const [user, fetchUser] = useLogtoUserInfo();

  if (!user) {
    return null;
  }

  return (
    <div className={resourcesStyles.container}>
      <div className={resourcesStyles.headline}>
        <CardTitle title="profile.title" subtitle="profile.description" />
      </div>
      <BasicUserInfoSection user={user} onUpdate={fetchUser} />
      {isCloud && (
        <Section title="profile.link_account.title">
          <CardContent
            title="profile.link_account.email_sign_in"
            data={[
              {
                label: 'profile.link_account.email',
                value: user.email,
                actionName: 'profile.link',
                action: () => {
                  console.log('link email');
                },
              },
            ]}
          />
        </Section>
      )}
      <PasswordSection />
      {isCloud && (
        <Section title="profile.delete_account.title">
          <div className={styles.deleteAccount}>
            <div className={styles.description}>{t('profile.delete_account.description')}</div>
            <Button
              title="profile.delete_account.button"
              onClick={() => {
                console.log('Not implemented.');
              }}
            />
          </div>
        </Section>
      )}
    </div>
  );
};

export default Profile;