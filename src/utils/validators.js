// 👉 IsEmpty
export const isEmpty = (value) => {
  if (value === null || value === undefined || value === '') return true

  return !!(Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value) => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = (arr) => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = (obj) =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)

// 👉 Required Validator
export const requiredValidator = (value) => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return 'This field is required'

  return !!String(value).trim().length || 'This field is required'
}

// 👉 Email Validator
export const emailValidator = (value) => {
  if (isEmpty(value)) return true

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (Array.isArray(value))
    return (
      value.every((val) => re.test(String(val))) || 'The Email field must be a valid email address'
    )

  return re.test(String(value)) || 'The Email field must be a valid email address'
}

// 👉 Password Validator
export const passwordValidator = (password) => {
  const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_])[A-Za-z\d-_]{8,}$/
  const validPassword = regExp.test(password)

  return (
    validPassword ||
    'The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one of the following special characters: - or _.'
  )
}

// 👉 Confirm Password Validator
export const confirmedValidator = (value, target) =>
  value === target || 'The Confirm Password field confirmation does not match'

// 👉 Between Validator
export const betweenValidator = (value, min, max) => {
  const valueAsNumber = Number(value)

  return (
    (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) ||
    `Enter number between ${min} and ${max}`
  )
}

export const integerValidator = (value) => {
  if (isEmpty(value)) return true

  if (Array.isArray(value))
    return value.every((val) => /^-?[0-9]+$/.test(String(val))) || 'This field must be a number'

  return /^-?[0-9]+$/.test(String(value)) || 'This field must be a number'
}

export const regexValidator = (value, regex) => {
  if (isEmpty(value)) return true

  let regeX = regex
  if (typeof regeX === 'string') regeX = new RegExp(regeX)

  if (Array.isArray(value)) return value.every((val) => regexValidator(val, regeX))

  return regeX.test(String(value)) || "The input doesn't match the expected format"
}

export const alphaValidator = (value) => {
  if (isEmpty(value)) return true

  return /^[A-Z]*$/i.test(String(value)) || 'The Alpha field may only contain alphabetic characters'
}

export const urlValidator = (value) => {
  if (isEmpty(value)) return true

  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}[.]{0,1}/

  return re.test(String(value)) || 'URL is invalid'
}

export const lengthValidator = (value, length) => {
  if (isEmpty(value)) return true

  return (
    String(value).length >= length ||
    `The Min Character field must be at least ${length} characters`
  )
}

// 👉 Alpha-dash Validator
export const alphaDashValidator = (value) => {
  if (isEmpty(value)) return true

  const valueAsString = String(value)

  return (
    /^[0-9A-Z_-]*$/i.test(valueAsString) ||
    'The input must be alphanumeric and can only include dashes (-) and underscores (_).'
  )
}

// 👉 Image Validator
export const imageValidator = (value) => {
  if (isEmpty(value)) return true

  return !value || !value.length || value[0].size < 2000000 || 'Image size should be less than 2 MB'
}
// 👉 Phone Number Validator
export const phoneNumberValidator = (value) => {
  if (isEmpty(value)) return true

  const re = /^(639|09)\d{9}$/

  return (
    re.test(String(value).replace(/\s/g, '')) ||
    'The phone number must be in the format 639xxxxxxxxx or 09xxxxxxxxx'
  )
}
