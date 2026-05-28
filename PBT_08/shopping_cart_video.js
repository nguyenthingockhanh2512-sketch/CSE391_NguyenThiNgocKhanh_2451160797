function createCart(){
    let items=[];
    return{
        addItem(name,price){
            items.push({name,price});
        },
        getTotal(){
            return items.reduce((sum,i)=>sum+i.price,0);
        },
        printCart(){
            console.table(items);
            console.log("Tổng tiền: ", this.getTotal());
        }
    };
}
const myCart = createCart();
myCart.addItem("Sách",150000);
myCart.addItem("Bút",15000);
myCart.addItem("Vở",1000);
myCart.printCart();