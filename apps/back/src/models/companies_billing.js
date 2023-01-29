import { Schema, model } from 'mongoose';

import { plansType } from '../../../../libs/plans';

const CompaniesBillingSchema = new Schema(
  {
    company_id: {
      type: String,
      required: false,
    },
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    plan: {
      type: String,
      enum: Object.keys(plansType),
      required: false,
    },
    words: {
      type: Number,
      required: true,
    },
    created_at: {
      type: Date,
      default: () => new Date(),
    },
    updated_at: {
      type: Date,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false },
);

let CompaniesBillingModel;
export const connectCompaniesBillingModel = () => {
  CompaniesBillingModel = model('companies_billing', CompaniesBillingSchema);
  return CompaniesBillingModel;
};

export const getCompaniesBillingModel = () =>
  CompaniesBillingModel || connectCompaniesBillingModel();
