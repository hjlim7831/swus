function deleteArticle() {

  const Swal = require("sweetalert2");

  Swal.fire({
    title: "정말로 글을 삭제하시겠습니까?",
    text: "글을 삭제해도 그룹은 유지됩니다. 글을 삭제하시겠습니까?",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "삭제하기",
    cancelButtonText: "아니요",
  }).then((res) => {
    if (res.isConfirmed) {
      Swal.fire(
        "글이 삭제되었습니다.",
        "",
        "success"
      )
    }
  })
}

export default deleteArticle;