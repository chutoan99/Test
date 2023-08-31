export interface Category {
  catid: number
  display_name: string
  parent_catid: number
  name: string
  image: string
  unselected_image: string
  selected_image: string
  level: number
  createdAt: Date
  updatedAt: Date
}
