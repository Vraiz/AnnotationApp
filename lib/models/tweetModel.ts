import { Model, Schema, model, models } from "mongoose"
import { ITweet } from "../types/tweet.types";

interface tweetModel extends Model<ITweet> {
  getTweets(): Promise<ITweet>
  editTweet(id:string, newLabel: number): Promise<ITweet>
  getTweet(): Promise<ITweet>
}

const tweetSchema = new Schema<ITweet>({
    id:{
        type:Number,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    labels: {
        type:[Number],
        default:[0,0,0,0,0,0,0]
    },
    labelCount: {
        type:Number,
        default:0
    }

});


tweetSchema.static(
  "getTweets",
  async function getTweets() {
    let tweets = await this.find({})
    if (tweets != null) {
      return tweets
    }
    throw new Error("No tweets found")
  }
)

tweetSchema.static(
  "editTweet",
  async function editTweet(id: string, newLabel: number) {
    const tweet = await this.findById(id);

    if (!tweet) {
      throw new Error("tweet not found");
    }

    if (!Array.isArray(tweet.labels)) {
      tweet.labels = []; // create it if missing
    }

    while (tweet.labels.length <= newLabel) {
      tweet.labels.push(0); // fill with zeros up to the needed index
    }

    tweet.labels[newLabel] += 1;
    tweet.labelCount = (tweet.labelCount || 0) + 1;

    await tweet.save();

    return tweet;
  }
);

tweetSchema.static(
  "getTweet",
    async function getTweet() {
        try {
            const noParamCount = await this.countDocuments({ labelCount: { $exists: false } });
            if (noParamCount > 0) {
                const randomSkip = Math.floor(Math.random() * noParamCount);
                return await this.findOne({ labelCount: { $exists: false } }).skip(randomSkip);
                }
            else{
                const lowestDoc = await this.findOne().sort({ labelCount: 1 }).lean();
                
                if (!lowestDoc) return null;

                const lowestValue = lowestDoc.labelCount;


                const randomDoc = await this.aggregate([
                    { $match: { labelCount: lowestValue } },
                    { $sample: { size: 1 } }
                ]);

            return randomDoc[0] || null;

            }
        } catch (err) {
        console.error(err);
    }
    }

)

const tweet = models.Tweets as unknown as tweetModel || model<ITweet, tweetModel>('Tweets', tweetSchema);

export default tweet;