class Product{
    constructor(PRODUCT_ID=null,
        PRODUCT_NAME=null,
        CATEGORYID=null,
        DESCRIPTION=null,
        TAGS=null,
        IMAGESOURCE=null,
        SUPPLIER_ID=null,
        PIECES=null ,
        ENCODED_ID=null){
            this.PRODUCT_ID = PRODUCT_ID;
            this.CATEGORYID = CATEGORYID;
            this.PRODUCT_NAME = PRODUCT_NAME;
            this.DESCRIPTION = DESCRIPTION;
            this.TAGS = TAGS;
            this.IMAGESOURCE = IMAGESOURCE;
            this.SUPPLIER_ID = SUPPLIER_ID;
            this.PIECES = PIECES;
            this.ENCODED_ID = ENCODED_ID;
        }


}

module.exports = Product;