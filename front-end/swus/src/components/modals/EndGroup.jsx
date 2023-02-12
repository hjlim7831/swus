import axios from "../../Utils/index";

function endGroup(teamId) {

  const Swal = require("sweetalert2");

  Swal.fire({
    title: "정말로 그룹 스터디를 종료하시겠습니까?",
    text: "그룹 스터디를 종료하면 다시 시작할 수 없습니다! 계속 하시겠습니까?",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "종료하기",
    cancelButtonText: "계속 스터디 하기",
  })
    .then((res) => {
      if (res.isConfirmed) {
        const config = {
          url: `/my-teams/${teamId}/done`,
          method: "POST",
        }

        axios(config)
          .then((response) => {
            console.log(response)
            Swal.fire(
              "스터디가 성공적으로 종료되었습니다!",
              "스터디가 끝나도 리포트 조회는 가능합니다.",
              "success"
            ).then((response) => {
              if (response.isConfirmed) {
                window.location.replace(`/group/mystudy/group/${teamId}`)
              }
            })
          })
      }
    })
  };

export default endGroup;