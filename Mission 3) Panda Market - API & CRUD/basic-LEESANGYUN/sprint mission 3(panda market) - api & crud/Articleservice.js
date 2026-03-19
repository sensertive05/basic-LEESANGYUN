const BASE_URL = "https://panda-market-api-crud.vercel.app";

// 게시글 목록 조회
export function getArticleList({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) {
  const query = new URLSearchParams({ page, pageSize, orderBy, keyword }).toString();

  return fetch(`${BASE_URL}/articles?${query}`)
    .then((res) => {
      if (!res.ok) {
        console.error(`Error ${res.status}: 게시글 목록을 불러오지 못했습니다.`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("getArticleList 네트워크 오류:", err);
    });
}

// 게시글 단건 조회
export function getArticle(articleId) {
  return fetch(`${BASE_URL}/articles/${articleId}`)
    .then((res) => {
      if (!res.ok) {
        console.error(`Error ${res.status}: 게시글을 불러오지 못했습니다.`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("getArticle 네트워크 오류:", err);
    });
}

// 게시글 생성 (title, content 필수 / image 선택)
export function createArticle({ title, content, image }) {
  const body = { title, content };
  if (image) body.image = image;

  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (!res.ok) {
        console.error(`Error ${res.status}: 게시글 생성에 실패했습니다.`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("createArticle 네트워크 오류:", err);
    });
}

// 게시글 수정 (title, content, image 모두 선택)
export function patchArticle(articleId, { title, content, image } = {}) {
  const body = {};
  if (title !== undefined) body.title = title;
  if (content !== undefined) body.content = content;
  if (image !== undefined) body.image = image;

  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (!res.ok) {
        console.error(`Error ${res.status}: 게시글 수정에 실패했습니다.`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("patchArticle 네트워크 오류:", err);
    });
}

// 게시글 삭제
export function deleteArticle(articleId) {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        console.error(`Error ${res.status}: 게시글 삭제에 실패했습니다.`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("deleteArticle 네트워크 오류:", err);
    });
}