import { Schema, model } from 'mongoose';
import { toolsType, subscriptionsType } from 'lib-enums';

const UsersSchema = new Schema(
  {
    first_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
    },
    subscription: {
      plan: {
        type: String,
        enum: Object.keys(subscriptionsType),
        default: subscriptionsType.free,
        required: true,
      },
      words: Number,
      subscription_date: Date,
    },
    projects: {
      type: [
        new Schema({
          name: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
        }),
      ],
      required: false,
    },
    usages: {
      type: [
        new Schema(
          {
            service: {
              type: String,
              enum: Object.keys(toolsType),
              required: true,
            },
            title: {
              type: String,
              required: false,
            },
            prompt: {
              type: String,
              required: true,
            },
            data: {
              type: String,
              required: false,
            },
            tokens_used: {
              type: Number,
              required: false,
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

let UsersModel;
export const connectUsersModel = () => {
  UsersModel = model('users', UsersSchema);
  return UsersModel;
};

export const getUsersModel = () => UsersModel || connectUsersModel();
