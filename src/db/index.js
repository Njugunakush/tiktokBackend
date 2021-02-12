import mongoose from "mongoose";

const tiktokSchema = mongoose.Schema({
    url: String,
    channel: String,
    likes: String,
    song: String,
    messages: String,
    description: String,
    shares: String,
});

// coll inside db
export default mongoose.model('tiktokVids', tiktokSchema);