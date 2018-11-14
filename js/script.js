$(document).ready(() => {
  // LANGUAGES
  $("p:contains('Russian')")
    .prevAll()
    .attr('lang', 'ro');
  $("p:contains('Russian')")
    .nextAll()
    .attr('lang', 'ru');
  $("p:contains('Russian')").hide();
  $('[lang="ru"]').hide();

  $('.russian').click(e => {
    const $this = $(e.currentTarget);
    const activeLang = $('.js-lang');
    activeLang.removeClass('active');
    $this.removeClass('active');
    $this.addClass('active');
    $('[lang="ru"]').show();
    $('[lang="ro"]').hide();
    $.removeCookie('lang');
    $.cookie('lang', 'ru', { expires: 365, path: '/' });
  });

  $('.romanian').click(e => {
    const $this = $(e.currentTarget);
    const activeLang = $('.js-lang');
    activeLang.removeClass('active');
    $this.addClass('active');
    $('[lang="ru"]').hide();
    $('[lang="ro"]').show();
    $.removeCookie('lang');
    $.cookie('lang', 'ro', { expires: 365, path: '/' });
  });

  const lang = $.cookie('lang');
  if (lang === 'ro') {
    $('[lang="ru"]').hide();
    $('[lang="ro"]').show();
  } else {
    $('[lang="ru"]').show();
    $('[lang="ro"]').hide();
  }
});

