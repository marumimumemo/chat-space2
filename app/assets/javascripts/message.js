$(function(){
  function buildHTML(message){
    var img = message.image ? `<img src="${ message.image }" class='message__image'>`: ""
    var html = `<div class="main-contents__messages__box" data-id=${ message.id }>
                  <h4 class="name">
                    ${ message.name }
                  </h4>
                  <p class="date">
                    ${ message.date }
                  </p>
                  <p class="message__content">
                    ${ message.content }
                  </p>
                    ${ img }
               </div>`
    return html;
  }

  function scroll() {
  $('.main-contents__messages').animate({scrollTop: $('.main-contents__messages')[0].scrollHeight}, 'fast');
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
      scroll();
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  })

  $(function(){
    setInterval(update, 5000);
  });

  function update(){
    var message_id = $('.main-contents__messages__box:last').data('id');
    $.ajax({
      url: location.href,
      type: 'GET',
      data: { id: message_id },
      dataType: 'json'
    })
    .always(function(messages){
      messages.forEach(function(message){
        var html = buildHTML(message);
      });
      $('.main-contents__messages').append(html);
      scroll();
    });
  }
});
