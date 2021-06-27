import jwt from 'jsonwebtoken'

const auth= async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
    
        const customAuth=token.length < 500
    
        let decodeData
    
        if(token && customAuth ){
            decodeData=jwt.verify(token,'test')
    
            req.userId=decodeData?.id
        } else{
            decodeData=jwt.decode(token)
    
            req.userId=decodeData ?.sub //sub is name of googles ids that differentiate between every single user
        }

        next()
    } catch (error) {
        console.log(error) 
    }
}

export default auth