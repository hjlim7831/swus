import axios from "../../Utils/index";

function leaveGroup(teamId) {

  const Swal = require("sweetalert2");

  Swal.fire({
    title: "정말로 해당 스터디를 탈퇴하시겠습니까?",
    text: "스터디를 탈퇴하면 리포트를 조회할 수 없습니다. 정말 탈퇴하시겠습니까?",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "탈퇴하기",
    cancelButtonText: "계속하기",
    icon: "warning",
    preConfirm: () => {
      const config = {
        url: `/my-teams/${teamId}`,
        method: "DELETE",
      };

      return axios(config)
              .then((response) => {
                console.log(response)
              })
              .catch((error) => {
                Swal.showValidationMessage(
                  `Request failed ${error}`
                )
              })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((res) => {
    if (res.isConfirmed) {
      Swal.fire({
        title: "스터디 탈퇴가 완료되었습니다!",
        icon: "success"
      })
      .then((res) => {
        window.location.replace("/group/mystudy");
      })
    }
  })
};

export default leaveGroup;