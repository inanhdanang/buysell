# Hệ thống giao dịch — EMA · Bollinger · MACD · HH&LL · Williams %R

Trang web tĩnh (HTML/CSS/JS thuần, không cần build) trình bày hệ thống giao dịch kỹ thuật dựa trên chỉ báo TradingView **"MACD + EMA + BB + HH&LL"** (Pine Script v6): quy tắc Buy/Sell, giữ lệnh, thoát lệnh, đứng ngoài, quản lý rủi ro, kèm ví dụ minh hoạ thực tế trên Vàng (XAU/USD), Bitcoin (BTC/USD) và Dầu WTI.

**➡️ Xem demo:** sau khi deploy sẽ có địa chỉ dạng `https://<tên-github-của-bạn>.github.io/<tên-repo>/`

---

## 🚀 Đưa lên GitHub Pages (miễn phí, không cần server)

### Cách 1 — Qua giao diện web GitHub (không cần cài gì)

1. Vào [github.com/new](https://github.com/new), tạo một repository mới (ví dụ đặt tên `trading-system`), để **Public**.
2. Trong repo vừa tạo, chọn **Add file → Upload files**, kéo thả **toàn bộ nội dung của thư mục này** (giữ nguyên cấu trúc thư mục `assets/`) vào rồi bấm **Commit changes**.
3. Vào tab **Settings → Pages** (menu bên trái).
4. Ở mục **Build and deployment → Source**, chọn **Deploy from a branch**.
5. Ở mục **Branch**, chọn `main` và thư mục `/ (root)`, bấm **Save**.
6. Đợi khoảng 1 phút, GitHub sẽ hiện đường link dạng `https://<username>.github.io/<repo>/` ở đúng mục Pages đó — bấm vào để xem trang web.

### Cách 2 — Qua dòng lệnh Git (nếu đã cài Git)

```bash
cd đường-dẫn-tới-thư-mục-này
git init
git add .
git commit -m "Khởi tạo trang hệ thống giao dịch"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

Sau đó vào **Settings → Pages** trên GitHub và làm bước 3–6 ở Cách 1.

> 💡 Nếu bạn muốn dùng tên miền riêng, thêm domain đó vào ô **Custom domain** trong Settings → Pages và tạo file `CNAME` chứa domain đó ở thư mục gốc.

---

## 📁 Cấu trúc thư mục

```
├── index.html              # Toàn bộ nội dung trang (1 file duy nhất)
├── assets/
│   ├── css/style.css       # Giao diện — bảng màu lấy đúng từ indicator
│   ├── js/main.js          # Tabs, checklist (lưu localStorage), biểu đồ mini SVG
│   └── img/chart1..10.jpg  # 10 ảnh biểu đồ minh hoạ (Vàng / Bitcoin / WTI)
└── README.md
```

Không có bước build/compile nào — chỉ cần mở `index.html` bằng trình duyệt là chạy được ngay, kể cả khi mở trực tiếp từ máy (double-click file).

## 🎨 Bảng màu (lấy mẫu trực tiếp từ chỉ báo TradingView)

| Thành phần | Mã màu |
|---|---|
| Tín hiệu Mua (B) | `#00E676` (lime) |
| Tín hiệu Bán (S) | `#F23645` (đỏ) |
| Tín hiệu nổi bật (★) | `#FFC83D` (vàng cam) |
| EMA 34 | `#FF9800` (cam) |
| EMA 89 | `#2196F3` (xanh dương) |

## 🛠️ Tuỳ chỉnh nội dung

- Sửa văn bản trực tiếp trong `index.html` (đã chia rõ theo từng `<section id="...">`).
- Đổi ảnh minh hoạ: thay file trong `assets/img/` (giữ nguyên tên hoặc sửa lại đường dẫn `src` tương ứng trong `index.html`).
- Đổi màu: chỉnh các biến trong khối `:root{ ... }` ở đầu file `assets/css/style.css`.

## ⚠️ Miễn trừ trách nhiệm

Nội dung trang web chỉ mang tính tham khảo kỹ thuật, không phải lời khuyên đầu tư. Thị trường tài chính luôn tiềm ẩn rủi ro cao.
