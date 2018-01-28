import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { ValidationError } from '../Framework/Error/ValidationError';
import { UserSignupRequestModel } from '../../Shared/Models/UserSignupRequestModel';
import { UserBaseRequestModel } from '../../Shared/Models/UserBaseRequestModel';
import { UserResponseModel } from '../../Shared/Models/UserResponseModel';
import { UserModel } from '../../Shared/Models/UserModel';
import { StatusTypes } from '../../Shared/Enums/StatusTypes';
import { Logger } from '../Framework/Logging/Logger';
import { UserSchema } from '../Schema/Users.Schema';
import { AppSettings } from '../../Server/Settings/AppSettings';
import { BadRequestError } from 'routing-controllers';
import { NotFoundError } from 'routing-controllers';
import { MongoErrors } from '../Framework/Error/MongoErrors';

export class UserRepository {
    public Save(model: UserSignupRequestModel): Promise<UserResponseModel> {
        if (model.UserId) {
            return this.Update(model);
        } else {
            return this.SaveNew(model);
        }
    }

    private SaveNew(model: UserSignupRequestModel): Promise<UserResponseModel> {
        return new Promise<UserResponseModel>((resolve, reject) => {
            let user = new UserSchema(model);
            console.log(model);
            user.save((err, savedUser) => {
                try {
                    if (err) {
                        console.log(`Mongo err: ${err.toString()}`);
                        let error = new BadRequestError();
                        error.name = 'New User Error';
                        error.message = err.message;
                        throw error;
                    }
                    console.log(`Saved User: ${savedUser.toString()}`);
                    let response = new UserResponseModel();
                    response.Status = StatusTypes.Success
                    response.Message = 'success';
                    resolve(response);
                } catch (err) {
                    console.log(`Request err: ${err.toString()}`);
                    reject(err);
                }
            });
        });
    }

    private Update(model: UserBaseRequestModel): Promise<UserResponseModel> {
        return new Promise<UserResponseModel>((resolve, reject) => {
            UserSchema.findOneAndUpdate({ Username: model.Username, Password: model.Password }, { $set: model }, { new: true, upsert: false }, (err, user) => {
                let response = new UserResponseModel();
                response.Status = StatusTypes.Success
                response.Message = 'success';
                resolve(response);
            });
        });
    }

    public Login(model: UserBaseRequestModel): Promise<UserResponseModel> {
        return new Promise<UserResponseModel>((resolve, reject) => {
            let filter = { Username: model.Username };
            UserSchema.findOne(filter, (err, userObj) => {
                try {
                    let response = new UserResponseModel();
                    if (!userObj) {
                        let error = new NotFoundError();
                        error.name = 'User not found';
                        error.message = 'No user was found for the credentials you entered.'
                        throw error;
                    }
                    else {
                        let user: any = userObj.toObject();
                        if (!bcrypt.compareSync(model.Password, user.Password)) {
                            let error = new NotFoundError();
                            error.name = 'User not found';
                            error.message = 'No user was found for the credentials you entered.'
                            throw error;
                        } else {
                            let token = sign({ user: user }, AppSettings.SecretKey, { expiresIn: 7200 });
                            response.Status = StatusTypes.Success;
                            response.Message = `Welcome, ${user.Name}`;
                            response.UserId = user.UserId;
                            response.Name = user.Name;
                            response.Token = token;
                            resolve(response);
                        }
                    }
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    public Logout(model: UserBaseRequestModel): Promise<UserResponseModel> {
        return new Promise<UserResponseModel>((resolve, reject) => {
            let filter = { UserId: model.UserId };
            UserSchema.findOne(filter, (err, userObj) => {
                let response = new UserResponseModel();
                let user: any = userObj.toObject();
                resolve(response);
            });
        });
    }
}
