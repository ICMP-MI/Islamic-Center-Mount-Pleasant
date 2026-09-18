



document.addEventListener("DOMContentLoaded", () => {
  const accordionContents = document.querySelectorAll(".accordion-content");

  accordionContents.forEach((item, index) => {
    let header = item.querySelector("button");
    header.addEventListener("click", () => {
      item.classList.toggle("open");

      let description = item.querySelector(".description");
      let icon = item.querySelector("i");
      if(item.classList.contains(`open`)) {
        header.setAttribute("aria-expanded", "true");
        if (description) {
          description.style.height = `${description.scrollHeight}px`;
        }
        if (icon) {
          icon.classList.replace("fa-plus", "fa-minus");
        }
      }
      else {
        header.setAttribute("aria-expanded", "false");
        if (description) {
          description.style.height = "0px";
        }
        if (icon) {
          icon.classList.replace("fa-minus", "fa-plus");
        }
      }
      //console.log(description);

      removeOpen(index)
    })
  });

  function removeOpen(index1) {
    accordionContents.forEach((item2, index2) => {
      if(index1 != index2) {
        item2.classList.remove("open");

        let header2 = item2.querySelector("button");
        if (header2) {
          header2.setAttribute("aria-expanded", "false");
        }
        let des = item2.querySelector(".description");
        if (des) {
          des.style.height = "0px";
        }
        let icon2 = item2.querySelector("i");
        if (icon2) {
          icon2.classList.replace("fa-minus", "fa-plus");
        }

      }
    })
  }

});
