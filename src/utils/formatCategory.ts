import { Category } from '~/api/client/categoryTree/index.type';

export const formatCategory = (categoryTreeList: Category[]): any[] => {
  const categoryTreeArray = []
  const lastIdx = categoryTreeList.length - 1

  for (let i = 0; i < lastIdx; i += 2) {
    const obj1 = {
      image: categoryTreeList[i]?.image,
      catid: categoryTreeList[i]?.catid,
      name: categoryTreeList[i]?.name,
      display_name: categoryTreeList[i]?.display_name,
      unselected_image: categoryTreeList[i]?.unselected_image,
      selected_image: categoryTreeList[i]?.selected_image
    }

    const obj2 = {
      image: categoryTreeList[i + 1]?.image,
      catid: categoryTreeList[i + 1]?.catid,
      name: categoryTreeList[i + 1]?.name,
      display_name: categoryTreeList[i + 1]?.display_name,
      unselected_image: categoryTreeList[i + 1]?.unselected_image,
      selected_image: categoryTreeList[i + 1]?.selected_image
    }

    if (!isEmptyObject(obj1) || !isEmptyObject(obj2)) {
      categoryTreeArray.push([obj1, obj2])
    }
  }

  // If the last object is not empty, add it as a single item to the result array
  if (!isEmptyObject(categoryTreeList[lastIdx])) {
    categoryTreeArray.push([categoryTreeList[lastIdx]])
  }

  return categoryTreeArray
}

const isEmptyObject = (obj: any) => {
  return Object.keys(obj).length === 0
}
