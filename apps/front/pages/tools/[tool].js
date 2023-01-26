import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { languagesType, tonesType } from 'lib-enums';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { TypeAnimation } from 'react-type-animation';

import LayoutPermissions from '../../src/layouts/LayoutPermissions';
import { imagesLinks, PATHS } from '../../src/utils';
import theme from '../../src/styles/theme';
import Dropdown from '../../src/components/Dropdown';
import { translation } from '../../../../libs/translations';
import { toolsList } from '../../src/utils/toolsList';
import { useTool } from '../../src/actions/tools';
import Spinner from '../../src/components/Spinner';

import 'react-loading-skeleton/dist/skeleton.css';

const Page = styled.div`
  display: flex;
  height: 100vh;
`;

const ToolSidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-width: 420px;
`;

const Form = styled.div`
  padding: 20px 30px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
  margin-bottom: 100px;
`;

const Logo = styled.img`
  height: 40px;
  cursor: pointer;
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const Language = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.black};
  font-size: 14px;

  img {
    height: 16px;
    margin-right: 10px;
  }
`;

const SubmitSection = styled.div`
  padding: 30px 40px;
  border-top: 1px solid ${theme.colors.stroke};
`;

const ButtonSubmit = styled.button`
  width: 100%;

  img {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
`;

const ButtonChangeTool = styled.button`
  svg {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
`;

const Content = styled.div`
  margin-top: 80px;
  height: calc(100vh - 80px);
  width: calc(100vw - 290px);
  max-width: 1200px;
  background-color: white;
  border: 1px solid ${theme.colors.stroke};
  border-radius: 12px 12px 0 0;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  padding: 40px;
  overflow-y: auto;
`;

const ToolHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const ToolName = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }

  h5 {
    margin: 0;
  }
`;

const ToolInfos = styled.div`
  background-color: ${theme.colors.grayLight};
  padding: 10px 20px;
  font-size: 12px;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const ToolResultWaiting = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 200px;

  p {
    font-size: 20px;
    font-weight: 500;
  }
`;

const Result = styled.div`
  margin-top: 20px;
  border-radius: 6px;
  padding: 10px;
`;

const Tools = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const result = useSelector((store) => store.result);

  const [documentName, setDocumentName] = useState('');
  const [language, setLanguage] = useState(languagesType.french);
  const [tone, setTone] = useState(tonesType.professional);
  const [content, setContent] = useState('');

  const [loading, setLoading] = useState(false);

  const tool = toolsList[router.query.tool];

  return (
    <LayoutPermissions>
      <Page>
        <ToolSidebar>
          <Form>
            <Link href={PATHS.HOME}>
              <LogoContainer>
                <Logo src={imagesLinks.logos.full} alt={'dreamtone'} />
              </LogoContainer>
            </Link>

            <Field>
              <label>Nom du document</label>
              <input
                placeholder={'Entrer le nom du document'}
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
              />
            </Field>
            <Field>
              <label>Langue</label>
              <Dropdown
                value={
                  <Language>
                    <img src={imagesLinks.flags[language]} alt={'language'} />
                    <p>{translation(`languages.${language}`)}</p>
                  </Language>
                }
              >
                {Object.keys(languagesType)?.map((l) => (
                  <p key={l} onClick={() => setLanguage(l)}>
                    {translation(`languages.${l}`)}
                  </p>
                ))}
              </Dropdown>
            </Field>
            <Field>
              <label>Tonalité</label>
              <Dropdown value={<p>{translation(`tones.${tone}`)}</p>}>
                {Object.keys(tonesType)?.map((t) => (
                  <p key={t} onClick={() => setTone(t)}>
                    {translation(`tones.${t}`)}
                  </p>
                ))}
              </Dropdown>
            </Field>
            <Field>
              <label>Sujet</label>
              <textarea
                placeholder={"L'impact de l'inflation sur les civilisations depuis l'empire romain"}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Field>
          </Form>
          <SubmitSection>
            <ButtonSubmit
              onClick={() => {
                setLoading(true);
                dispatch(
                  useTool(router.query.tool, {
                    title: documentName,
                    language: language,
                    subject: content,
                    tone,
                  }),
                ).then(() => setLoading(false));
              }}
            >
              {!loading && (
                <>
                  <img src={imagesLinks.icons.pen} alt={'generate'} />
                  Générer
                </>
              )}
              {loading && <Spinner />}
            </ButtonSubmit>
          </SubmitSection>
        </ToolSidebar>
        <Content>
          <ToolHeader>
            <ToolName>
              <img src={tool?.img} alt={'tool icon'} />
              <h5>{translation(`tools.${router.query.tool}`)}</h5>
            </ToolName>
            <Link href={PATHS.HOME}>
              <ButtonChangeTool>
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6673 12.5H1.33398"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.6673 1.83325H1.33398"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.33398 9.83333H13.6673C14.2196 9.83333 14.6673 9.3856 14.6673 8.83333V5.5C14.6673 4.94771 14.2196 4.5 13.6673 4.5H2.33398C1.7817 4.5 1.33398 4.94771 1.33398 5.5V8.83333C1.33398 9.3856 1.7817 9.83333 2.33398 9.83333Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.33398 15.1667H1.33398"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Changer d&apos;outil
              </ButtonChangeTool>
            </Link>
          </ToolHeader>
          {!result && !loading && (
            <div>
              <ToolInfos>
                Chaque contenu que vous allez générer sera unique et personnalisé
              </ToolInfos>
              <ToolResultWaiting>
                <p>Le contenu généré par l’IA va apparaître ici</p>
              </ToolResultWaiting>
            </div>
          )}
          {!result && loading && (
            <Result>
              <Skeleton count={5} />
            </Result>
          )}
          {result && (
            <div>
              <TypeAnimation
                sequence={[result]}
                speed={85}
                wrapper="p"
                cursor={false}
                repeat={false}
                style={{ fontSize: '16px', color: theme.colors.black }}
                omitDeletionAnimation={true}
              />
            </div>
          )}
        </Content>
      </Page>
    </LayoutPermissions>
  );
};

export default Tools;
