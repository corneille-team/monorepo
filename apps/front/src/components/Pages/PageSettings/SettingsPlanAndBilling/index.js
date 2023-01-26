import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { subscriptionsType } from 'lib-enums';
import millify from 'millify';

import Style from '../style';
import theme from '../../../../styles/theme';
import { imagesLinks } from '../../../../utils';
import Slider from '../../../Slider';
import Switch from '../../../Switch';

const Button = styled.button`
  position: relative;
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px auto;
  padding: 10px 20px;
  background: ${(props) =>
    props.disabled
      ? theme.colors.grayDark
      : 'linear-gradient(90deg, #4375d6 2.37%, #c15bad 49.37%, #e58b76 96.67%)'};
  border-radius: 6px;
  font-size: 13px;
  height: 45px;

  img {
    position: absolute;
    right: 20px;
    height: 20px;
  }
`;

const Price = styled.div`
  display: flex;
  column-gap: 20px;

  span {
    font-weight: 300;
  }
`;

const Plans = styled.div`
  display: flex;
  column-gap: 20px;
  text-align: center;

  ${Style.Section} {
    width: 50%;
    border-radius: 20px;
  }

  p {
    font-size: 14px;
    line-height: 1.5;
  }

  span {
    color: ${theme.colors.gray};
  }

  h6 {
    font-size: 20px;
    font-weight: 500;
  }
`;

const PlansHeaderContent = styled.div`
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PlansArgument = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  img {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }

  span {
    color: ${theme.colors.blueText};
    font-weight: 500;
  }
`;

const offers = [
  {
    words: 19000,
    price: 9,
    seats: 1,
  },
  {
    words: 75000,
    price: 24,
    seats: 5,
  },
  {
    words: 160000,
    price: 51,
    seats: 10,
  },
  {
    words: 350000,
    price: 99,
    seats: 10,
  },
];

const SettingsPlanAndBilling = ({ user, company }) => {
  const { t } = useTranslation();

  const isPremium = () => company?.subscription?.plan === subscriptionsType.premium;

  const [words, setWords] = useState(0);
  const [annual, setAnnual] = useState(false);

  const applyReduction = (price) =>
    annual ? Math.ceil(price - Math.ceil(price * 0.25)) - 0.33 : price;

  return (
    <Style.CenteredContainer>
      <Style.Section>
        <p style={{ margin: 0 }}>
          {t('common:settings.plan_and_billing.actual_plan')}:{' '}
          {t(`common:plans.${isPremium() ? 'premium' : 'trial'}`)}
        </p>
        <Price>
          <span>
            {t('common:settings.plan_and_billing.price')}: {isPremium() ? 8 : 0}€/
            {t('common:month').toLowerCase()}
          </span>
          <span>
            {t('common:words')}: {company?.subscription?.words}
          </span>
          <span>
            {t('common:quality')}: {t('common:settings.plan_and_billing.quality')}
          </span>
        </Price>
      </Style.Section>

      <Plans>
        <Style.Section>
          <div style={{ marginBottom: '80px' }}>
            <h6>{t('common:settings.plan_and_billing.free_plan.title')}</h6>
            <PlansHeaderContent>
              <p>{t('common:settings.plan_and_billing.free_plan.description')}</p>
              <span>{t('common:settings.plan_and_billing.free_plan.try_description')}</span>
            </PlansHeaderContent>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <h6 style={{ margin: 0 }}>0 €</h6>
            <span>{t('common:settings.plan_and_billing.free_plan.per_what')}</span>
          </div>
          <div style={{ height: '32px' }}>
            <span style={{ fontSize: '14px' }}>
              {t('common:settings.plan_and_billing.free_plan.try_description')}
            </span>
          </div>
          <div style={{ margin: '20px 0' }}>
            <span style={{ color: theme.colors.blueText, fontWeight: 500 }}>
              {t('common:words')} - 5 000
            </span>
          </div>
          <Button disabled>
            {isPremium()
              ? t('common:settings.plan_and_billing.already_used')
              : t('common:settings.plan_and_billing.your_plan')}
          </Button>
          <PlansArgument>
            <img src={imagesLinks.icons.check} alt={'templates'} />
            <span>10+ {t('common:settings.plan_and_billing.arguments.ai_sales_templates')}</span>
          </PlansArgument>
          <PlansArgument>
            <img src={imagesLinks.icons.check} alt={'languages'} />
            <span>25+ {t('common:settings.plan_and_billing.arguments.languages')}</span>
          </PlansArgument>
        </Style.Section>

        <Style.Section>
          <div style={{ marginBottom: '32px' }}>
            <h6>{t('common:settings.plan_and_billing.premium_plan.title')}</h6>
            <PlansHeaderContent>
              <p>{t('common:settings.plan_and_billing.premium_plan.description')}</p>
            </PlansHeaderContent>
          </div>
          <div
            style={{
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                columnGap: '10px',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <span>{t('common:settings.plan_and_billing.premium_plan.monthly')}</span>
              <Switch value={annual} setValue={setAnnual} />
              <span>{t('common:settings.plan_and_billing.premium_plan.annual')}</span>
              <div
                style={{
                  backgroundColor: theme.colors.blue,
                  borderRadius: '6px',
                  padding: '0 6px',
                }}
              >
                <span style={{ color: 'white' }}>
                  {t('common:settings.plan_and_billing.premium_plan.save')?.toUpperCase()} 25%
                </span>
              </div>
            </div>
            <div>
              <h6 style={{ margin: 0 }}>{applyReduction(offers[words]?.price)} €</h6>
              <span>{t('common:settings.plan_and_billing.premium_plan.per_what')}</span>
            </div>
          </div>
          <Slider
            min={19000}
            max={350000}
            value={words}
            setValue={setWords}
            markers={offers?.map((offer) => ({ value: offer.words, label: 'lol' }))}
          />
          <div
            style={{
              margin: '20px 0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: '10px',
            }}
          >
            <span style={{ color: theme.colors.blueText, fontWeight: 500 }}>
              {t('common:words')} - {millify(offers[words]?.words)}
            </span>
            <span>
              {t('common:seats')}: {offers[words]?.seats}
            </span>
          </div>
          <Button>{t('common:plans.change_plan')}</Button>
          <PlansArgument>
            <img src={imagesLinks.icons.check} alt={'templates'} />
            <span>10+ {t('common:settings.plan_and_billing.arguments.ai_sales_templates')}</span>
          </PlansArgument>
          <PlansArgument>
            <img src={imagesLinks.icons.check} alt={'languages'} />
            <span>25+ {t('common:settings.plan_and_billing.arguments.languages')}</span>
          </PlansArgument>
        </Style.Section>
      </Plans>
    </Style.CenteredContainer>
  );
};
/*
"free_plan": {
  "plan": "Free",
    "title": "Try Dreamtone for free",
    "description": "Free trial of Dreamtone features to help you get a taste of AI writing",
    "per_what": "For a new user",
    "try_description": "Try all the features to find what works best for you."
},
 */
export default SettingsPlanAndBilling;
