import { Model, Schema, model, models } from "mongoose"
import { IUser } from "../types/user.types";

interface userModel extends Model<IUser> {
    getUsers(id: string): Promise<IUser>
    patchUser(id: string): Promise<IUser>
    postUser(first_Name: string, last_Name: string, age: number, sex: String): Promise<IUser>

}

const UserSchema = new Schema<IUser>({
    first_Name:{
        type:String
    },
    last_Name:{
        type:String
    },
    age: {
        type:Number
    },
    sex: {
        type:String
    },
    label_Count: {
        type:Number,
        default: 0
    },

});

UserSchema.static(
  "getUsers",
  async function getUsers(id: string) {
    let users = await this.findOne({_id: id})
    if (users != null) {
      return users
    }
    throw new Error("No tweets found")
  }
)

UserSchema.static(
  "patchUser",
  async function patchUser(id: string) {
    let users = await this.findOneAndUpdate(
        { _id: id },
        { $inc: {label_Count: 1 }  },
        { new: true }
      );
    if (users != null) {
      return users
    }
    throw new Error("No tweets found")
  }
)


UserSchema.static(
  "postUser",
  async function postUser(first_Name: string, last_Name: string, age: number, sex: String) {
    try{
        const oldUser = await this.findOne({first_Name: first_Name, last_Name: last_Name, age: age, sex: sex})
        if (oldUser != null) {
            return oldUser
        } 
        const newUser = await this.create({first_Name: first_Name, last_Name: last_Name, age: age, sex: sex, label_Count: 0})
        return newUser;
     } catch (e){
      console.log("here")
      throw new Error("Problem posting user");
    }
    
  }
)

const user = models.User as unknown as userModel || model<IUser, userModel>('Users', UserSchema);

export default user;