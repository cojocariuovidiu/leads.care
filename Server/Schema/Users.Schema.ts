import * as mongoose from 'mongoose';
import * as validator from 'mongoose-unique-validator';
import * as autoIncrement from 'mongoose-auto-increment';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { Dictionary } from '../../Shared/Types/Dictionary';

export interface IUserSchema extends mongoose.Document {
    UserId: mongoose.Schema.Types.Number,
    Name: mongoose.Schema.Types.String,
    Username: mongoose.Schema.Types.String,
    Password: mongoose.Schema.Types.String,
    Salt: mongoose.Schema.Types.String,
    Email: mongoose.Schema.Types.String
}

const _userSchema: mongoose.Schema = new mongoose.Schema({
    UserId: mongoose.Schema.Types.Number,
    Name: { type: mongoose.Schema.Types.String, required: true },
    Username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    Password: { type: mongoose.Schema.Types.String, required: true },
    Email: { type: mongoose.Schema.Types.String, unique: true },
    Salt: mongoose.Schema.Types.String
});

autoIncrement.initialize(mongoose.connection);
_userSchema.plugin(autoIncrement.plugin, 'User');
_userSchema.plugin(validator);

_userSchema.pre('save', function (next) {
    this.UserId = this._id;
    this.Password = bcrypt.hashSync(this.Password, 10);
    next();
});

_userSchema.post('save', function () {
});

_userSchema.set('toJSON', { getters: true, virtuals: true });

export const UserSchema = mongoose.model<IUserSchema>('User', _userSchema, 'User');
