function endBreak() {
  const Swal = require("sweetalert2");
  Swal.fire({
    title: "쉬는 시간 끝!",
    html: "우리 다시 공부하러 갑시다!<br/><br/>",
    allowOutsideClick: () => {
      const popup = Swal.getPopup();
      popup.classList.remove("swal2-show");
      setTimeout(() => {
        popup.classList.add("animate__animated", "animate__headShake");
      });
      setTimeout(() => {
        popup.classList.remove("animate__animated", "animate__headShake");
      }, 500);
      return false;
    },
  });
}

export default endBreak;
