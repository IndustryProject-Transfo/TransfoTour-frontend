export default interface BuildingArray {
  [building: string]: BuildingData[]
}

export interface BuildingData {
  time: string
  unit: string
  value: number | undefined
}

export interface BuildingPieChartData {
  labels: string[]
  values: number[]
}

export interface PowerData {
  label: string
  data: number
}
