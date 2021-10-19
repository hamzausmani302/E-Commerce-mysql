class Shipper {
   
    constructor(
        SHIPPER_ID=null,
        NAME=null,
        CONTACT=null,COUNTRY=null){
            this.SHIPPER_ID = SHIPPER_ID;
            this.NAME = NAME;
            this.CONTACT=CONTACT;
            this.COUNTRY = COUNTRY;
        }
}

module.exports = Shipper;