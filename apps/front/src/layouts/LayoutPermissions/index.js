import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { usersRolesType } from 'lib-enums';

import { COOKIES_NAMES, getCookie, PATHS } from '../../utils';
import { getUser, disconnectUser, GET_USER_SUCCESS } from '../../actions/user';
import { getCompany } from '../../actions/company';

const LayoutPermissions = ({ shouldBeDisconnected, children }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [access, setAccess] = useState(false);

  const fetch = async () => {
    dispatch(getCompany());

    console.log('HERE');
    const ret = await getUser();
    console.log(ret);

    if (ret.type === GET_USER_SUCCESS) {
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
    console.log(getCookie(COOKIES_NAMES.token));
    if (shouldBeDisconnected) {
      if (getCookie(COOKIES_NAMES.token)) {
        router.replace(PATHS.HOME);
      } else {
        setAccess(true);
      }
    } else {
      fetch();
    }
  }, []);

  if (!access) return <div />;
  return <>{children}</>;
};

export default LayoutPermissions;
