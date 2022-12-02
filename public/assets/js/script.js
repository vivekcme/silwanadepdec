$('.signup').click(function(){
  $('#loginModal').hide();
});



// 

$('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  dots: false,
  asNavFor: '.slider-nav'
});


$('.slider-nav').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.slider-for',
  dots: false,
  center:true,
  focusOnSelect: true
});






// 

$('.hotel-detail-slider').slick({
  autoplay: true,
  arrows: true,
  dots: false,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: 'linear'
});
			




$(document).ready(function() {
  $('.general-acc .acc.the_active .acc-head').addClass('active');
  $('.general-acc .acc.the_active .acc-content').slideDown();
  $('.general-acc .acc-head').on('click', function() {
      if($(this).hasClass('active')) {
        $(this).siblings('.acc-content').slideUp();
        $(this).removeClass('active');
      }
      else {
        $('.acc-content').slideUp();
        $('.acc-head').removeClass('active');
        $(this).siblings('.acc-content').slideToggle();
        $(this).toggleClass('active');
      }
  });     
});


// 

const navBtn = document.querySelector(".nav-btn");
const closeBtn = document.querySelector(".close-btn");
const nav = document.querySelector(".navigation");
const header = document.querySelector(".header");

// open navigation when menu button is clicked
navBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  nav.classList.add("navigation-active");

  // close navigation when clicked off
  document.addEventListener("click", (e) => {
    if (e.target != nav) {
      nav.classList.remove("navigation-active");
    }
  });
});

// close navigation when x is clicked
closeBtn.addEventListener("click", () => {
  nav.classList.remove("navigation-active");
});





// table

(function() {
  var tableHeaders = document.getElementsByClassName("c-table__header");
  var tableCells = document.getElementsByClassName("c-table__cell");
  var span = document.createElement("span");

  for (var i = 0; i < tableCells.length; i++) {
    span = document.createElement("span");
    span.classList.add("c-table__label");
    tableCells[i].prepend(span);
  }

  var tableLabels = tableHeaders[0].getElementsByClassName("c-table__col-label");
  var spanMod = document.getElementsByClassName("c-table__label");

  for (var i = 0; i < tableLabels.length; i++) {
    for (var a = 0; a < tableCells.length; a++) {
      spanMod[a].innerHTML = tableLabels[i].innerHTML;
    }
  }

  var b = tableLabels.length;
  for (var a = 0; a < tableCells.length; a++) {
    spanMod[a].innerHTML = tableLabels[a%b].innerHTML;
  }
})();




// function incrementValue(e) {
//   e.preventDefault();
//   var fieldName = $(e.target).data('field');
//   var parent = $(e.target).closest('div');
//   var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);

//   if (!isNaN(currentVal)) {
//       parent.find('input[name=' + fieldName + ']').val(currentVal + 1);
//   } else {
//       parent.find('input[name=' + fieldName + ']').val(0);
//   }
// }

// function decrementValue(e) {
//   e.preventDefault();
//   var fieldName = $(e.target).data('field');
//   var parent = $(e.target).closest('div');
//   var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);

//   if (!isNaN(currentVal) && currentVal > 0) {
//       parent.find('input[name=' + fieldName + ']').val(currentVal - 1);
//   } else {
//       parent.find('input[name=' + fieldName + ']').val(0);
//   }
// }

// $('.input-group').on('click', '.button-plus', function(e) {
//   incrementValue(e);
// });

// $('.input-group').on('click', '.button-minus', function(e) {
//   decrementValue(e);
// });






