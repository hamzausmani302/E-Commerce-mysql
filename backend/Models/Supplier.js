class Supplier {
    constructor(
        SUPPLIER_ID=null,
        NAME=null,
        CONTACT=null ,ADDRESS=null,
        CITY=null,POSTALCODE=null,COUNTRY=null){
            this.SUPPLIER_ID = SUPPLIER_ID;
            this.NAME = NAME;
            this.CONTACT = CONTACT;
            this.CITY=CITY;
            this.ADDRESS = ADDRESS;
            this.POSTALCODE = POSTALCODE;
            this.COUNTRY = COUNTRY;
        }
}

module.exports = Supplier;