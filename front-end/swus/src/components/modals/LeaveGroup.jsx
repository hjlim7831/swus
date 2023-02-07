function leaveGroup() {

  const Swal = require("sweetalert2");


  Swal.fire({
    title: "정말로 해당 스터디를 탈퇴하시겠습니까?",
    text: "스터디를 탈퇴하면 리포트를 조회할 수 없습니다. 정말 탈퇴하시겠습니까?",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "탈퇴하기",
    cancelButtonText: "계속하기",
    icon: "warning",
    
  }).then((res) => {
    if (res.isConfirmed) {
      Swal.fire({
        title: "스터디 탈퇴가 완료되었습니다!",
        icon: "success"
      })
      .then((res) => {
        window.location.reload("/mypage/group");
      })
    }
  })
};

export default leaveGroup;