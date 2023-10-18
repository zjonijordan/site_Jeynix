"use strict";

document.body.classList.add("loading");

document.addEventListener('DOMContentLoaded', function () {
  /**
   * Resize Browser Window
   */

  window.addEventListener('resize', function () {
    document.querySelectorAll('.opened').forEach(function (el) {
      el.classList.remove('opened');
    });
  });

  /***********************************
  * Language
  ***********************************/

  (function () {
    var btnsLang = document.querySelectorAll('[data-toggle-lang]');
    if (btnsLang.length === 0) return;
    new Language(btnsLang);
  })();

  /***********************************
  * Page Slider
  ***********************************/

  (function () {
    var mainContainer = document.querySelector(".page__main");
    var pageSlider = new Swiper("[data-swiper]", {
      wrapperClass: "slider__wrapper",
      slideClass: "section",
      direction: "vertical",
      slidesPerView: "auto",
      parallax: true,
      keyboard: {
        enable: true,
        onlyInViewport: true,
        pageUpDown: true
      },
      mousewheel: {
        sensitivity: 1
      },
      watchOverflow: true,
      speed: 800,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      pagination: {
        el: ".slider__pagination",
        type: "bullets",
        clickable: true,
        bulletClass: "slider__bullet",
        "bulletActiveClass": "slider__bullet--active"
      },
      scrollbar: {
        el: ".slider__scroll",
        dragClass: "slider__drag-scroll",
        draggable: true
      },
      init: false,
      on: {
        init: function init() {
          document.body.classList.remove("loading");
          setScrollType();
          mainContainer.classList.add("loaded");
        },
        slideChangeTransitionEnd: function slideChangeTransitionEnd() {
          document.body.classList.remove("scroll");
        },
        slideChange: function slideChange() {
          document.body.classList.add("scroll");
        },
        resize: function resize() {
          setScrollType();
        }
      }
    });
    function setScrollType() {
      if (mainContainer.classList.contains("free")) {
        mainContainer.classList.remove("free");
        pageSlider.params.freeMode = false;
      }
      for (var i = 0; i < pageSlider.slides.length; i++) {
        var itemSlide = pageSlider.slides[i];
        var itemSlideContent = itemSlide.querySelector(".section__content");
        if (itemSlideContent) {
          var itemSlideContentHeight = itemSlideContent.offsetHeight;
          if (itemSlideContentHeight > window.innerHeight) {
            mainContainer.classList.add("free");
            pageSlider.params.freeMode = true;
            break;
          }
        }
      }
    }
    var btnScrollDown = document.querySelector("[data-scroll-down]");
    var btnScrollUp = document.querySelector("[data-scroll-up]");
    btnScrollDown.addEventListener("click", function (e) {
      e.preventDefault();
      pageSlider.slideTo(4);
    });
    btnScrollUp.addEventListener("click", function (e) {
      e.preventDefault();
      pageSlider.slideTo(0);
    });
    pageSlider.init();
  })();

  /*********************************
  * Welcome slider
  *********************************/
  (function () {
    new Swiper("[data-welcome-swiper]", {
      slidesPerView: 1,
      autoplay: {
        delay: 5000
      },
      speed: 800,
      loop: true,
      pagination: {
        el: ".swiper__pagination",
        type: "bullets",
        clickable: true,
        bulletClass: "swiper__bullet",
        "bulletActiveClass": "swiper__bullet--active"
      },
      navigation: {
        prevEl: '.swiper__button-prev',
        nextEl: '.swiper__button-next'
      }
    });
  })();
});
/***********************************
* Language
***********************************/

function Language(btns) {
  var _this = this;
  this.btns = document.querySelectorAll("[data-toggle-lang]");
  this.btns.forEach(function (item) {
    item.addEventListener("click", _this.toggle);
  });
}
Language.prototype.toggle = function (e) {
  e.preventDefault();
  this.dataset.toggleLang === "en" ? document.body.classList.remove("ua") : document.body.classList.add("ua");
};
