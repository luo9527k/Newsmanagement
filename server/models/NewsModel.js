const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NewsType = {
    title: String,
    content: String,
    category: Number, //类别 1，2，3
    cover: String, //封面
    isPublish: Number, //发布与未发布
    editTime:Date //时间
}
//user模型 ===> users集合
const NewsModel = mongoose.model("news", new Schema(NewsType))


module.exports=NewsModel