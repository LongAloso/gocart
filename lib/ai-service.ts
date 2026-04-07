export const getRecommendations = async (userId) => {
  try {
    // Gọi đến FastAPI đang chạy ở port 8000
    const res = await fetch(`http://127.0.0.1:8000/recommend/${userId}`);
    const data = await res.json();
    return data.recommended; // Trả về mảng [id1, id2, id3...]
  } catch (error) {
    console.error("Lỗi kết nối AI Server:", error);
    return [];
  }
};