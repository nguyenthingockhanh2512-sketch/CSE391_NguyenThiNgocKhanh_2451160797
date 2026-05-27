function createCart() {
    // Private data
    let items = [];
    let currentDiscount = null;
    
    return {
        // Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        
        // Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);
            if (item) {
                if (newQuantity <= 0) {
                    this.removeItem(productId);
                } else {
                    item.quantity = newQuantity;
                }
            }
        },
        
        // Tính tổng tiền
        getTotal() {
            const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            let total = subtotal;
            
            if (currentDiscount === "SALE10") {
                total = subtotal * 0.9;
            } else if (currentDiscount === "SALE20") {
                total = subtotal * 0.8;
            } else if (currentDiscount === "FREESHIP") {
                total = subtotal - 30000;
            }
            
            // Đảm bảo tổng tiền không bị âm
            return Math.max(0, total);
        },
        
        // Áp dụng mã giảm giá
        applyDiscount(code) {
            currentDiscount = code;
        },
        
        // In giỏ hàng dạng bảng
        printCart() {
            console.log("┌────────────────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm         │ SL │ Đơn giá      │ Tổng        │");
            
            items.forEach((item, index) => {
                const stt = String(index + 1);
                // Căn chỉnh khoảng trắng để các cột thẳng hàng
                const name = item.name.padEnd(16, " "); 
                const qty = String(item.quantity).padStart(2, " ");
                const price = item.price.toLocaleString('vi-VN').padStart(12, " ");
                const itemTotal = (item.price * item.quantity).toLocaleString('vi-VN').padStart(11, " ");
                
                console.log(`│ ${stt} │ ${name} │ ${qty} │ ${price} │ ${itemTotal} │`);
            });
            
            console.log("├────────────────────────────────────────────────────────┤");
            
            const finalTotalStr = (this.getTotal().toLocaleString('vi-VN') + "đ").padStart(42, " ");
            console.log(`│ Tổng cộng: ${finalTotalStr} │`);
            console.log("└────────────────────────────────────────────────────────┘");
        },
        
        // Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        
        // Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            currentDiscount = null;
        }
    };
}


// === TEST ===
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

console.log("--- GIỎ HÀNG BAN ĐẦU ---");
cart.printCart();

console.log("\n--- SAU KHI ÁP DỤNG SALE10 ---");
cart.applyDiscount("SALE10");
cart.printCart();

console.log("\nSố SP:", cart.getItemCount()); // → 4

cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // → 2