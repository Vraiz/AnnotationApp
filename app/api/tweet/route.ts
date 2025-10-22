import { NextResponse } from "next/server";
import { connectDatabase } from "@/lib/config/db";
import tweet from "@/lib/models/tweetModel";

export const GET = async (request: Request) => {
  try {
    connectDatabase();

    const tweets = await tweet.getTweet();

    return NextResponse.json({
      message: "Successfully fetched tweet",
      tweets: tweets
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      message: "An error occurred whilst fetchin tweet"
    }, { status: 500 });
  }
};

export const PATCH = async (request: Request) => {
  try {
    connectDatabase();

    const { id, newLabel } = await request.json();

    const tweets = await tweet.editTweet(id, newLabel);

    return NextResponse.json({
      message: "Successfully edited tweet",
      tweets: tweets
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      message: "An error occurred whilst editing tweet"
    }, { status: 500 });
  }
};


