# Tier 1 — Hiểu luồng hoạt động của React

## 📝 Bài 1.1 — Component render lần đầu (8 phút)

### Code mẫu — `LifecycleDemo.jsx`

### Câu hỏi
1. Tại sao component chỉ render 1 lần?
    Khi một component được tải lần đầu (Mount), React sẽ chạy function của component đó, lấy kết quả JSX và chuyển đổi thành giao diện hiển thị lên màn hình (DOM).

    Nó chỉ render 1 lần (như trong trường hợp dùng biến bình thường let count = 0) vì React không tự động theo dõi sự thay đổi của các biến JavaScript thông thường. Mặc dù giá trị của biến có thể tăng lên sau khi click, React hoàn toàn không nhận được bất kỳ "tín hiệu" hay thông báo nào để biết rằng dữ liệu đã thay đổi và cần phải vẽ lại (update) giao diện. Do đó, giao diện vẫn đóng băng ở kết quả của lần render đầu tiên.
2. Khi nào nó sẽ render lại?
Một component trong React sẽ được kích hoạt quá trình re-render (chạy lại component function để tạo ra JSX mới) chủ yếu trong các trường hợp sau:

    State thay đổi (Phổ biến nhất ở Tier 1): Khi bạn gọi hàm cập nhật trạng thái (ví dụ: setCount(newValue) từ useState). Hàm này chính là "chiếc chuông" báo hiệu cho React biết: "Dữ liệu đã thay đổi, hãy chạy lại component này và cập nhật màn hình đi!".

    Props thay đổi: Khi component nhận được dữ liệu (props) mới từ component cha truyền xuống.

    Component cha re-render: Theo mặc định của React, nếu một component cha được render lại, toàn bộ các component con nằm bên trong nó cũng sẽ bị re-render theo để đảm bảo giao diện luôn đồng bộ với dữ liệu mới nhất.
---


## 📝 Bài 1.3 — Luồng hoạt động (Flow) (5 phút)

### Sơ đồ luồng

```
┌─────────────────────────────────────────────────────────┐
│                    REACT FLOW                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Component function được gọi                         │
│              ↓                                          │
│  2. Return JSX (giao diện)                              │
│              ↓                                          │
│  3. React hiển thị lên màn hình                        │
│              ↓                                          │
│  4. Người dùng tương tác (click, nhập...)               │
│              ↓                                          │
│  5. Gọi setState(newValue)                              │
│              ↓                                          │
│  6. React gọi lại component function (RE-RENDER)        │
│              ↓                                          │
│  7. Return JSX mới                                      │
│              ↓                                          │
│  8. React cập nhật màn hình (chỉ phần thay đổi)        │
│              ↓                                          │
│  Quay lại bước 4                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Code minh họa
```jsx
import { useState } from "react";

function FlowDemo() {
    console.log("🔄 Component render!");
    
    const [step, setStep] = useState(1);
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Luồng hoạt động</h2>
            <p>Bước hiện tại: {step}</p>
            
            <button onClick={() => setStep(step + 1)}>
                Bước tiếp theo →
            </button>
            
            <button onClick={() => setStep(1)}>
                Quay lại đầu
            </button>
            
            <div style={{ marginTop: "20px", padding: "10px", background: "#f0f0f0" }}>
                {step === 1 && <p>👋 Bước 1: Xin chào!</p>}
                {step === 2 && <p>📖 Bước 2: Đang học React</p>}
                {step === 3 && <p>🎯 Bước 3: Hiểu useState</p>}
                {step === 4 && <p>🎉 Bước 4: Hoàn thành!</p>}
            </div>
        </div>
    );
}

export default FlowDemo;
```

---
