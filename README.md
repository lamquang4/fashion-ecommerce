# WEBSITE THƯƠNG MẠI ĐIỆN TỬ THỜI TRANG

Xây dựng nền tảng thương mại điện tử thời trang dành cho nam và nữ, hỗ trợ sản phẩm đa biến thể theo màu sắc và kích thước với tồn kho riêng cho từng biến thể, cùng các chức năng giỏ hàng, yêu thích, đặt hàng, thanh toán, blog và quản lý người dùng

Triển khai xác thực người dùng với NextAuth.js và và sử dụng cơ chế App Router để xây dựng các API Routes, kết hợp MongoDB để lưu trữ dữ liệu và Cloudinary để quản lý hình ảnh

Triển khai SEO toàn hệ thống và theo từng trang với robots.txt, sitemap động được tạo từ dữ liệu MongoDB và metadata động cho các trang chi tiết sản phẩm, blog giúp công cụ tìm kiếm dễ dàng thu thập và hiển thị nội dung của website

![](docs/images/ui1.png)

![](docs/images/ui2.png)

## Demo

Website: [![Live Demo](https://img.shields.io/badge/Live_Demo-000000?style=flat-square&logo=vercel&logoColor=white)](https://fashion-aura-ten.vercel.app)

Admin: [![Live Demo](https://img.shields.io/badge/Live_Demo-000000?style=flat-square&logo=vercel&logoColor=white)](https://fashion-aura-admin.vercel.app)

## Cài đặt môi trường

**1. Clone repository**

```
https://github.com/lamquang4/fashion-ecommerce.git
```

**2. Chạy website bằng Docker**

```
docker compose up --build
```

## Công nghệ sử dụng

| Danh mục    | Tools / Frameworks                                     |
| ----------- | ------------------------------------------------------ |
| Frontend    | Next.js + TypeScript <br> TailwindCSS <br> Axios + SWR |
| Backend/API | Next.js App Router API Routes + Node.js + NextAuth.js  |
| Database    | MongoDB                                                |
| Storage     | Cloudinary                                             |
| Deployment  | Vercel                                                 |
| CI/CD       | Github Action                                          |
