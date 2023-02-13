import axios from "../../Utils/index";

function deleteArticle() {

  // const navigate = useNavigate();

  const Swal = require("sweetalert2");

  Swal.fire({
    title: "정말로 글을 삭제하시겠습니까?",
    text: "글을 삭제해도 그룹은 유지됩니다. 글을 삭제하시겠습니까?",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "삭제하기",
    cancelButtonText: "아니요",
  })
  .then((res) => {
    if (res.isConfirmed) {
      const boardId = window.location.pathname.slice(13, window.location.pathname.length + 1);
      const config = {
        url: `/boards/${boardId}`,
        method: "DELETE",
      }

      axios(config)
        .then((response) => [
          Swal.fire({
            title: "글이 삭제되었습니다.",
            confirmButtonText: "목록으로",
            confirmButtonColor: "gray",
            showCancelButton: false,
            icon: "success",
          })
          .then((res) => {
            if (res.isConfirmed) {
              console.log("목록?")
              window.location.replace("/group/board");
            }
          })
        ])
    }
  })
}

export default deleteArticle;