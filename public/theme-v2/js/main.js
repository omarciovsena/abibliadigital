$(document).ready(function ($) {
  'use strict'

  /* ---------------------------------------------
     Smooth scroll
     --------------------------------------------- */

  $('a.section-scroll[href*="#"]:not([href="#"])').on('click', function (event) {
    if (
      location.pathname.replace(/^\//, '') ==
      this.pathname.replace(/^\//, '') ||
      location.hostname == this.hostname
    ) {
      var target = $(this.hash)
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault()
        $('html,body').animate(
          {
            scrollTop: target.offset().top - 100
          },
          750
        )
        return false
      }
    }
  })

  /* ---------------------------------------------
     Menu buttons
     --------------------------------------------- */
  $('button.menu-toggle').click(function () {
    $('nav ul').toggleClass('on')
    $('body').toggleClass('menuOpen')
  });



})
