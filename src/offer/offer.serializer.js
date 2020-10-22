exports.serialize = ({
  store,
  key,
  name,
  price,
  status,
  url,
  createdAt,
  updatedAt,
}) => ({
  store,
  key,
  name,
  price,
  status,
  url,
  created_at: createdAt,
  updated_at: updatedAt,
})
