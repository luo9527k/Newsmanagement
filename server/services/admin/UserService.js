const UserModel = require("../../models/UserModel")

const UserService = {
    login: async ({ username, password }) => {
        return UserModel.find({
            username,
            password
        })
    },
    upload: async ({ _id, username, password, introduction, gender, avatar }) => {
        if (avatar) {
            return UserModel.updateOne({
                _id
            }, {
                username, password, introduction, gender, avatar
            })
        } else {
            return UserModel.updateOne({
                username, password, introduction, gender
            })
        }
    },

    add: async ({ username, password, introduction, gender, avatar,role }) => {
        return UserModel.create({
            username, password, introduction, gender, avatar,role
        })
    },

    getList: async ({id}) => {
        return id?UserModel.find({ _id: id }, ["username", "role", "password", "introduction"])
            :UserModel.find({},["username","role","avatar","introduction","gender"])
    },
    putList: async (body) => {
        return UserModel.updateOne({_id:body._id},body)
    },
    delList: async (_id) => {
        return UserModel.deleteOne({_id})
    }
}

module.exports = UserService