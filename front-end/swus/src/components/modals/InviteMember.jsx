function inviteMember() {
  const Swal = require("sweetalert2");

  Swal.fire({
    title: "초대할 친구의 닉네임을 적어주세요.",
    input: "text",
    inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    confirmButtonText: "초대하기",
    showLoaderOnConfirm: true,
  });
};

export default inviteMember;