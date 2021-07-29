const pixabayKey = process.env.PIXABAY_KEY;

export const requestImages = async (query) => {
  const url = 'https://pixabay.com/api/?key=${pixabayKey}&q=${query}&image_type=photo&pretty=true';
  try {
    const response = await fetch(url);
    return await response.json();
  } catch(error) {
    console.error(error);
  }
};
