//const {test}=require("@playwright/test");

const BasePage = require("../Base/Baseclass.spec");

class LoginPage extends BasePage {


constructor(page)

{
super(page);
this.page = page;
this.username= this.page.locator("[placeholder='Username']");
this.password= this.page.locator("[placeholder='Password']");
this.loginbtn= this.page.locator("[id='login-button']");
this.errormsg= this.page.getByText('Epic sadface: Username is required');



}

async login (usernamevalue,passwordvalue){

    try {

    await this.fill(this.username,usernamevalue);
    await this.fill(this.password,passwordvalue);
    await this.click(this.loginbtn);
    await this.acceptDialog();
    }
    catch (error){
        console.log("Login failed"+error); 
        throw error;

}
}

async errormsgcheck(){{

    try {

    await this.click(this.loginbtn);
    await this.waitForVisible (this.errormsg);
    const actual= await this.getText(this.errormsg);
    const expected="Epic sadface: Username is required";
    if (actual.trim()==expected){
        
        return true;
    }
    else {

        return false;
    }
}
catch (error){
    console.log("Error message not displayed"+error); 
    throw error;
}


}

}
}

module.exports=LoginPage;
