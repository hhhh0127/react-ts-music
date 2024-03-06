/* 将获取的数据进行整理 */
export function handleSongsCategory(data: any) {
  // 1.获取所有的类别（"0": "语种", "1": "风格", "2": "场景", "3": "情感", "4": "主题"）
  const category = data.categories

  // 2.创建类别数据结构 categoryData [{name, subs}] item => [key, value] 数据解构
  // Object.entries(category)返回数组 [[key, value], [key, value]]
  // 注意：定义的时候要加上类型限制（很容易忽略然后出现报错）
  const categoryData: any[] = Object.values(category).map((value) => {
    return {
      name: value,
      subs: []
    }
  })
  // data.sub中的是不同的类别（细分的）
  // item.category 就是细分类别对应的大类别下标
  for (const item of data.sub) {
    categoryData[item.category].subs.push(item)
  }
  return categoryData
}
