import { getShoppingCart } from "../utilities/fakedb";

const cartProductLoader = async () => {
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();

    // if cart data is in faDatabase, you have to use async await 
    const storedCart = getShoppingCart();
    const saveCart = [];

    console.log(saveCart);

    for(const id in storedCart){
        const addedProduct = products.find(pd => pd.id === id);
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            saveCart.push(addedProduct);
        }
    }
    // if you need to send two things 
    // return [products, saveCart]; option-1 
    // another option 
    // return {products, saveCart};
    return saveCart;
}

export default cartProductLoader;