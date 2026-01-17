const BasePage = require("../Base/Baseclass.spec");

class CartPage extends BasePage {


constructor(page) {

super(page);

this.page = page;
this. carticon = this.page.locator('.shopping_cart_link');
this.productincart = this.page.locator('.cart_item');
this.carttitletxt =  this.page.locator('.header_secondary_container .title');


}

async navigateToCart(){

    try {

    await this.click(this.carticon);
    await this.waitForVisible(this.carttitletxt);
    return this.carttitletxt;
    }       
    catch (error){
        console.log("Navigation to cart failed"+error); 
        throw error;
    }  
    
}

async productincartcheck(productname){

    try {

  
    const productInCart = this.productincart.filter({ hasText: productname });

     return productInCart;
 }


       
    catch (error){
        console.log("Product not found in cart"+error); 
        throw error;    

    }
}
}
  



module.exports = CartPage;