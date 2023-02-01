import { Request, Response } from 'express'
import { where } from 'sequelize'
import { Op } from 'sequelize'
import { areaService, schoolService } from '../../db/services'
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
      message: 'Districts List',
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
    const { region, district, circuit }: any = req.query

    let regiQuery = {}
    let disQuery = {}
    let cirQuery = {}

    let regionFilter: any = {}
    let districtFilter: any = {}
    let circuitFilter: any = {}

    region
      ? ((regionFilter.ar_title = region),
        (regionFilter.ar_status = true),
        (regionFilter.ar_type = 'region'))
      : ''

    regiQuery = {
      ...regiQuery,
      [Op.and]: regionFilter,
    }

    const regionsData = await areaService.getAllArea({
      where: regiQuery,
      attributes: ['ar_id', 'ar_title'],
    })

    const regionIdArray = regionsData.map((region) => region.ar_id)

    district
      ? ((districtFilter.ar_title = district),
        (districtFilter.ar_status = true),
        (districtFilter.ar_type = 'district'),
        (districtFilter.ar_parentId = regionIdArray))
      : ''

    disQuery = {
      ...disQuery,
      [Op.and]: districtFilter,
    }

    // get all district
    const districtData = await areaService.getAllArea({
      where: disQuery,
      order: [['ar_title', 'ASC']],
    })

    const districtIdArray = districtData.map((district) => district.ar_id)

    circuit
      ? ((circuitFilter.ar_title = circuit),
        (circuitFilter.ar_status = true),
        (circuitFilter.ar_type = 'circuit'),
        (circuitFilter.ar_parentId = districtIdArray))
      : ''

    cirQuery = {
      ...cirQuery,
      [Op.and]: circuitFilter,
    }

    // get all circuit
    const circuitData = await areaService.getAllArea({
      where: cirQuery,
      order: [['ar_title', 'ASC']],
    })

    let circuits: any = []

    for (let index = 0; index < regionsData.length; index++) {
      let region = regionsData[index]
      let regionObject = {
        regionId: region.ar_id,
        regionTitle: region.ar_title,
        district: [],
      }
      let districtList: any = []

      for (let j = 0; j < districtData.length; j++) {
        let district = districtData[j]
        if (region.ar_id === district.ar_parentId) {
          let circuitList: any = []
          for (let k = 0; k < circuitData.length; k++) {
            let circuit = circuitData[k]
            if (district.ar_id === circuit.ar_parentId) {
              const schoolCount = await schoolService.countSchool({
                where: { sc_circuit: circuit.ar_title },
              })
              circuitList.push({
                circuitId: circuit.ar_id,
                circuitTitle: circuit.ar_title,
                totalSchool: schoolCount,
              })
            }
          }
          districtList.push({
            districtId: district.ar_id,
            districtTitle: district.ar_title,
            circuit: circuitList,
          })
        }
      }
      regionObject.district = districtList
      circuits.push(regionObject)
    }

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
