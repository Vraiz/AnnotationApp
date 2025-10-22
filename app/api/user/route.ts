import { NextResponse } from "next/server";
import { connectDatabase } from "@/lib/config/db";
import user from "@/lib/models/Usermodel";

export const GET = async (request: Request) => {
  try {
    connectDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id != null){
      const users = await user.getUsers(id);

      return NextResponse.json({
        message: "Successfully fetched user",
        users: users,
        test: id
      }, { status: 201 });
    }
    return NextResponse.json({
      message: "An error occurred whilst fetchin users"
    }, { status: 500 });


  } catch (error) {
    return NextResponse.json({
      message: error
    }, { status: 500 });
  }
};

export const PATCH = async (request: Request) => {
  try {
    connectDatabase();

    const { id } = await request.json();

    const incUser = await user.patchUser(id);

    return NextResponse.json({
      message: "Successfully incremented label count",
      users: incUser
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      message: "An error occurred whilst editing user"
    }, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    connectDatabase();

    const {first_Name, last_Name, age, sex, email, password} = await request.json();

    const newUser = await user.register(first_Name, last_Name, age, sex, email, password);

    return NextResponse.json({
      message: "Successfully poster user",
      user: newUser
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      message: error.message
    }, { status: 500 });
  }
};
