const submit = async (url, fields, method = "POST") => {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  let result = await res.text();

  try {
    result = JSON.parse(result);
  } catch {
    return result;
  }
  return result;
};

export default submit;
