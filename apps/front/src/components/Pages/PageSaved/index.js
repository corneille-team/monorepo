import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import BootstrapTable from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';

import LayoutWithSidebar from '../../../layouts/LayoutWithSidebar';
import { displayDate, imagesLinks, PATHS } from '../../../utils';
import theme from '../../../styles/theme';
import { getCompanyMembers } from '../../../actions/user';
import ModalTool from '../../ModalTool';
import ModalRemoveHistory from './ModalRemoveHistory';
import { changeResult } from '../../../actions/tools';

const Table = styled(BootstrapTable)`
  th,
  td {
    padding: 15px 20px;

    img {
      width: 16px;
      height: 16px;
      cursor: pointer;
      visibility: hidden;
    }
  }

  tbody tr:hover {
    background-color: rgba(26, 118, 213, 0.05);

    img {
      visibility: visible;
    }
  }

  span {
    font-weight: 400;
    color: ${theme.colors.grayText};
  }

  p {
    font-weight: 500;
  }
`;

const PageSaved = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const company = useSelector((store) => store.company);

  const [showSaved, setShowSaved] = useState(null);
  const [showRemove, setShowRemove] = useState(null);

  const [members, setMembers] = useState(null);

  useEffect(() => {
    getCompanyMembers().then(setMembers);
  }, []);

  const viewSave = (completionId) => {
    const usage = company?.usages?.find((u) => u.completion_id === completionId);
    if (!usage) return;

    dispatch(changeResult(usage?.results));

    setShowSaved({
      tool: usage.service,
      document_name: usage.document_name,
      subject: usage.input?.subject,
      content: usage.input?.content,
      language: usage.input?.language,
      tone: usage.input?.tone,
      formality: usage.input?.formality,
      request: usage.input?.request,
    });
  };

  return (
    <LayoutWithSidebar title={t('common:saved.title')} path={PATHS.SAVED} contentFluid>
      <Table>
        <thead>
          <tr>
            <th colSpan={2}>
              <span>{t('common:saved.table.title')}</span>
            </th>
            <th colSpan={1}>
              <span>{t('common:saved.table.creator')}</span>
            </th>
            <th colSpan={1}>
              <span>{t('common:saved.table.type')}</span>
            </th>
            <th colSpan={1}>
              <span>{t('common:saved.table.creation')}</span>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {company?.usages
            ?.filter((usage) => usage.document_name)
            ?.map((usage) => (
              <tr key={usage.document_name}>
                <td
                  colSpan={2}
                  style={{ cursor: 'pointer' }}
                  onClick={() => viewSave(usage.completion_id)}
                >
                  <p>{usage.document_name}</p>
                </td>
                <td
                  colSpan={1}
                  style={{ cursor: 'pointer' }}
                  onClick={() => viewSave(usage.completion_id)}
                >
                  <p>
                    {members?.find((m) => String(m._id) === usage.user_id)?.first_name || '...'}
                  </p>
                </td>
                <td
                  colSpan={1}
                  style={{ cursor: 'pointer' }}
                  onClick={() => viewSave(usage.completion_id)}
                >
                  <p>{t(`common:tools.${usage.service}.title`)}</p>
                </td>
                <td
                  colSpan={1}
                  style={{ cursor: 'pointer' }}
                  onClick={() => viewSave(usage.completion_id)}
                >
                  <p>{displayDate(usage.generation_date)}</p>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <img
                    src={imagesLinks.icons.trash}
                    alt={'trash'}
                    onClick={() => setShowRemove(usage.completion_id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {showSaved && (
        <ModalTool
          tool={showSaved?.tool}
          payload={showSaved}
          handleClose={() => setShowSaved(null)}
        />
      )}
      {showRemove && (
        <ModalRemoveHistory completionId={showRemove} handleClose={() => setShowRemove(null)} />
      )}
    </LayoutWithSidebar>
  );
};

export default PageSaved;
