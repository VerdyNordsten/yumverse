 POST /api/auth/sign-in/email 200 in 6817ms
 ○ Compiling /api/admin/login ...
 ✓ Compiled /api/admin/login in 1202ms (964 modules)
2025-09-04T18:15:53.045Z WARN [Better Auth]: Social provider github is missing clientId or clientSecret
2025-09-04T18:15:53.045Z WARN [Better Auth]: Social provider google is missing clientId or clientSecret
2025-09-04T18:15:53.046Z WARN [Better Auth]: Social provider twitter is missing clientId or clientSecret
=== Admin Login API Request ===
Headers:
accept: */*
accept-encoding: gzip, deflate, br, zstd
accept-language: en-US,en;q=0.9
connection: keep-alive
content-length: 29
content-type: application/json
cookie: better-auth.session_token=9q1j6yDvzjD1GZGjhKgjkL5dJK8Ue5wy.pExtjaxqhF0ld8fuwlaeBN6XgH8jP3ySrdPiTMm3anQ%3D
host: localhost:3000
origin: http://localhost:3000
referer: http://localhost:3000/admin/auth/sign-in?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fadmin%2Fdashboard
sec-ch-ua: "Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
sec-fetch-dest: empty
sec-fetch-mode: cors
sec-fetch-site: same-origin
user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36
x-forwarded-for: ::1
x-forwarded-host: localhost:3000
x-forwarded-port: 3000
x-forwarded-proto: http
Admin role verification for: admin@example.com
Session: true
Database user: {
  id: '4hNnCGUYwZ1sXmdlnrTglRJvW4rghOlR',
  name: 'Admin User',
  email: 'admin@example.com',
  emailVerified: true,
  passwordHash: null,
  image: null,
  avatar: null,
  avatarUrl: null,
  bio: null,
  dietaryPrefs: null,
  role: 'admin',
  createdAt: 2025-09-04T17:47:32.347Z,
  updatedAt: 2025-09-04T17:47:32.503Z
}
User role: admin
Admin verification successful for: admin@example.com
 POST /api/admin/login 200 in 2249ms
 ✓ Compiled /middleware in 215ms (108 modules)
Admin route accessed: /admin/dashboard
All cookies: [
  {
  name: 'better-auth.session_token',
  value: '9q1j6yDvzjD1GZGjhKgjkL5dJK8Ue5wy.pExtjaxqhF0ld8fuwlaeBN6XgH8jP3ySrdPiTMm3anQ='
}
]
Session cookie found: false
Alt session cookie found: false
No session token, redirecting to login
Admin route accessed: /admin/auth/sign-in
All cookies: [
  {
  name: '__next_hmr_refresh_hash__',
  value: '845e8b7e3f24e186111d4c7e34f7da8783cdb92ed6eabf0d'
},
  {
  name: 'better-auth.session_token',
  value: '9q1j6yDvzjD1GZGjhKgjkL5dJK8Ue5wy.pExtjaxqhF0ld8fuwlaeBN6XgH8jP3ySrdPiTMm3anQ='
}
]
Allowing access to auth page
 ○ Compiling /admin/auth/sign-in ...
 ✓ Compiled /admin/auth/sign-in in 5.6s (2324 modules)
 GET /admin/auth/sign-in?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fadmin%2Fdashboard 200 in 5887ms
Admin route accessed: /admin/auth/sign-in
All cookies: [
  {
  name: '__next_hmr_refresh_hash__',
  value: '845e8b7e3f24e186111d4c7e34f7da8783cdb92ed6eabf0d'
},
  {
  name: 'better-auth.session_token',
  value: '9q1j6yDvzjD1GZGjhKgjkL5dJK8Ue5wy.pExtjaxqhF0ld8fuwlaeBN6XgH8jP3ySrdPiTMm3anQ='
}
]
Allowing access to auth page
 GET /admin/auth/sign-in?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fadmin%2Fdashboard 200 in 28ms
