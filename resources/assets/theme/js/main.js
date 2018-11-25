$(document).ready(function($) {
  'use strict'

  /* ---------------------------------------------
         page  Prealoader
     --------------------------------------------- */
  // $(window).on('load', function() {
  //   $('#loading-center-page').fadeOut()
  //   $('#loading-page')
  //     .delay(400)
  //     .fadeOut('slow')
  // })

  /* ---------------------------------------------
        Sticky header
    --------------------------------------------- */
  $(window).on('scroll', function() {
    var scroll_top = $(window).scrollTop()

    if (scroll_top > 40) {
      $('.navbar').addClass('sticky')
    } else {
      $('.navbar').removeClass('sticky')
    }
  })

  /* ---------------------------------------------
         Pie chart
     --------------------------------------------- */

  $('.chart').easyPieChart({
    scaleColor: '#eaebfe',
    lineWidth: 10,

    barColor: '#7279f8',
    trackColor: '#eaebfe',
    size: 160,
    animate: 500
  })

  /* ---------------------------------------------
     owl caroussel
     --------------------------------------------- */

  $('.testimonial-caroussel').owlCarousel({
    loop: true,
    responsiveClass: true,
    nav: false,
    dots: true,
    margin: 12,
    autoplay: true,
    autoplayTimeout: 4000,
    smartSpeed: 500,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1200: {
        items: 1
      }
    }
  })

  $('.client-caroussel').owlCarousel({
    loop: true,
    responsiveClass: true,
    nav: false,
    dots: false,
    margin: 15,
    autoplay: true,
    autoplayTimeout: 4000,
    smartSpeed: 500,
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 5
      },
      1200: {
        items: 5
      }
    }
  })

  /*----------------------------------------------------*/
  /*  VIDEO POP PUP
    /*----------------------------------------------------*/

  $('.video-modal').magnificPopup({
    type: 'iframe',

    iframe: {
      patterns: {
        youtube: {
          index: 'youtube.com',
          src: 'https://www.youtube.com/embed/7e90gBu4pas'
        }
      }
    }
  })

  /* ---------------------------------------------
     Back top page scroll up
     --------------------------------------------- */

  // $.scrollUp({
  //     scrollText: '<i class="arrow_carrot-up"></i>',
  //     easingType: 'linear',
  //     scrollSpeed: 900,
  //     animation: 'fade'
  // });

  /* ---------------------------------------------
     WoW plugin
     --------------------------------------------- */

  new WOW().init({
    mobile: true
  })

  /* ---------------------------------------------
     Smooth scroll
     --------------------------------------------- */

  $('a.section-scroll[href*="#"]:not([href="#"])').on('click', function(event) {
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
            scrollTop: target.offset().top
          },
          750
        )
        return false
      }
    }
  })

  /*----------------------------------------
     Newsletter Subscribe
     --------------------------------------*/

  $('.subscribe-mail').ajaxChimp({
    callback: mailchimpCallRep,
    url: 'mailchimp-post-url' //Replace this with your own mailchimp post URL. Just paste the url inside "".
  })

  function mailchimpCallRep(resp) {
    if (resp.result === 'success') {
      $('.sucess-message')
        .html(resp.msg)
        .fadeIn(1000)
      $('.error-message').fadeOut(500)
    } else if (resp.result === 'error') {
      $('.error-message')
        .html(resp.msg)
        .fadeIn(1000)
    }
  }
})
