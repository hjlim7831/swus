import axios from "../../Utils/index"

function inviteMember(teamId) {
  const Swal = require("sweetalert2");

  Swal.fire({
    title: `초대할 친구의 닉네임을 적어주세요.`,
    input: "text",
    inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    confirmButtonText: "초대하기",
    showLoaderOnConfirm: true,
    preConfirm: (email) => {
      const config = {
        url: `/my-teams/${teamId}/invite`,
        method: "POST",
        data: {
          email: email,
        },
      };
      return axios(config)
              .then((response) => {
                console.log(response)
              })
              .catch((error) => {
                Swal.showValidationMessage(
                  `Request failed ${error} in ${email}`
                )
              })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${result.value}`
      })
      .then((res) => {
        if (res.isConfirmed) {
          window.location.replace(`/group/mystudy/group/${teamId}`);
        }
      })
    }
  })
};

export default inviteMember;