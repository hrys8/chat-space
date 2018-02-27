json.array! @search_users do |user|
  json.id user.id
  json.name user.name
end
