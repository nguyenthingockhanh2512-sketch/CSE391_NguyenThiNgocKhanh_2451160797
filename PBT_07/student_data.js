const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];
let countGioi= 0, countKha = 0, countTrungBinh =0, countYeu=0;
let maxAvg = -1, minAvg =11;
let bestStudent = "", worstStudent = "";
let sumMath = 0; sumPhysics = 0, sumCs=0;
let sumAvgM = 0, countM = 0;
let sumAvgF = 0, countF = 0;
// in header
console.log("| STT | Tên      | TB   | Xếp loại    |");
console.log("|-----|----------|------|-------------|");

// Duyệt qua mảng sinh viên
for (let i = 0; i < students.length; i++) {
    let s = students[i];

    // 1. Tính điểm trung bình (làm tròn 1 chữ số thập phân để tránh lỗi precision của JS)
    let avg = (s.math * 0.4) + (s.physics * 0.3) + (s.cs * 0.3);
    avg = Math.round(avg * 10) / 10; 

    // 2. Xếp loại
    let rank = "";
    if (avg >= 8.0) {
        rank = "Giỏi";
        countGioi++;
    } else if (avg >= 6.5) {
        rank = "Khá";
        countKha++;
    } else if (avg >= 5.0) {
        rank = "Trung bình";
        countTrungBinh++;
    } else {
        rank = "Yếu";
        countYeu++;
    }

    // 3. In bảng kết quả (Sử dụng padEnd để căn lề chữ)
    let sttStr = String(i + 1).padEnd(3);
    let nameStr = s.name.padEnd(8);
    let avgStr = avg.toFixed(1).padEnd(4);
    let rankStr = rank.padEnd(11);
    console.log(`| ${sttStr} | ${nameStr} | ${avgStr} | ${rankStr} |`);

    // 5. Tìm SV điểm cao nhất và thấp nhất
    if (avg > maxAvg) {
        maxAvg = avg;
        bestStudent = s.name;
    }
    if (avg < minAvg) {
        minAvg = avg;
        worstStudent = s.name;
    }

    // 6. Cộng dồn để tính điểm TB toàn lớp cho từng môn
    sumMath += s.math;
    sumPhysics += s.physics;
    sumCs += s.cs;

    // 7. Bonus: Phân loại theo giới tính
    if (s.gender === "M") {
        sumAvgM += avg;
        countM++;
    } else if (s.gender === "F") {
        sumAvgF += avg;
        countF++;
    }
}

let n = students.length;

// In các kết quả thống kê
console.log("\n--- 4. THỐNG KÊ XẾP LOẠI ---");
console.log(`- Giỏi: ${countGioi} SV`);
console.log(`- Khá: ${countKha} SV`);
console.log(`- Trung bình: ${countTrungBinh} SV`);
console.log(`- Yếu: ${countYeu} SV`);

console.log("\n--- 5. SINH VIÊN XUẤT SẮC & CẦN CỐ GẮNG ---");
console.log(`- Cao nhất: ${bestStudent} (${maxAvg.toFixed(1)} điểm)`);
console.log(`- Thấp nhất: ${worstStudent} (${minAvg.toFixed(1)} điểm)`);

console.log("\n--- 6. ĐIỂM TRUNG BÌNH MÔN TOÀN LỚP ---");
console.log(`- Math: ${(sumMath / n).toFixed(1)}`);
console.log(`- Physics: ${(sumPhysics / n).toFixed(1)}`);
console.log(`- CS: ${(sumCs / n).toFixed(1)}`);

console.log("\n--- 7. BONUS: ĐIỂM TB THEO GIỚI TÍNH ---");
let avgM = countM > 0 ? (sumAvgM / countM) : 0;
let avgF = countF > 0 ? (sumAvgF / countF) : 0;
console.log(`- Nam (M): ${avgM.toFixed(1)}`);
console.log(`- Nữ (F): ${avgF.toFixed(1)}`);
