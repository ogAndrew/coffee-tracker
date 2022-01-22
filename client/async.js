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

}

export const updateCoffee = async (id) => {

}

export const removeCoffee = async (id) => {
  
}

