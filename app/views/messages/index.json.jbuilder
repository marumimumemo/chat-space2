  json.array! @new_message do |message|
  	json.name    message.user.name
  	json.date    message.created_at.to_s(:datetime)
    json.content message.content
    json.image   message.image.url
    json.id      message.id
  end
