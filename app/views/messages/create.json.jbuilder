json.id         @message.id
json.user       @message.user.name
json.created_at @message.created_at.strftime('%Y/%m/%d %T')
json.content    @message.content
json.image_url  @message.image.url
