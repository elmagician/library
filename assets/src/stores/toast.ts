/** @format */

import { Writable, writable } from 'svelte/store'
import { Toast } from '../types/toast'

export const toasts: Writable<Toast[]> = writable([]) as Writable<Toast[]>
const TOAST_TIMEOUT_MS: number = 3000

export const AddToast = (message: string, error: boolean = false) => {
  const arr = GetStoredToast()
  const toast = new Toast(message, error)

  arr.push(toast)
  setTimeout(() => RemoveToast(toast), TOAST_TIMEOUT_MS)
  toasts.update(() => arr)
}

export const RemoveToast = (toast: Toast) => {
  const arr = GetStoredToast()
  const index = arr.indexOf(toast)

  if (index > -1) {
    arr.splice(index, 1)
  }

  toasts.update(() => arr)
}

const GetStoredToast = (): Toast[] => {
  let t = []
  toasts.subscribe(value => {
    t = value
  })()
  return t
}
