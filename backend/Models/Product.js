class Product{
    constructor(PRODUCT_ID=null,
        PRODUCT_NAME=null,
        CATEGORYID=null,
        DESCRIPTION=null,
        TAGS=null,       
        IMAGEURL=null,
        SUPPLIER_ID=null,
        PIECES=null ,
        
        PRICE = 0){
            this.PRODUCT_ID = PRODUCT_ID;
            this.CATEGORYID = CATEGORYID;
            this.PRODUCT_NAME = PRODUCT_NAME;
            this.DESCRIPTION = DESCRIPTION;
            this.TAGS = TAGS;
            this.SUPPLIER_ID = SUPPLIER_ID;
            this.IMAGEURL = IMAGEURL;
            this.PIECES = PIECES;
           
            this.PRICE = PRICE;
        }


}

module.exports = Product;