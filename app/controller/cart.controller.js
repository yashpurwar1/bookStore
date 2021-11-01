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
                    message: "Item added successfully",
                    success: true,
                    data: data
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
}
module.exports = new cartController();