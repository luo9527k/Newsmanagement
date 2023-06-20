const UserService = require("../../services/admin/UserService")
const JWT = require("../../util/JWT")
// 引入jwt

const UserController = {
    login: async (req, res) => {
        // console.log(req.body)
        var result = await UserService.login(req.body)

        if (result.length === 0) {
            res.send({
                code: "-1",
                error: "用户名密码错误"
            })
        } else {

            //生成token
            const token = JWT.generate({
                _id: result[0].id,
                username: result[0].username
            }, "3d")

            res.header("Authorization", token)

            res.send({
                ActionType: "OK",
                data: {
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0, //性别 0,1,2
                    introduction: result[0].introduction, //简介
                    avatar: result[0].avatar,
                    role: result[0].role //管理员1，编辑2
                }
            })
        }
    },
    upload: async (req, res) => {
        const {username,password,introduction,gender}=req.body
        const token = req.headers["authorization"].split(" ")[1]
        const avatar=req.file?`/avataruploads/${req.file.filename}`:""
        var payload = JWT.verify(token)
        // console.log(payload._id)

        await UserService.upload({ _id: payload._id, username, password, introduction, gender: Number(gender), avatar })
        if (avatar) {
            res.send({
                ActionType: "OK",
                
                data: {
                    username, password, introduction,
                    gender: Number(gender), avatar
                }
            })
        } else {
            res.send({
                ActionType: "OK",
                data: {
                    username, password, introduction,
                    gender: Number(gender)
                }
            })
        }
    },

    add: async (req, res) => {
        const { username, password, introduction, gender, role } = req.body
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""
       

        await UserService.add({ username, password, introduction, gender: Number(gender), avatar ,role:Number(role)})
        if (avatar) {
            res.send({
                ActionType: "OK"
            })
        }
    },

    getList: async (req,res) => {
        const result = await UserService.getList(req.params)
        res.send({
            ActionType: "OK",
            data:result
        })
    },
    putList: async (req, res) => {
        const result = await UserService.putList(req.body)
        res.send({
            ActionType:"OK"
        })
    },
    delList: async (req, res) => {
        console.log(req.params.id)

        const result = await UserService.delList({_id:req.params.id})
        res.send({
            ActionType:"OK"
        })
    }
}


module.exports = UserController