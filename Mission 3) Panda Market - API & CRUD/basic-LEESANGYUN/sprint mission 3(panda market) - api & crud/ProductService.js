const BASE_URL = "https://panda-market-api-crud.vercel.app";

// 상품 목록 조회
export async function getProductList({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) {
  const query = new URLSearchParams({ page, pageSize, orderBy, keyword }).toString();

  try {
    const res = await fetch(`${BASE_URL}/products?${query}`);
    if (!res.ok) {
      console.error(`Error ${res.status}: 상품 목록을 불러오지 못했습니다.`);
    }
    return await res.json();
  } catch (err) {
    console.error("getProductList 네트워크 오류:", err);
  }
}

// 상품 단건 조회
export async function getProduct(productId) {
  try {
    const res = await fetch(`${BASE_URL}/products/${productId}`);
    if (!res.ok) {
      console.error(`Error ${res.status}: 상품을 불러오지 못했습니다.`);
    }
    return await res.json();
  } catch (err) {
    console.error("getProduct 네트워크 오류:", err);
  }
}

// 상품 생성
export async function createProduct({ name, description, price, tags, images }) {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    if (!res.ok) {
      console.error(`Error ${res.status}: 상품 생성에 실패했습니다.`);
    }
    return await res.json();
  } catch (err) {
    console.error("createProduct 네트워크 오류:", err);
  }
}

// 상품 수정 (name, description, price, tags, images 모두 선택)
export async function patchProduct(productId, { name, description, price, tags, images } = {}) {
  const body = {};
  if (name !== undefined) body.name = name;
  if (description !== undefined) body.description = description;
  if (price !== undefined) body.price = price;
  if (tags !== undefined) body.tags = tags;
  if (images !== undefined) body.images = images;

  try {
    const res = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error(`Error ${res.status}: 상품 수정에 실패했습니다.`);
    }
    return await res.json();
  } catch (err) {
    console.error("patchProduct 네트워크 오류:", err);
  }
}

// 상품 삭제
export async function deleteProduct(productId) {
  try {
    const res = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      console.error(`Error ${res.status}: 상품 삭제에 실패했습니다.`);
    }
    return await res.json();
  } catch (err) {
    console.error("deleteProduct 네트워크 오류:", err);
  }
}
