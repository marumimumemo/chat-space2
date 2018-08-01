  json.content @message.content
  json.name @message.user.name
  json.image @message.image
  json.date @message.created_at.to_s(:datetime)
