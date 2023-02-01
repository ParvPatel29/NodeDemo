import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { contentCategoryService } from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
} from '../../util/apiResponse'

// create content category
export const createContentCategories = async (req: Request, res: Response) => {
  try {
    const body = req.body

    await contentCategoryService.createContentCategory(body)

    return successResponse(res, {
      message: `${body.cc_categoryName} added Successfully`,
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// get main category
export const getAllMainCategories = async (req: Request, res: Response) => {
  try {
    const mainCategoriesData =
      await contentCategoryService.getAllContentCategory({
        where: {
          cc_status: true,
          cc_categoryTag: 'mainCategory',
        },
        order: [['cc_id', 'ASC']],
      })

    const mainCategories = mainCategoriesData.map((mainCategory) => {
      const contentCategoryTypeName =
        mainCategory.cc_categoryType === 1 ? 'curriculum' : 'training program'
      return {
        cc_id: mainCategory.cc_id,
        cc_categoryType: mainCategory.cc_categoryType,
        cc_categoryTypeName: contentCategoryTypeName,
        cc_categoryTag: mainCategory.cc_categoryTag,
        cc_categoryName: mainCategory.cc_categoryName,
      }
    })
    return successResponse(res, {
      message: 'Main Categories List',
      data: {
        mainCategories,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// get all category
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const mainCategoriesData =
      await contentCategoryService.getAllContentCategory({
        where: { cc_status: true, cc_categoryTag: 'mainCategory' },
        attributes: ['cc_id', 'cc_categoryName', 'cc_categoryType'],
      })

    const mainCategoryIdArray = mainCategoriesData.map(
      (mainCategory) => mainCategory.cc_id,
    )

    // get all Category
    const categoryData = await contentCategoryService.getAllContentCategory({
      where: {
        cc_status: true,
        cc_categoryTag: 'category',
        cc_parentId: { [Op.in]: mainCategoryIdArray },
      },
    })

    let categories: any = []
    mainCategoriesData.forEach((mainCategory) => {
      const contentCategoryTypeName =
        mainCategory.cc_categoryType === 1 ? 'curriculum' : 'training program'
      let mainCategoryObj = {
        categoryId: mainCategory.cc_id,
        categoryType: mainCategory.cc_categoryType,
        categoryTypeName: contentCategoryTypeName,
        categoryName: mainCategory.cc_categoryName,
        category: [],
      }
      let CategoryList: any = []
      categoryData.forEach((category) => {
        if (mainCategory.cc_id === category.cc_parentId) {
          CategoryList.push({
            CategoryId: category.cc_id,
            CategoryName: category.cc_categoryName,
          })
        }
      })
      mainCategoryObj.category = CategoryList
      categories.push(mainCategoryObj)
    })

    return successResponse(res, {
      message: 'Categories List',
      data: {
        categories,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
// get all subCateogry
export const getAllSubCategories = async (req: Request, res: Response) => {
  try {
    const { cc_categoryType } = req.query

    // categoryType validation
    let where = {}
    if (cc_categoryType) {
      where = {
        cc_status: true,
        cc_categoryTag: 'mainCategory',
        cc_categoryType: cc_categoryType,
      }
    } else {
      where = {
        cc_status: true,
        cc_categoryTag: 'mainCategory',
      }
    }
    const mainCategoryData = await contentCategoryService.getAllContentCategory(
      {
        where,
        attributes: ['cc_id', 'cc_categoryName', 'cc_categoryType'],
      },
    )

    const mainCategoryIdArray = mainCategoryData.map(
      (mainCate) => mainCate.cc_id,
    )

    // get all category
    const categoryData = await contentCategoryService.getAllContentCategory({
      where: {
        cc_status: true,
        cc_categoryTag: 'category',
        cc_parentId: { [Op.in]: mainCategoryIdArray },
      },
      order: [['cc_categoryName', 'ASC']],
    })

    const categoryIdArray = categoryData.map((category) => category.cc_id)

    // get all subCategory
    const subCateData = await contentCategoryService.getAllContentCategory({
      where: {
        cc_status: true,
        cc_categoryTag: 'subCategory',
        cc_parentId: { [Op.in]: categoryIdArray },
      },
    })

    let subCategories: any = []
    mainCategoryData.forEach((mainCategory) => {
      const contentCategoryTypeName =
        mainCategory.cc_categoryType === 1 ? 'curriculum' : 'training program'
      let mainCategoryObj = {
        cc_id: mainCategory.cc_id,
        cc_categoryType: mainCategory.cc_categoryType,
        cc_categoryTypeName: contentCategoryTypeName,
        cc_categoryName: mainCategory.cc_categoryName,
        category: [],
      }
      let categoryList: any = []
      categoryData.forEach((category) => {
        if (mainCategory.cc_id === category.cc_parentId) {
          let subCategoryObj: any = []
          subCateData.forEach((subCategory) => {
            if (category.cc_id === subCategory.cc_parentId) {
              subCategoryObj.push({
                subCateId: subCategory.cc_id,
                subCateName: subCategory.cc_categoryName,
              })
            }
          })
          const contentCategoryTypeName =
            mainCategory.cc_categoryType === 1
              ? 'curriculum'
              : 'training program'
          categoryList.push({
            categoryId: category.cc_id,
            categoryTypeName: contentCategoryTypeName,
            categoryName: category.cc_categoryName,
            subCategory: subCategoryObj,
          })
        }
      })
      mainCategoryObj.category = categoryList
      subCategories.push(mainCategoryObj)
    })

    return successResponse(res, {
      message: 'Sub Categories List',
      data: {
        subCategories,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
//get all topics
// export const getAllTopics = async (req: Request, res: Response) => {
//   try {
//     const { cc_categoryType } = req.query

//     // categoryType validation
//     let where = {}
//     if (cc_categoryType) {
//       where = {
//         cc_status: true,
//         cc_categoryTag: 'mainCategory',
//         cc_categoryType: cc_categoryType,
//       }
//     } else {
//       where = {
//         cc_status: true,
//         cc_categoryTag: 'mainCategory',
//       }
//     }
//     const mainCategoryData = await contentCategoryService.getAllContentCategory(
//       {
//         where,
//         attributes: ['cc_id', 'cc_categoryName', 'cc_categoryType'],
//       },
//     )

//     const mainCategoryIdArray = mainCategoryData.map(
//       (mainCate) => mainCate.cc_id,
//     )

//     // get all category
//     const categoryData = await contentCategoryService.getAllContentCategory({
//       where: {
//         cc_status: true,
//         cc_categoryTag: 'category',
//         cc_parentId: { [Op.in]: mainCategoryIdArray },
//       },
//       order: [['cc_categoryName', 'ASC']],
//     })

//     const categoryIdArray = categoryData.map((category) => category.cc_id)

//     // get all subCategory
//     const subCateData = await contentCategoryService.getAllContentCategory({
//       where: {
//         cc_status: true,
//         cc_categoryTag: 'subCategory',
//         cc_parentId: { [Op.in]: categoryIdArray },
//       },
//     })

//     const subCategoryIdArray = subCateData.map(
//       (subCategory) => subCategory.cc_id,
//     )

//     const topicData = await contentCategoryService.getAllContentCategory({
//       where: {
//         cc_status: true,
//         cc_categoryTag: 'topic',
//         cc_parentId: { [Op.in]: subCategoryIdArray },
//       },
//     })

//     let topics: any = []
//     mainCategoryData.forEach((mainCategory) => {
//       const contentCategoryTypeName =
//         mainCategory.cc_categoryType === 1 ? 'curriculum' : 'training program'
//       let mainCategoryObj = {
//         cc_id: mainCategory.cc_id,
//         cc_categoryType: mainCategory.cc_categoryType,
//         cc_categoryTypeName: contentCategoryTypeName,
//         cc_categoryName: mainCategory.cc_categoryName,
//         category: [],
//       }
//       let categoryList: any = []
//       categoryData.forEach((category) => {
//         if (mainCategory.cc_id === category.cc_parentId) {
//           let subCategoryObj: any = []
//           subCateData.forEach((subCategory) => {
//             if (category.cc_id === subCategory.cc_parentId) {
//               subCategoryObj.push({
//                 subCateId: subCategory.cc_id,
//                 subCateName: subCategory.cc_categoryName,
//                 subCatType: mainCategory.cc_categoryType,
//                 subCatTypeName: contentCategoryTypeName,
//               })
//             }
//           })
//           const contentCategoryTypeName =
//             mainCategory.cc_categoryType === 1
//               ? 'curriculum'
//               : 'training program'
//           categoryList.push({
//             categoryId: category.cc_id,
//             categoryTypeName: contentCategoryTypeName,
//             categoryName: category.cc_categoryName,
//             subCategory: subCategoryObj,
//           })
//         }
//       })

//       let subCategoryList: any = []
//       subCateData.forEach((subCategory) => {
//         if (mainCategory.cc_id === subCategory.cc_parentId) {
//           let topicObj: any = []
//           topicData.forEach((topic) => {
//             if (subCategory.cc_id === topic.cc_parentId) {
//               topicObj.push({
//                 topicId: topic.cc_id,
//                 topicName: topic.cc_categoryName,
//               })
//             }
//           })
//           const contentCategoryTypeName =
//             mainCategory.cc_categoryType === 1
//               ? 'curriculum'
//               : 'training program'
//           subCategoryList.push({
//             categoryId: subCategory.cc_id,
//             categoryTypeName: contentCategoryTypeName,
//             categoryName: subCategory.cc_categoryName,
//             subCategory: topicObj,
//           })
//         }
//       })

//       mainCategoryObj.category = categoryList
//       // mainCategoryObj.subCategory = subCategoryList
//       topics.push(mainCategoryObj)
//     })

//     return successResponse(res, {
//       message: 'Topics List',
//       data: {
//         topics,
//       },
//     })
//   } catch (error: any) {
//     return internalServerErrorResponse(res, {
//       error: error,
//     })
//   }
// }

export const getAllTopics = async (req: Request, res: Response) => {
  try {
    const { cc_categoryType } = req.query

    // categoryType validation
    let where = {}
    if (cc_categoryType) {
      where = {
        cc_status: true,
        cc_categoryTag: 'mainCategory',
        cc_categoryType: cc_categoryType,
      }
    } else {
      where = {
        cc_status: true,
        cc_categoryTag: 'mainCategory',
      }
    }
    const mainCategoryData = await contentCategoryService.getAllContentCategory(
      {
        where,
        attributes: ['cc_id', 'cc_categoryName', 'cc_categoryType'],
      },
    )

    const mainCategoryIdArray = mainCategoryData.map(
      (mainCate) => mainCate.cc_id,
    )

    // get all category
    const categoryData = await contentCategoryService.getAllContentCategory({
      where: {
        cc_status: true,
        cc_categoryTag: 'category',
        cc_parentId: { [Op.in]: mainCategoryIdArray },
      },
      order: [['cc_categoryName', 'ASC']],
    })

    const categoryIdArray = categoryData.map((category) => category.cc_id)

    // get all subCategory
    const subCateData = await contentCategoryService.getAllContentCategory({
      where: {
        cc_status: true,
        cc_categoryTag: 'subCategory',
        cc_parentId: { [Op.in]: categoryIdArray },
      },
    })

    const subCategoryIdArray = subCateData.map(
      (subCategory) => subCategory.cc_id,
    )

    const topicData = await contentCategoryService.getAllContentCategory({
      where: {
        cc_status: true,
        cc_categoryTag: 'topic',
        cc_parentId: { [Op.in]: subCategoryIdArray },
      },
    })

    let topics: any = []
    mainCategoryData.forEach((mainCategory) => {
      const contentCategoryTypeName =
        mainCategory.cc_categoryType === 1 ? 'curriculum' : 'training program'
      let mainCategoryObj = {
        cc_id: mainCategory.cc_id,
        cc_categoryType: mainCategory.cc_categoryType,
        cc_categoryTypeName: contentCategoryTypeName,
        cc_categoryName: mainCategory.cc_categoryName,
        category: [],
      }
      let categoryList: any = []
      categoryData.forEach((category) => {
        if (mainCategory.cc_id === category.cc_parentId) {
          let subCategoryObj: any = []
          subCateData.forEach((subCategory) => {
            if (category.cc_id === subCategory.cc_parentId) {
              let topicObj: any = []
              topicData.forEach((topicMap) => {
                if (subCategory.cc_id === topicMap.cc_parentId) {
                  topicObj.push({
                    topicId: topicMap.cc_id,
                    topicName: topicMap.cc_categoryName,
                  })
                }
              })
              subCategoryObj.push({
                subCateId: subCategory.cc_id,
                subCateName: subCategory.cc_categoryName,
                topics: topicObj,
              })
            }
          })
          const contentCategoryTypeName =
            mainCategory.cc_categoryType === 1
              ? 'curriculum'
              : 'training program'
          categoryList.push({
            categoryId: category.cc_id,
            categoryTypeName: contentCategoryTypeName,
            categoryName: category.cc_categoryName,
            subCategory: subCategoryObj,
          })
        }
      })
      mainCategoryObj.category = categoryList
      topics.push(mainCategoryObj)
    })

    return successResponse(res, {
      message: 'Topics List',
      data: {
        topics,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// delete category
export const deleteCategories = async (req: Request, res: Response) => {
  try {
    const { cc_id } = req.params
    await contentCategoryService.deleteContentCategory({
      where: {
        cc_id,
      },
    })

    return successResponse(res, {
      message: `Category deleted Successfully`,
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
