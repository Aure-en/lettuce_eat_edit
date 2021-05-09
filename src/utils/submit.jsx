const submit = async (url, fields) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  const json = await res.json();
  return json;
};

export default submit;
