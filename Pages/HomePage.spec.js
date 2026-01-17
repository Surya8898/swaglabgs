const BasePage = require("../Base/Baseclass.spec");

class HomePage extends BasePage {


constructor(page) {

super(page);

this.page = page;
this.HeaderTxt = this.page.getByText('Swag Labs');
this.productcontainer = this.page.locator('.inventory_list .inventory_item');
this.productnamelist = this.page.locator('.inventory_item_name ');
this.removebtn =this.page.getByRole('button', { name: 'Remove' });
this.sortdropdown = this.page.locator('.product_sort_container');
this.cartcount = this.page.locator('.shopping_cart_badge');




    }

 VerifyhomepageTxt() {

 return this.HeaderTxt;
}

async getProductCount() {

    try {

    var productcount = await this.productcontainer.count();

    return productcount;

    }
    catch (error){
        console.log("Failed to get product count"+error); 
        throw error;
    }
}

async addtocartbyname(productname) {

    try {

const product = this.productcontainer.filter({ hasText: productname });

  const addToCartBtn = product.getByRole('button', { name: 'Add to cart' });

    await this.click(addToCartBtn);
    }
    catch (error){
        console.log("Failed to add product to cart"+error); 
        throw error;
    }



}

removebutton()
{

    return this.removebtn;
}

async getProductNames(){

    try {

   await this.selectByValue(this.sortdropdown,'Name (Z to A)');
   const productNames = await this.productnamelist.allTextContents();

   return productNames;

    }
    catch (error){
        console.log("Failed to get product names"+error); 
        throw error;
    }
}

async getCartCount(){

    try {

    const count = await this.cartcount.textContent();
    return count;
    }
    catch (error){
        console.log("Failed to get cart count"+error); 
        throw error;        

    }

}
}


module.exports = HomePage;
