import axios from '@/libs/axios'

const makeRequest = (method, url, data = null) => {
  return new Promise((resolve, reject) => {
    const options = {}
    let params

    if (method === 'delete') {
      params = [options]
    } else {
      params = [data, options]
    }

    axios[method](url, ...params)
      .then(response => resolve(response.data))
      .catch(error => {
        reject(error)
        throw error
      })
  })
}

export function GET(url, data) {
  return makeRequest('get', url, data)
}

export function POST(url, data) {
  return makeRequest('post', url, data)
}

export function PUT(url, data) {
  return makeRequest('put', url, data)
}

export function PATCH(url, data) {
  return makeRequest('patch', url, data)
}

export function DELETE(url) {
  return makeRequest('delete', url)
}

export default {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE
}
