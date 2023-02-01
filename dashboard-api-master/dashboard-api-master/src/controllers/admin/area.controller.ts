import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { areaService } from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
} from '../../util/apiResponse'

// Get list of all Regions
export const getAllRegions = async (req: Request, res: Response) => {
  try {
    const regionsData = await areaService.getAllArea({
      where: {
        ar_status: true,
        ar_type: 'region',
      },
      order: [['ar_id', 'ASC']],
    })

    const regions = regionsData.map((region) => {
      return {
        ar_id: region.ar_id,
        ar_region: region.ar_title,
      }
    })
    return successResponse(res, {
      message: 'Regions List',
      data: {
        regions,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get list of all Regions - Districts
export const getAllDistrict = async (req: Request, res: Response) => {
  try {
    const regionsData = await areaService.getAllArea({
      where: { ar_status: true, ar_type: 'region' },
      attributes: ['ar_id', 'ar_title'],
    })

    const regionIdArray = regionsData.map((region) => region.ar_id)

    // get all district
    const districtData = await areaService.getAllArea({
      where: {
        ar_status: true,
        ar_type: 'district',
        ar_parentId: { [Op.in]: regionIdArray },
      },
      order: [['ar_title', 'ASC']],
    })

    let districts: any = []
    regionsData.forEach((region) => {
      let regionObject = {
        regionId: region.ar_id,
        regionTitle: region.ar_title,
        district: [],
      }
      let districtList: any = []
      districtData.forEach((district) => {
        if (region.ar_id === district.ar_parentId) {
          districtList.push({
            districtId: district.ar_id,
            districtTitle: district.ar_title,
          })
        }
      })
      regionObject.district = districtList
      districts.push(regionObject)
    })

    return successResponse(res, {
      message: 'Districts List1',
      data: {
        districts,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get list of all Regions - Districts - Circuits
export const getAllCircuit = async (req: Request, res: Response) => {
  try {
    const regionsData = await areaService.getAllArea({
      where: { ar_status: true, ar_type: 'region' },
      attributes: ['ar_id', 'ar_title'],
    })

    const regionIdArray = regionsData.map((region) => region.ar_id)

    // get all district
    const districtData = await areaService.getAllArea({
      where: {
        ar_status: true,
        ar_type: 'district',
        ar_parentId: { [Op.in]: regionIdArray },
      },
      order: [['ar_title', 'ASC']],
    })

    const districtIdArray = districtData.map((district) => district.ar_id)

    // get all circuit
    const circuitData = await areaService.getAllArea({
      where: {
        ar_status: true,
        ar_type: 'circuit',
        ar_parentId: { [Op.in]: districtIdArray },
      },
      order: [['ar_title', 'ASC']],
    })

    let circuits: any = []
    regionsData.forEach((region) => {
      let regionObject = {
        regionId: region.ar_id,
        regionTitle: region.ar_title,
        district: [],
      }
      let districtList: any = []
      districtData.forEach((district) => {
        if (region.ar_id === district.ar_parentId) {
          let circuitList: any = []
          circuitData.forEach((circuit) => {
            if (district.ar_id === circuit.ar_parentId) {
              circuitList.push({
                circuitId: circuit.ar_id,
                circuitTitle: circuit.ar_title,
              })
            }
          })
          districtList.push({
            districtId: district.ar_id,
            districtTitle: district.ar_title,
            circuit: circuitList,
          })
        }
      })
      regionObject.district = districtList
      circuits.push(regionObject)
    })

    return successResponse(res, {
      message: 'Circuits List',
      data: {
        circuits,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

export const createArea = async (req: Request, res: Response) => {
  try {
    const body = req.body

    await areaService.createArea(body)

    return successResponse(res, {
      message: `${body.ar_type} added Successfully`,
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete Area
export const deleteArea = async (req: Request, res: Response) => {
  try {
    const { ar_id } = req.params
    await areaService.deleteArea({
      where: {
        ar_id,
      },
    })

    return successResponse(res, {
      message: `Area deleted Successfully`,
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
