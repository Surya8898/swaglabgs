const BasePage = require("../Base/Baseclass.spec");

class EndtoendPage extends BasePage {


constructor(page) {

super(page);

this.page = page;
this.checkoutbtn = this.page.getByRole('button', { name: 'Checkout' });
this.firstname= this.page.getByPlaceholder('First Name');
this.lastname= this.page.getByPlaceholder('Last Name');
this.postalcode= this.page.getByPlaceholder('Zip/Postal Code');
this.continuebtn= this.page.getByRole('button', { name: 'Continue' });
this.finishtbtn= this.page.getByRole('button', { name: 'Finish' });
this.ordertxt= this.page.getByText('THANK YOU FOR YOUR ORDER');



}

async checkoutprocess(firstnamevalue,lastnamevalue,postalcodevalue){

    try {   

    await this.click(this.checkoutbtn);
    await this.fill(this.firstname,firstnamevalue);
    await this.fill(this.lastname,lastnamevalue);
    await this.fill(this.postalcode,postalcodevalue);
    await this.click(this.continuebtn);
    await this.click(this.finishtbtn);
    await this.waitForVisible(this.ordertxt);
    return this.ordertxt;
    }


    catch (error){  
        console.log("Checkout process failed"+error); 
        throw error;
    }   
}
}

module.exports = EndtoendPage;