import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { usersRolesType } from 'lib-enums';

import { PATHS } from '../../utils';
import { getUser, disconnectUser } from '../../actions/user';
import { changeProject } from '../../actions/project';
import ModalCreateProject from '../../components/ModalCreateProject';

const LayoutPermissions = ({ children }) => {
  const router = useRouter();

  const project = useSelector((store) => store.project);

  const dispatch = useDispatch();

  const [access, setAccess] = useState(false);

  const [user, setUser] = useState(null);
  const [showCreateProject, setShowCreateProject] = useState(false);

  const fetch = async () => {
    const ret = await getUser();

    if (ret) {
      const { response: user } = ret;

      if (user) {
        dispatch(ret);
        setUser(user);

        if (user.role !== usersRolesType.user) {
          dispatch(disconnectUser());
          router.push(PATHS.CONNEXION);
        } else {
          setAccess(true);
        }

        if (!project && user.projects?.length) {
          dispatch(changeProject(user.projects[0]));
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

  useMemo(() => {
    if (user && !user?.projects?.length) {
      setShowCreateProject(true);
    }
  }, [user]);

  if (!access) return <div />;
  return (
    <>
      {children}
      {showCreateProject && <ModalCreateProject handleClose={() => setShowCreateProject(false)} />}
    </>
  );
};

export default LayoutPermissions;
