const ProductService = require("../../services/admin/ProductService")

const ProductController = {
    add: async (req, res) => {
        // console.log(req.file, req.body)
        const cover = req.file ? `/productuploads/${req.file.filename}` : ""
        
        const {title,introduction,detail,author}=req.body
        // 调用service进行添加
        await ProductService.add({
            title, introduction,detail,author,
            cover,editTime:new Date()
        })
        res.send({
            ActionType:"ok"
        })
    },

    updateList: async (req, res) => {
        const cover = req.file ? `/productuploads/${req.file.filename}` : ""
        
        const {title,introduction,detail,_id}=req.body
        // 调用service进行添加
        await ProductService.updateList({
             title,introduction,detail,cover,_id,editTime:new Date()
        })
        res.send({
            ActionType:"ok"
        }) 
    },

    getList: async (req,res) => {
        const result =await ProductService.getList({_id:req.params.id})
        res.send({
            ActionType: "ok",
            data:result
        })
    },
//     publish: async (req, res) => {
//         await NewsService.publish({ ...req.body, editTime:new Date() })
//         res.send({
//             ActionType: "ok"
//         })
//     },
    delList: async (req, res) => {
        await ProductService.delList({ _id: req.params.id })
        res.send({
            ActionType:"OK"
        })
    }
}

module.exports=ProductController