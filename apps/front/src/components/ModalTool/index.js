import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { formalitiesType, languagesType, tonesType } from 'lib-enums';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';

import theme from '../../styles/theme';
import { imagesLinks } from '../../utils';
import Dropdown from '../Dropdown';
import Spinner from '../Spinner';
import { useTool } from '../../actions/tools';
import { countWords } from '../../../../../libs/utils';
import { getCompany } from '../../actions/company';
import { toolsRequiredFields } from '../../../../../libs/tools';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.colors.stroke};
  box-shadow: rgb(229, 231, 235) 0 0 8px 4px;
  min-height: 60px;
  height: 60px;
  padding: 0 40px;

  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  h6 {
    font-weight: 500;
    margin: 0;
  }
`;

const Container = styled.div`
  display: flex;
  overflow-y: hidden;
`;

const Left = styled.div`
  position: relative;
  width: 450px;
  border-right: 1px solid ${theme.colors.stroke};
  min-height: calc(100vh - 60px);
  overflow-y: hidden;
`;

const LeftContent = styled.div`
  padding: 30px;
  height: calc(100vh - 60px - 100px);
  overflow-y: auto;
`;

const LastWords = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.blueLight};
  border-radius: 8px;
  padding: 10px 20px;

  p {
    font-weight: 500;
  }

  span {
    font-size: 14px;
    font-weight: 400;
    margin-left: 10px;
  }

  img {
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }
`;

const TextLength = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 5px;

  span {
    font-size: 12px;
    font-weight: 400;
    color: ${theme.colors.gray};
  }
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const Language = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.black};
  font-size: 14px;
  font-weight: 300;

  img {
    height: 16px;
    margin-right: 10px;
  }
`;

const Actions = styled.div`
  background-color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  border-top: 1px solid ${theme.colors.stroke};
  padding: 30px;

  button {
    background-color: ${theme.colors.blueText};
    padding: 0 20px;
    height: 45px;
    font-weight: 500;
  }
`;

const RequestSelector = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  border: 1px solid ${theme.colors.stroke};
  border-radius: 10px;
  padding: 0 15px;
  column-gap: 20px;

  p {
    font-size: 16px;
    width: 20px;
    height: 25px;
  }

  div {
    display: flex;
    flex-direction: column;
    row-gap: 5px;

    img {
      width: 8px;
      height: 8px;
      cursor: pointer;
    }
  }

  input {
    padding: 0;
    border: none;
    width: 20px;
  }

  input:hover,
  input:focus {
    border: none;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  span {
    font-size: 12px;
  }

  &:hover {
    border-color: ${theme.colors.blue};
  }
`;

const Right = styled.div`
  width: calc(100% - 450px);
  padding: 30px;
  min-height: calc(100vh - 60px);
  overflow-y: auto;
`;

const Copy = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  visibility: hidden;
`;

const Result = styled.div`
  border: 1px solid ${theme.colors.stroke};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p {
    font-weight: 400;
    line-height: 1.5;
    font-size: 14px;
    color: ${theme.colors.blueText};
    margin-bottom: 10px;
  }

  span {
    color: ${theme.colors.gray};
    text-transform: lowercase;
  }

  &:hover {
    border-color: ${theme.colors.blue};
  }

  &:hover ${Copy} {
    visibility: visible;
  }
`;

const Waiter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 170px;
    height: 170px;
    margin-bottom: 10px;
  }

  p {
    text-align: center;
    color: ${theme.colors.gray};
    font-size: 14px;
  }
`;

const Logo = styled.img`
  width: 170px;
  height: 170px;
`;

const LogoWrapper = styled(Logo)`
  animation: bounce2 1.5s ease infinite;
  @keyframes bounce2 {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  }
`;

