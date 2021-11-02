const cartService = require('../service/cart.service')
class cartController{
    addToCart = (req, res) =>{
        try{
            const userInfo = {
                userId: req.user.id,
                itemId: req.params.id,
                qty: req.body.qty
            }
            cartService.addToCart(userInfo, (err, data)=>{
                if(err){
                    return res.status(400).json({
                        message: err,
                        success: false
                    })
                }
                return res.status(201).json({
                    message: data.msg,
                    success: true,
                    data: data.data,
                    totalValue: data.totalValue
                })
            })
        }
        catch(error){
            return res.status(500).json({
                message: "Internal server error",
                success: false
            })
        }
    }

    cartValue = (req, res)=> {
        try{
            const userId = req.user.id;
            console.log("in controller", userId)
            cartService.cartValue(userId, (err, data)=>{
                if(err){
                    return res.status(400).json({
                        message: err,
                        success: false
                    })
                }
                return res.status(201).json({
                    message: "Total value",
                    success: true,
                    data: data
                })
            })
        }
        catch(err){
            return res.status(500).json({
                message: "Internal server error",
                success: false
            })
        }
    }
}
module.exports = new cartController();