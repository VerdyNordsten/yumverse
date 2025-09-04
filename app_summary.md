2025-09-04T11:59:23.367Z WARN [Better Auth]: Social provider github is missing clientId or clientSecret
2025-09-04T11:59:23.368Z WARN [Better Auth]: Social provider google is missing clientId or clientSecret
2025-09-04T11:59:23.368Z WARN [Better Auth]: Social provider twitter is missing clientId or clientSecret
# SERVER_ERROR:  [Error: Failed query: select "id", "name", "email", "email_verified", "password_hash", "image", "avatar", "avatar_url", "bio", "dietary_prefs", "role", "created_at", "updated_at" from "users" where "users"."email" = $1
params: verdyprido@gmail.com] {
  query: 'select "id", "name", "email", "email_verified", "password_hash", "image", "avatar", "avatar_url", "bio", "dietary_prefs", "role", "created_at", "updated_at" from "users" where "users"."email" = $1',
  params: [Array],
  [cause]: [error: column "password_hash" does not exist] {
    length: 113,
    severity: 'ERROR',
    code: '42703',
    detail: undefined,
    hint: undefined,
    position: '49',
    internalPosition: undefined,
    internalQuery: undefined,
    where: undefined,
    schema: undefined,
    table: undefined,
    column: undefined,
    dataType: undefined,
    constraint: undefined,
    file: 'parse_relation.c',
    line: '3721',
    routine: 'errorMissingColumn'
  }
}
 POST /api/auth/sign-up/email 500 in 360ms
2025-09-04T11:59:36.082Z WARN [Better Auth]: Social provider github is missing clientId or clientSecret
2025-09-04T11:59:36.083Z WARN [Better Auth]: Social provider google is missing clientId or clientSecret
2025-09-04T11:59:36.083Z WARN [Better Auth]: Social provider twitter is missing clientId or clientSecret