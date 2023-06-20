const jsonwebtoken = require("jsonwebtoken")
const secret="luo"
const JWT = {
    generate(value,expries) {
       return  jsonwebtoken.sign(value, secret, { expiresIn:expries })
    },
    verify(token) {
        try{
            return jsonwebtoken.verify(token, secret)
        } catch (e) {
            return false
        }
    }
}

module.exports=JWT