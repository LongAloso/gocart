export function getBotReply(input = "") {
  const text = input.toLowerCase();

  if (text.includes("ship") || text.includes("giao hàng")) {
    return "Shop hỗ trợ giao hàng toàn quốc. Phí ship sẽ tùy khu vực và đơn hàng.";
  }

  if (text.includes("đổi trả") || text.includes("hoàn tiền")) {
    return "Shop có chính sách đổi trả theo điều kiện sản phẩm và thời gian mua hàng. Bạn có thể gửi mã đơn để mình kiểm tra chi tiết.";
  }

  if (text.includes("bảo hành") || text.includes("warranty")) {
    return "Chế độ bảo hành phụ thuộc từng sản phẩm. Bạn gửi tên sản phẩm hoặc mã sản phẩm để mình tra nhanh giúp bạn.";
  }

  if (text.includes("giá") || text.includes("bao nhiêu")) {
    return "Bạn gửi tên sản phẩm, mình sẽ giúp bạn kiểm tra giá và thông tin liên quan.";
  }

  return null;
}