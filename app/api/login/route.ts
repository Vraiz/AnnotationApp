import { NextResponse } from "next/server";
import { connectDatabase } from "@/lib/config/db";
import user from "@/lib/models/Usermodel";

export const POST = async (request: Request, response: Response) => {
  const {email, password} = await request.json();
    try {
    connectDatabase();

    

    const newUser = await user.login(email, password);

    return NextResponse.json({
      message: "Successfully logged in",
      user: newUser
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      message: error.message
    }, { status: 500 });
  }
};