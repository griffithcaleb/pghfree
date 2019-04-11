//pagination tutorial found on youTube https://www.youtube.com/watch?v=Xznn-ggD0GU credit goes to David Acosta


$(() => {
  let numberOfItems = $('#eventContainer .event').length
  let limitPerPage = 10;
  $('#eventContainer .event:gt(' + (limitPerPage - 1) + ')').hide()

  let totalPages = Math.round(numberOfItems / limitPerPage)

  $('.pagination').append("<li class='page-item active' id = 'current-page'><a class='page-link' href='#'>" + 1 + "</a></li>")

  for (let i = 2; i <= totalPages; i++) {
    $('.pagination').append("<li class='page-item' id = 'current-page'><a class='page-link' href='#'>" + i + "</a></li>")
  }


  $('.pagination').append("<li id= 'next-page'><a class='page-link' href='#'>Next</a></li>");

  // alert(totalPages)

  $('.pagination li.page-item').click(function(event) {
    if ($(this).hasClass('active')) {
      return false;
    } else {
      let currentPage = $(this).index()
      $('.pagination li').removeClass('active');
      $(this).addClass('active')
      $("#eventContainer .event").hide()

      let grandTotal = limitPerPage * currentPage;

      for (let i = grandTotal - limitPerPage; i < grandTotal; i++) {
        $("#eventContainer .event:eq(" + i + ")").show()
      }
    }
  });

  //next button
  $("#next-page").on("click", function(event) {
    let currentPage = $(".pagination li.active").index();
    if (currentPage === totalPages) {
      return false;
    } else {

      currentPage++;

      $(".pagination li").removeClass('active');
      $("#eventContainer .event").hide();
      let total = limitPerPage * currentPage;

      for (let i = total - limitPerPage; i < total; i++) {
        $("#eventContainer .event:eq(" + i + ")").show()

      }
      $(".pagination li.page-item:eq(" + (currentPage) + ")").addClass('active');

    }
  })
  //previous button needs work
  $('#previous-page').on('click', () => {

  })
})
