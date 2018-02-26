$(function(){
  function buildHTML(message){
    var image = (message.image_url == null) ? "" : `<img src="${message.image_url}">`
    var html = `<div class='message'>
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
  $('#form_message').on('submit', function(e){
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
      $('.form__message').val('');
      $('.hidden').val('');
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 500, 'swing');
    })
    .fail(function(){
    alert('error');
    });
  });
});
