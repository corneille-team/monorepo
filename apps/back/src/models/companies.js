import { Schema, model } from 'mongoose';
import { toolsType, languagesType, formalitiesType, tonesType } from 'lib-enums';

import { plansType } from '../../../../libs/plans';

const CompaniesSchema = new Schema(
  {
    owner_id: {
      type: String,
      required: true,
      unique: true,
    },
    members_ids: {
      type: [String],
      required: false,
    },
    subscription: {
      plan: {
        type: String,
        enum: Object.keys(plansType),
        default: null,
        required: false,
      },
      words: {
        type: Number,
      },
      seats: {
        type: Number,
        default: 1,
      },
      subscription_date: Date,
    },
    usages: {
      type: [
        new Schema(
          {
            user_id: {
              type: String,
              required: true,
            },
            service: {
              type: String,
              enum: Object.keys(toolsType),
              required: true,
            },
            document_name: {
              type: String,
              required: false,
            },
            input: {
              subject: {
                type: String,
                required: false,
              },
              content: {
                type: String,
                required: false,
              },
              language: {
                type: String,
                enum: Object.keys(languagesType),
                required: false,
              },
              tone: {
                type: String,
                enum: Object.keys(tonesType),
                required: false,
              },
              formality: {
                type: String,
                enum: Object.keys(formalitiesType),
                required: false,
              },
              request: {
                type: Number,
                required: false,
              },
            },
            prompt: {
              type: String,
              required: true,
            },
            results: [
              new Schema(
                {
                  text: {
                    type: String,
                    required: true,
                  },
                  liked: {
                    type: Boolean,
                    default: false,
                  },
                  disliked: {
                    type: Boolean,
                    default: false,
                  },
                },
                { _id: false },
              ),
            ],
            tokens_used: {
              type: Number,
              required: false,
            },
            completion_id: {
              type: String,
              required: false,
            },
            generation_date: {
              type: Date,
              required: true,
            },
          },
          { _id: false },
        ),
      ],
      default: [],
      required: false,
    },
    picture_url: {
      type: String,
      required: false,
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

let CompaniesModel;
export const connectCompaniesModel = () => {
  CompaniesModel = model('companies', CompaniesSchema);
  return CompaniesModel;
};

export const getCompaniesModel = () => CompaniesModel || connectCompaniesModel();
