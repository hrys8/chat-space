$(function(){
  function buildHTML(message){
    var image = (message.image_url == null) ? "" : `<img src="${message.image_url}">`
    var html = `<div class='message' data-message-id=${message.id}>
                  <div class='message__upper'>
                    <div class='message__upper_user-name'>
                      <p>${message.user}</p>
                    </div>
                    <div class='message__upper_time-at'>
                      <p>${message.created_at}</p>
                    </div>
                  </div>
                  <div class='message__lower'>
                    <p class='message__lower_text'>
                      ${message.content}
                    </p>
                    <div class='lower-message__image'>
                      ${image}
                    </div>
                  </div>
                </div>`
    return html;
  }

  function pageRESET(){
    $('.form__message').val('');
    $('.hidden').val('');
    $('.form__submit').prop('disabled', false);
  };

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
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 500, 'swing');
      pageRESET()
    })
    .fail(function(){
      alert('error');
      pageRESET()
    });
  });

  var interval = setInterval(function() {
    if (location.href.match(/\/groups\/[\d]{1,}\/messages/)){
      var message_id = $('.messages').children('.message').last().data('message-id');
      $.ajax({
        url: location.href,
        type: 'GET',
        data: {id: message_id},
        dataType: 'json'
      })
      .done(function(data) {
        data.forEach(function(message) {
          var html = buildHTML(message);
          $('.messages').append(html);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 500, 'swing');
        })
      })
      .fail(function(){
        alert('自動更新に失敗しました');
      });
    }
    else{
      clearInterval(interval);
      }
  }, 5000);
});
