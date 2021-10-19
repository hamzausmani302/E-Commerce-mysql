class Category {
    constructor(
        CATEGORY_ID=null,
        PARENT_ID=null,
        CATEGORY_DESC=null ,CATEGORY_NAME=null,
        IMAGE=null){
            this.CATEGORY_ID = CATEGORY_ID;
            this.PARENT_ID = PARENT_ID;
            this.CATEGORY_DESC = CATEGORY_DESC;
            this.CATEGORY_NAME=CATEGORY_NAME;
            this.IMAGE = IMAGE;
        }
}

module.exports = Category;