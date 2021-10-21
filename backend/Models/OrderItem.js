class ORDERITEM{
    constructor(ORDER_ID, 
        PRODUCT_ID, 
        QUANTITY
        ){
            this.ORDER_ID =parseInt(ORDER_ID);
            this.PRODUCT_ID =parseInt(PRODUCT_ID);
            this.QUANTITY = parseInt(QUANTITY);
            

        }


}

module.exports = ORDERITEM;