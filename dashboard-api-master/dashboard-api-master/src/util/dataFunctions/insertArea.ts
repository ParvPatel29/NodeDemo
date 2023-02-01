import {
  createArea,
  getAllArea,
  getArea,
  createBulkArea,
} from '../../db/services/area.service'
import { successResponse } from '../apiResponse'
import { readJsonFile } from './convertCsvToJson'
import { Request, Response } from 'express'

export const insertArea = async (req: Request, res: Response) => {
  try {
    const areaList = await readJsonFile('rdc.csv')

    // get list of unique region
    const uniqueRegion = [...new Set(areaList.map((item: any) => item.Region))]

    // insert region if it doesn't exist
    for (let index = 0; index < uniqueRegion.length; index++) {
      const region: any = uniqueRegion[index]
      const isExist = await getArea({
        where: {
          ar_type: 'region',
          ar_title: region,
        },
      })

      if (!isExist) {
        const obj: any = {
          ar_title: region,
          ar_type: 'region',
        }
        await createArea(obj)
      }
    }

    // get list of unique district
    const uniqueDistrict = [
      ...new Set(areaList.map((item: any) => item.District)),
    ].filter((item) => item !== 'N/A')

    // Insert District
    const districtBulkObj: any[] = []
    for (let index = 0; index < uniqueDistrict.length; index++) {
      const district: any = uniqueDistrict[index]

      // check district exstence in db
      const isExist = await getArea({
        where: {
          ar_type: 'district',
          ar_title: district,
        },
      })

      if (!isExist) {
        // get ParentRegion Title
        const parentRegionTitle = areaList.find(
          (item: any) => item.District === district,
        )?.Region

        // Check region in DB
        const isRegionExist = await getArea({
          where: {
            ar_type: 'region',
            ar_title: parentRegionTitle,
          },
        })

        // If region not available, then don't insert
        if (!isRegionExist) {
          console.error(`${parentRegionTitle} is not available in database`)
          return
        } else {
          districtBulkObj.push({
            ar_title: district,
            ar_type: 'district',
            ar_parentId: isRegionExist.ar_id,
          })
        }
      }
    }
    const isDistrictCreated = await createBulkArea(districtBulkObj)

    // get List of unique circuit
    let uniqueCircuit = [
      ...new Set(areaList.map((item: any) => item.Circuit)),
    ].filter((item) => item !== 'N/A')

    const circuitBulkObj: any[] = []
    for (let index = 0; index < uniqueCircuit.length; index++) {
      const circuit: any = uniqueCircuit[index]

      // check circuit exstence in db
      const isExist = await getArea({
        where: {
          ar_type: 'circuit',
          ar_title: circuit,
        },
      })

      if (!isExist) {
        // get ParentCircuit Title
        const parentCircuitTitle = areaList.find(
          (item: any) => item.Circuit === circuit,
        )?.District

        // Check District in DB
        const isDistrictExist = await getArea({
          where: {
            ar_type: 'district',
            ar_title: parentCircuitTitle,
          },
        })

        // If region not available, then don't insert
        if (!isDistrictExist) {
          console.error(`${parentCircuitTitle} is not available in database`)
          return
        } else {
          circuitBulkObj.push({
            ar_title: circuit,
            ar_type: 'circuit',
            ar_parentId: isDistrictExist.ar_id,
          })
        }
      }
    }
    const isCircuitCreated = await createBulkArea(circuitBulkObj)

    return successResponse(res, { message: 'Area added successfully' })
  } catch (error) {
    console.log(error)
  }
}
