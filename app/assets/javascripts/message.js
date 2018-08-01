$(function(){
  function buildHTML(message){
    var html = `<div class="main-contents__messages__box">
                  <h4 class="name">
                    ${ message.name }
                  </h4>
                  <p class="date">
                    ${ message.date }
                  </p>
                  <p class="message__content">
                    ${ message.content }
                  </p>
                    ${ message.image ? `<img src="${ message.image }" class='message__image'>`: "" }
               </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.main-contents__messages').append(html);
      $('.main-contents__messages').animate({scrollTop: $('.main-contents__messages')[0].scrollHeight}, 'fast');
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  })
});