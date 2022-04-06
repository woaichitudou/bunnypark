import { parse } from 'querystringify'

const useQueryString = () => parse(window.location.search) as Record<string, string>

export default useQueryString
