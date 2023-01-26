import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { usersRolesType } from 'lib-enums';

import { PATHS } from '../../utils';
import { getUser, disconnectUser } from '../../actions/user';
import { getCompany } from '../../actions/company';

const LayoutPermissions = ({ children }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [access, setAccess] = useState(false);

  const fetch = async () => {
    dispatch(getCompany());

    const ret = await getUser();

    if (ret) {
      const { response: user } = ret;

      if (user) {
        dispatch(ret);

        if (user.role !== usersRolesType.user) {
          dispatch(disconnectUser());
          router.push(PATHS.CONNEXION);
        } else {
          setAccess(true);
        }
      } else {
        router.push(PATHS.CONNEXION);
      }
    } else {
      router.push(PATHS.CONNEXION);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  if (!access) return <div />;
  return <>{children}</>;
};

export default LayoutPermissions;
