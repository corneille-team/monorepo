import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { usersRolesType } from 'lib-enums';

import { COOKIES_NAMES, PATHS, setCookie } from '../src/utils';
import { getUser } from '../src/actions/user';

const LoginPage = ({ query }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (query?.token) {
      setCookie(COOKIES_NAMES.token, query?.token);
      getUser().then((ret) => {
        if (ret?.response?.role === usersRolesType.user) {
          dispatch(ret);
          router.push(query?.source || PATHS.HOME);
        } else {
          router.back();
        }
      });
    } else {
      router.back();
    }
  }, []);

  return <div />;
};

LoginPage.getInitialProps = ({ query }) => {
  return { query };
};

export default LoginPage;
