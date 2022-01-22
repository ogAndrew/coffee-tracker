export const getAllCoffee = async () => {
  const res = await fetch('/api');
  const data = await res.json();
  return data;
}

export const getCoffee = async (id) => {
  const res = await fetch(`/api/${id}`)
  const data = await res.json();
  return data;
}

export const addCoffee = async (body) => {
  const res = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}

export const updateCoffee = async (id) => {

}

export const removeCoffee = async (id) => {
  const res = await fetch(`/api/${id}`, {
    method: 'DELETE',
    header: {
      'Content-Type': 'application/json'
    }
  })
  console.log(res);
  return res;
}

