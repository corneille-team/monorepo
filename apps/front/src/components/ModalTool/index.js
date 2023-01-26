import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { languagesType, tonesType } from 'lib-enums';
import Skeleton from 'react-loading-skeleton';
import { TypeAnimation } from 'react-type-animation';
import copy from 'copy-to-clipboard';

import theme from '../../styles/theme';
import { imagesLinks } from '../../utils';
import Dropdown from '../Dropdown';
import Spinner from '../Spinner';
import { useTool } from '../../actions/tools';
import { countWords } from '../../../../../libs/utils';
import { getCompany } from '../../actions/company';

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
    height: 14px;
    width: 14px;
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

const OutputSelector = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  border: 1px solid ${theme.colors.stroke};
  border-radius: 10px;
  padding: 0 15px;

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

  img {
    margin-right: 20px;
    width: 16px;
    height: 16px;
    transform: rotate(-90deg);
  }

  p {
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

const ModalTool = ({ tool, handleClose }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const company = useSelector((store) => store.company);
  const result = useSelector((store) => store.result);

  const [isLoading, setIsLoading] = useState(false);

  const [documentName, setDocumentName] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState(languagesType.english);
  const [tone, setTone] = useState(tonesType.professional);
  const [output, setOutput] = useState(1);

  const [error, setError] = useState({
    subject: false,
    content: false,
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
                <p>
                  {t(`common:last_words`)}:{' '}
                  <span>
                    {company?.subscription?.words} {t('common:words').toLowerCase()}
                  </span>
                </p>
              </LastWords>
            </Field>
            <Field>
              <label>{t('common:document_name')}</label>
              <input
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder={t('common:document_name')}
              />
            </Field>
            <Field>
              <label>{t('common:subject')}*</label>
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
            <Field>
              <label>{t('common:content')}*</label>
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
            <Field>
              <label>{t('common:language')}</label>
              <Dropdown
                value={
                  <Language>
                    <img src={imagesLinks.flags[language]} alt={'language'} />
                    <p>{t(`common:languages.${language}`)}</p>
                  </Language>
                }
              >
                {Object.keys(languagesType)?.map((l) => (
                  <p key={l} onClick={() => setLanguage(l)}>
                    {t(`common:languages.${l}`)}
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
            <OutputSelector>
              <input
                type={'number'}
                min={0}
                max={5}
                value={output}
                onChange={(e) => setOutput(e.target.value)}
              />
              <img src={imagesLinks.icons.trending_arrow} alt={'arrow'} />
              <p>{t('common:output')}</p>
            </OutputSelector>
            <button
              onClick={() => {
                setError({
                  subject: !subject,
                  content: !content,
                });

                if (!isLoading && subject && content) {
                  setIsLoading(true);
                  console.log('HERE');
                  dispatch(
                    useTool(tool, {
                      document_name: documentName,
                      language: language,
                      subject,
                      content,
                      tone,
                      output,
                    }),
                  ).then(() => {
                    setIsLoading(false);
                    dispatch(getCompany());
                  });
                }
              }}
            >
              {t('common:generate')} {isLoading && <Spinner />}
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
              {result?.map((out, index) => (
                <Result key={`out_${index}`}>
                  <p>{out}</p>
                  <div>
                    <span>
                      {countWords(out)} {t('common:words')} / {out?.length} {t('common:characters')}
                    </span>
                    <Copy
                      onClick={() => copy(out)}
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
