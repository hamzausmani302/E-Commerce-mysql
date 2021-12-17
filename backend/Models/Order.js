class ORDERDETAILS{
    constructor(ORDER_ID,
        CUSTOMER_ID=0,
        DELIVERY_PARTNER, 
        AMOUNT=0,
        
        STATUS= 'PENDING'
        
        ){
            this.ORDER_ID =ORDER_ID;
            this.CUSTOMER_ID =parseInt(CUSTOMER_ID);
            this.DELIVERY_PARTNER = parseInt(DELIVERY_PARTNER);
            this.AMOUNT = parseInt(AMOUNT)
            this.STATUS = STATUS;

        }


}

module.exports = ORDERDETAILS;