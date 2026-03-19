import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "../../ProductService.js";

// ──────────────────────────────────────────
// Article API 테스트
// ──────────────────────────────────────────

// 게시글 목록 조회
getArticleList({ page: 1, pageSize: 5, orderBy: "recent", keyword: "" }).then((data) => {
  console.log("📋 게시글 목록:", data);
});

// 게시글 생성
createArticle({
  title: "테스트 게시글",
  content: "내용입니다.",
  image: "https://example.com/image.png",
}).then((created) => {
  console.log("✅ 게시글 생성:", created);

  const articleId = created?.id;
  if (!articleId) return;

  // 게시글 단건 조회
  getArticle(articleId).then((article) => {
    console.log("🔍 게시글 단건:", article);
  });

  // 게시글 수정 (title만 변경)
  patchArticle(articleId, { title: "수정된 제목" }).then((updated) => {
      console.log("✏️ 게시글 수정:", updated);
    }
  );

  // 게시글 삭제
  deleteArticle(articleId).then((result) => {
    console.log("🗑️ 게시글 삭제:", result);
  });
});

// ──────────────────────────────────────────
// Product API 테스트
// ──────────────────────────────────────────

// 상품 목록 조회
const productList = await getProductList({ page: 1, pageSize: 5, orderBy: "recent", keyword: "" });
console.log("📦 상품 목록:", productList);

// 상품 생성
const createdProduct = await createProduct({
  name: "테스트 상품",
  description: "상품 설명입니다.",
  price: 10000,
  tags: ["태그1", "태그2"],
  images: ["https://example.com/product.png"],
});
console.log("✅ 상품 생성:", createdProduct);

const productId = createdProduct?.id;
if (productId) {
  // 상품 단건 조회
  const product = await getProduct(productId);
  console.log("🔍 상품 단건:", product);

  // 상품 수정
  const updatedProduct = await patchProduct(productId, {
    name: "수정된 상품명",
    price: 20000,
  });
  console.log("✏️ 상품 수정:", updatedProduct);

  // 상품 삭제
  const deleteResult = await deleteProduct(productId);
  console.log("🗑️ 상품 삭제:", deleteResult);
}
