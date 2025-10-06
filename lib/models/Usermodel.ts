import { Model, Schema, model, models } from "mongoose"
import { IUser } from "../types/user.types";
import bcrypt from "bcrypt"

interface userModel extends Model<IUser> {
    getUsers(id: string): Promise<IUser>
    patchUser(id: string): Promise<IUser>
    register(first_Name: string, last_Name: string, age: number, sex: string, email: string, password: string): Promise<IUser>
    login (email: string, password: string): Promise<IUser>

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
    email: {
      type:String
    },
    password: {
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
    throw new Error("No users found")
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
    throw new Error("No users found")
  }
)

UserSchema.static(
  "login",
  async function login(email: string, password: string) {
    const emailLowerCase = email.toLowerCase()
    let user = await this.findOne({ email: emailLowerCase })//replace username with userLowerCase
    if (user == null) {
      user = await this.findOne({ email: emailLowerCase })//replace username with userLowerCase
    }else {
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
        user.last_login = new Date()
        await user.save()
        return user
      }
    }
    throw new Error("Invalid email or password")
  }
)

UserSchema.static(
  "register",
  async function postUser(first_Name: string, last_Name: string, age: number, sex: string, email: string, password: string) {
        const existingUser = await this.findOne({email: email})
        if (existingUser != null) {
            throw new Error('user with email already exists');
        } 
    try{
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);
        const newUser = await this.create({first_Name: first_Name, last_Name: last_Name, age: age, sex: sex, email: email, password: hash, label_Count: 0})
        return newUser;
     } catch (e){
      console.log("here")
      throw new Error("Problem posting user");
    }
    
  }
)

const user = models.User as unknown as userModel || model<IUser, userModel>('Users', UserSchema);

export default user;