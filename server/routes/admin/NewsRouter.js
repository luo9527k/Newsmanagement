var express = require('express');
const NewsController=require('../../controllers/admin/NewsController')
var NewsRouter = express.Router();

const multer = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })

// 路由创建
NewsRouter.post("/adminapi/news/add", upload.single("file"), NewsController.add)
NewsRouter.get("/adminapi/news/list",NewsController.getList)
NewsRouter.post("/adminapi/news/list",upload.single("file"),NewsController.updateList)
NewsRouter.get("/adminapi/news/list/:id",NewsController.getList)
NewsRouter.delete("/adminapi/news/list/:id",NewsController.delList)
NewsRouter.put("/adminapi/news/publish",NewsController.publish)

module.exports=NewsRouter