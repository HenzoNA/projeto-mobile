import api from "../api";

export async function getById(id) {
  const response = await api.get(`/episode/${id}`);

  return response.data;
}

export async function getAllByPage(page) {
  const response = await api.get("/episode", {
    params: {
      page
    }
  });

  return {
    result: response.data.results,
    pages: response.data.info.pages,
  };
}

export async function getMultipleById(ids) {
  const response = await api.get(`/episode/${ids.join(",")}`);

  if (!Array.isArray(response.data)) {
    response.data = [ response.data ];
  }

  return {
    result: response.data
  };
}

export async function getByUrlList(urls) {
  const ids = urls.map(url => url.match(/(?<=\/)[\d]+$/g)[0]);

  return await getMultipleById(ids);
}