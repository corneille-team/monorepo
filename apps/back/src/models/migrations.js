import { Schema, model } from 'mongoose';

const MigrationSchema = new Schema(
  {
    lastRun: {
      type: String,
      required: true,
      index: true,
    },
    migrations: [
      new Schema({
        title: {
          type: String,
          required: true,
        },
        timestamp: {
          type: String,
          required: true,
        },
      }),
    ],
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

let MigrationsModel;
export const connectMigrationsModel = () => {
  MigrationsModel = model('migrations', MigrationSchema);
  return MigrationsModel;
};

export const getMigrationsModel = () => MigrationsModel || connectMigrationsModel();
