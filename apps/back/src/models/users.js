import { Schema, model } from 'mongoose';

const UsersSchema = new Schema(
  {
    company_id: {
      type: String,
      required: false,
    },
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
    words: {
      type: Number,
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
