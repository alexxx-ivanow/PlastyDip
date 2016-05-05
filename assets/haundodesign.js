(function ($) {
  function addAffix() {
    var $sidebar = $('.sidebar'),
    position = $sidebar.position();
    offset = $sidebar.offset();

    if($sidebar.length) {
      $sidebar.affix({
        offset: {
          top: position.top - 24
        }
      });

      if($('.affix').length) {
        $sidebar.css('left', position.left);
      }else{
        $(document).on('affixed.bs.affix', function() {
          $sidebar.css('left', position.left);
        });
      }
    }    
  }

  function addScrollspy() {
    $('body').scrollspy({ target: '.sidebar' });
  }


  function backToTop() {
    $('.to-top').find('a').click(function(event) {
      event.preventDefault();

      $('html, body').animate({scrollTop: 0}, 300);
      return false;
    });
  }

  function collapseNavbar() {
    $('.navbar-toggle').click(function() {
      $(this).parent().toggleClass('nav-expanded');
    });
  }

  function delayAnimations() {
    var delay = 0,
        step  = 400;

    $('.animated').each(function() {
      $(this).css({
        '-webkit-animation-delay': delay + 'ms',
        'animation-delay': delay + 'ms'
      });
      delay+=step;
    });
  }

  function imageHoverTouch() {
    $('figure')
    .mouseenter(function() {
      $(this).addClass('hover');
    })
    .mouseleave(function() {
      $(this).removeClass('hover');
    });
  }

  function submitContactForm() {
    $('#contact').submit(function(event) {
      var form = $(this),
          btn = form.find(':submit'),
          btn_init_val = btn.val();

      btn.val('Sending...').prop('disabled', true);

      $.ajax({
        url: form.attr('action'),
        type: form.attr('method'),
        data: form.serialize(),
        success: function(data, status) {
          response = getContactFormResponse(data, status);
          $(response).insertBefore(form).hide().fadeIn(300);
          form.trigger('reset').hide();
        },
        error: function(xhr, status, error) {
          response = getContactFormResponse(xhr.responseText, status);
          $(response).insertBefore(form).hide().fadeIn(300);
        },
        complete: function(xhr, status) {
          btn.val(btn_init_val).prop('disabled', false);
        }
      });

      event.preventDefault();
    });
  }

  function getContactFormResponse(msg, status) {
    $('.alert').fadeOut(300).remove();

    if(status == 'success') {
      response = '<section class="alert"><h3>Thank you!</h3><p>' + msg + '</p><a href="/" class="btn btn-primary">Home</a></section>';
    }else{
      response = '<section class="alert"><h3>Oops!</h3><p>' + msg + '</p></section>';
    }

    return response;
  }

  function getCurrentYear() {
    var now = new Date();

    $('.year').html(now.getFullYear());
  }

  function googleAnalytics() {
   
  }

  $(document).ready(function() {
    addAffix();
    addScrollspy();
    backToTop();
    collapseNavbar();
    delayAnimations();
    getCurrentYear();
    googleAnalytics();
    imageHoverTouch();
    submitContactForm();
  });
})( jQuery );