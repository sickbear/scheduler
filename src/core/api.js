export async function getData(url) {
  const response = await fetch(url);
  
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    throw new Error(`HTTP ошибка! Статус: ${response.status}`);
  }
}