const ModalTool = ({ tool, payload, handleClose }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const company = useSelector((store) => store.company);
  const result = useSelector((store) => store.result);

  const [isLoading, setIsLoading] = useState(false);

  const [documentName, setDocumentName] = useState(payload?.document_name || '');
  const [linkedinUrl, setLinkedinUrl] = useState(payload?.linkedin_url || '');
  const [subject, setSubject] = useState(payload?.subject || '');
  const [content, setContent] = useState(payload?.content || '');
  const [language, setLanguage] = useState(payload?.language || languagesType.french);
  const [tone, setTone] = useState(payload?.tone || tonesType.professional);
  const [formality, setFormality] = useState(payload?.formality || formalitiesType.formal);
  const [request, setRequest] = useState(payload?.request || 3);

  const [error, setError] = useState({
    subject: false,
    content: false,
    linkedin_url: false,
  });

  return (
    <Modal show={true} onHide={() => null} size={'tool'}>
      <Header>
        <h6>{t(`common:tools.${tool}.title`)}</h6>
        <img src={imagesLinks.icons.close} alt={'close'} onClick={handleClose} />
      </Header>
      <Container>
        <Left>
          <LeftContent>
            <Field>
              <LastWords>
                <img src={imagesLinks.icons.credits} alt={'credits'} />
                <p>
                  {t(`common:last_words`)}:{' '}
                  <span>
                    {company?.subscription?.words} {t('common:words').toLowerCase()}
                  </span>
                </p>
              </LastWords>
            </Field>
            <Field>
              <input
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder={t('common:document_name')}
              />
            </Field>
            {toolsRequiredFields[tool]?.linkedin_url && (
              <Field>
                <label>{t(`common:tools.${tool}.linkedin_url`)}*</label>
                <input
                  value={linkedinUrl}
                  onChange={(e) => {
                    setLinkedinUrl(e.target.value);
                    setError({ ...error, linkedin_url: !e.target.value });
                  }}
                  placeholder={'https://linkedin.com/in/username'}
                  style={{ borderColor: error?.subject && theme.colors.red }}
                />
              </Field>
            )}
            {toolsRequiredFields[tool]?.subject && (
              <Field>
                <label>{t(`common:tools.${tool}.subject`)}*</label>
                <input
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setError({ ...error, subject: !e.target.value });
                  }}
                  placeholder={t('common:placeholder_subject')}
                  style={{ borderColor: error?.subject && theme.colors.red }}
                />
                <TextLength>
                  <span>{subject?.length}/300</span>
                </TextLength>
              </Field>
            )}
            {toolsRequiredFields[tool]?.content && (
              <Field>
                <label>{t(`common:tools.${tool}.content`)}*</label>
                <textarea
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    setError({ ...error, content: !e.target.value });
                  }}
                  placeholder={t('common:placeholder_content')}
                  style={{ borderColor: error?.content && theme.colors.red }}
                />
                <TextLength>
                  <span>{content?.length}/600</span>
                </TextLength>
              </Field>
            )}
            <Field>
              <label>{t('common:language')}</label>
              <Dropdown
                value={
                  <Language>
                    <img src={`${imagesLinks.flags}/${language}.svg`} alt={'language'} />
                    <p>{t(`common:languages.${language}`)}</p>
                  </Language>
                }
              >
                {Object.keys(languagesType)?.map((l) => (
                  <Language key={l} style={{ padding: '0 20px' }}>
                    <img src={`${imagesLinks.flags}/${l}.svg`} alt={language} />
                    <p onClick={() => setLanguage(l)}>{t(`common:languages.${l}`)}</p>
                  </Language>
                ))}
              </Dropdown>
            </Field>
            <Field>
              <label>{t('common:formality')}</label>
              <Dropdown
                value={
                  <Language>
                    <p>{t(`common:${formality}`)}</p>
                  </Language>
                }
              >
                {Object.keys(formalitiesType)?.map((fo) => (
                  <p key={fo} onClick={() => setFormality(fo)}>
                    {t(`common:${fo}`)}
                  </p>
                ))}
              </Dropdown>
            </Field>
            <Field>
              <label>{t('common:tone')}</label>
              <Dropdown
                value={
                  <Language>
                    <p>{t(`common:tones.${tone}`)}</p>
                  </Language>
                }
              >
                {Object.keys(tonesType)?.map((to) => (
                  <p key={to} onClick={() => setTone(to)}>
                    {t(`common:tones.${to}`)}
                  </p>
                ))}
              </Dropdown>
            </Field>
          </LeftContent>
          <Actions>
            <RequestSelector>
              <p>{request}</p>
              <div>
                <img
                  src={imagesLinks.icons.arrow}
                  alt={'arrow up'}
                  onClick={() => request + 1 < 6 && setRequest((r) => r + 1)}
                />
                <img
                  src={imagesLinks.icons.arrow}
                  alt={'arrow down'}
                  onClick={() => request - 1 > 0 && setRequest((r) => r - 1)}
                  style={{ transform: 'rotate(180deg)' }}
                />
              </div>
              <span>{t('common:requests')}</span>
            </RequestSelector>
            <button
              onClick={() => {
                if (company?.subscription?.words < 1) {
                  toast.error(
                    "Vous n'avez plus de mots, mettez à niveau votre plan pour continuer",
                  );
                  return;
                }

                const newError = {};
                if (toolsRequiredFields[tool]?.linkedin_url && !linkedinUrl) {
                  newError.content = true;
                }
                if (toolsRequiredFields[tool]?.subject && !subject) {
                  newError.subject = true;
                }
                if (toolsRequiredFields[tool]?.content && !content) {
                  newError.content = true;
                }

                setError(newError);

                if (Object.keys(newError).length) {
                  toast.error('Certains champs requis sont vides');
                  return;
                }

                if (!isLoading) {
                  setIsLoading(true);
                  dispatch(
                    useTool(tool, {
                      document_name: documentName,
                      language: language,
                      linkedin_url: linkedinUrl,
                      subject,
                      content,
                      formality,
                      tone,
                      output: request,
                    }),
                  )
                    .then(() => {
                      setIsLoading(false);
                      dispatch(getCompany());
                    })
                    .catch(() =>
                      toast.error('Erreur innatendue, vos crédits ne sont pas prélevés'),
                    );
                }
              }}
            >
              {t(`common:${result ? 'regenerate' : 'generate'}`)} {isLoading && <Spinner />}
            </button>
          </Actions>
        </Left>
        <Right>
          {isLoading && (
            <Waiter>
              <LogoWrapper src={imagesLinks.logos.simple} alt={'logo'} />
              <p>{t('common:wait')}</p>
            </Waiter>
          )}

          {!result && !isLoading && (
            <Waiter>
              <Logo src={imagesLinks.logos.simple} alt={'logo'} />
              <p>{t('common:copy_generated')}</p>
            </Waiter>
          )}

          {!isLoading && result && (
            <div>
              {result?.map((res, index) => (
                <Result key={`res_${index}`}>
                  <p>{res.text}</p>
                  <div>
                    <span>
                      {countWords(res.text)} {t('common:words')} / {res.text?.length}{' '}
                      {t('common:characters')}
                    </span>
                    <Copy
                      onClick={() => copy(res.text)}
                      src={imagesLinks.icons.content_copy}
                      alt={'copy to clipboard'}
                    />
                  </div>
                </Result>
              ))}
            </div>
          )}
        </Right>
      </Container>
    </Modal>
  );
};

export default ModalTool;
