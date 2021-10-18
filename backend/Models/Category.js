class Category {
    constructor(
        CATEGORY_ID=null,
        PARENT_ID=null,
        CATEGORY_DESC=null ,
        IMAGE=null){
            this.CATEGORYID = CATEGORY_ID;
            this.PARENTID = PARENT_ID;
            this.CATEGORYDESC = CATEGORY_DESC;
            this.IMAGE = IMAGE;
        }
}

module.exports = Category;