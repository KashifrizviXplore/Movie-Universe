
export async function getMoviesApi(page = 1) {
  try {
    const response = await fetch(`https://yts.mx/api/v2/list_movies.json?page=${page}`)
    const data = await response.json()
    return data.data
  } catch (error) {
    console.error("Error fetching movies:", error)
  }
}
export async function getMovieDetail(id) {
  try {
    const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`)
    const data = await response.json()
    console.log(data)
    return data.data
  } catch (error) {
    console.error("Error fetching movies:", error)
  }
}

export async function getSimilarMovie(id) {
  try {
    const response = await fetch(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${id}`)
    const data = await response.json()
    console.log(data)
    return data.data
  } catch (error) {
    console.error("Error fetching movies:", error)
  }
}