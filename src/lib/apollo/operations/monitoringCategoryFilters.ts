import { filter, pipe } from 'ramda'
import { MonitoringCategory, MonitoringCategoryFormat } from 'types'
import { hasData, includeString } from 'utils'
import { monitoringCategoryVar } from '../variables'

const defaultFilters: MonitoringCategoryFormat = {
  search: {
    key: 'nombre',
    value: '',
  },
  state: '',
}

export const setFilters = (data: MonitoringCategory[]) => {
  const { filters } = monitoringCategoryVar()

  const currentFilters = hasData(filters) ? filters : defaultFilters

  applyFilters(currentFilters, data)
}

export const updateFiltersSearchKey = (key: string) => {
  const { filters, data } = monitoringCategoryVar()
  const { search } = filters
  const newFilters = { ...filters, search: { ...search, key } }

  applyFilters(newFilters, data)
}

export const updateFiltersSearchValue = (value: string) => {
  const { filters, data } = monitoringCategoryVar()
  const { search } = filters
  const newFilters = { ...filters, search: { ...search, value } }

  applyFilters(newFilters, data)
}

export const updateFiltersState = (state: string) => {
  const { filters, data } = monitoringCategoryVar()
  const newFilters = { ...filters, state }

  applyFilters(newFilters, data)
}

const applyFilters = (
  filters: MonitoringCategoryFormat,
  data: MonitoringCategory[],
): void => {
  const newData: any = pipe(
    filterByState(filters),
    filterBySearch(filters),
  )(data)
  monitoringCategoryVar({ data, result: newData, filters })
}

const filterBySearch =
  (filters: MonitoringCategoryFormat) =>
  (data: MonitoringCategory[]): MonitoringCategory[] => {
    const { search } = filters
    if (!hasData(data)) {
      return []
    }

    if (!search.value) {
      return data
    }

    return filter(
      (ele) =>
        includeString(
          ele[search.key as keyof MonitoringCategory] as string,
          search.value,
        ),
      data,
    )
  }

const filterByState =
  (filters: MonitoringCategoryFormat) =>
  (data: MonitoringCategory[]): MonitoringCategory[] => {
    const { state } = filters
    if (!hasData(data)) {
      return []
    }

    if (!state) {
      return data
    }

    const monitoringCategoryState = state === 'active' ? 1 : 0

    return filter((ele) => ele.activo === monitoringCategoryState, data)
  }
