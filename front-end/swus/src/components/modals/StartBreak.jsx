function startBreak() {
  const Swal = require("sweetalert2");

  let timerInterval;

  Swal.fire({
    title: "지금은 쉬는 시간입니다!",
    html: "이 알림은 <strong></strong> 초 후, 자동으로 닫힙니다.<br/><br/>",
    timer: 10000,
    didOpen: () => {
      const content = Swal.getHtmlContainer();
      const $ = content.querySelector.bind(content);

      Swal.showLoading();

      timerInterval = setInterval(() => {
        Swal.getHtmlContainer().querySelector("strong").textContent = (
          Swal.getTimerLeft() / 1000
        ).toFixed(0);
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  });
}

export default startBreak;
