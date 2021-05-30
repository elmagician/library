/** @format */

import { AddToast } from '../stores/toast'

export class Fetch {
  private host: string

  constructor(host: string = 'http://localhost:8080/') {
    this.host = host
  }

  Post = (endpoint: string, stringed: string): Promise<Response> => {
    return fetch(this.host + endpoint, { method: 'POST', body: stringed }).then(checkFetchCreateStatus)
  }
  Put = (endpoint: string, stringed: string): Promise<Response> => {
    return fetch(this.host + endpoint, { method: 'PUT', body: stringed }).then(checkFetchStatus)
  }

  GetJSON = (endpoint: string): Promise<any> => {
    return fetch(this.host + endpoint)
      .then(checkFetchStatus)
      .then(r => r.json())
  }

  Delete = (endpoint: string): Promise<Response> => {
    return fetch(this.host + endpoint, { method: 'DELETE' }).then(checkFetchStatus)
  }
  Download = (endpoint: string, filename: string | undefined = undefined): Promise<void> => {
    return fetch(this.host + endpoint, { method: 'GET' })
      .then(checkFetchStatus)
      .then(rsp => rsp.blob())
      .then(data => {
        const newBlob = new Blob([data], { type: 'application/pdf' })

        // MS Edge and IE don't allow using a blob object directly as link href, instead it is necessary to use
        // msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob)
        } else {
          // For other browsers: create a link pointing to the ObjectURL containing the blob.
          const objUrl = window.URL.createObjectURL(newBlob)

          let link = document.createElement('a')
          link.href = objUrl
          if (filename !== undefined && filename !== null && filename !== '') {
            link.download = filename
          }
          link.target = '_blank'
          link.click()

          // For Firefox it is necessary to delay revoking the ObjectURL.
          setTimeout(() => {
            window.URL.revokeObjectURL(objUrl)
          }, 250)
        }

        AddToast('Downloaded ' + filename, false)
      })
      .catch(_ => AddToast('Could not download ' + filename, true))
  }
}

export const defaultFetch = new Fetch()

const checkFetchCreateStatus = (response: Response): Promise<Response> => {
  if ([201, 200].includes(response.status)) {
    return Promise.resolve(response)
  }
  return Promise.reject(new Error('status code ' + response.status + ' is not in expected ' + [201, 200]))
}

const checkFetchStatus = (response: Response): Promise<Response> => {
  if (200 === response.status) {
    return Promise.resolve(response)
  }
  return Promise.reject(new Error('status code ' + response.status + ' is not in expected 200'))
}
