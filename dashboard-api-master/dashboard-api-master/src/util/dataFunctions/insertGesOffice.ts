import { readJsonFile } from './convertCsvToJson'
import { Request, Response } from 'express'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../apiResponse'
import { kt_GESOfficeCreationAttributes as GesCreationAttributes } from '../../db/model/kt_GESOffice'
import { separateString } from '../common'
import { gesOfficeService } from '../../db/services'

export const insertgesCircuitOffice = async (req: Request, res: Response) => {
  try {
    const gesOfficeCircuitListFromCsv = await readJsonFile('CircuitOffice.csv')

    // Processing an list as per DB  Requirements
    let existCircuitOfficeList: string[] = []
    let createCircuitOfficeList: string | any[] = []

    for (let index = 0; index < gesOfficeCircuitListFromCsv.length; index++) {
      const circuitOffice = gesOfficeCircuitListFromCsv[index]
      const circuitOfficeFullName = `${circuitOffice['First Name']} ${circuitOffice['Second Name']}`

      // check the circuitofficeMember is already exist in database
      const isOfficeMember = await gesOfficeService.getGESOffice({
        where: {
          go_email: circuitOffice['Contact email'],
        },
      })
      if (isOfficeMember) {
        existCircuitOfficeList.push(circuitOfficeFullName)
      } else {
        const gesCircuiteOfficeObj: GesCreationAttributes = {
          go_region: circuitOffice['Region'] as string | any,
          go_district: circuitOffice['District'] as string | any,
          go_circuit: circuitOffice['Circuit'] as string | any,
          go_town: circuitOffice['Town'] as string | any,
          go_address: circuitOffice['Address'] as string | any,
          go_latitude: circuitOffice['Latitude'] as string | any,
          go_longitude: circuitOffice['Longitude'] as string | any,
          go_circuitHeadName: circuitOfficeFullName as string | any,
          go_phoneNumber:
            circuitOffice['Contact Number'] === ''
              ? null
              : circuitOffice['Contact Number'].length === 12
              ? 0 +
                (separateString(circuitOffice['Contact Number'], 3) as
                  | string
                  | any)
              : (separateString(circuitOffice['Contact Number'], 3) as
                  | string
                  | any),
          go_email: circuitOffice['Contact email'] as string | any,
          go_description: circuitOffice['Description'] as string | any,
          go_countryCode: separateString(
            circuitOffice['Contact Number'],
            0,
            3,
          ) as number | undefined,
        }

        // create a new circuitOffice from csv file
        const circuitOfficeCreated = await gesOfficeService.createGESOffice(
          gesCircuiteOfficeObj,
        )
        if (circuitOfficeCreated) {
          createCircuitOfficeList.push(circuitOfficeFullName)
        } else {
          existCircuitOfficeList.push(circuitOfficeFullName)
        }
      }
    }

    return successResponse(res, {
      message: 'circuitOffice Added Successfully',
      data: {
        createCircuitOfficeList,
        existCircuitOfficeList,
      },
    })
  } catch (error) {
    console.log(error)
    return internalServerErrorResponse(res, {
      message: 'Error in circuitOffice insertion',
      error,
    })
  }
}

export const insertgesDistrictOffice = async (req: Request, res: Response) => {
  try {
    const gesOfficeDistrictListFromCsv = await readJsonFile(
      'DistrictOffice.csv',
    )

    // Processing an list as per DB  Requirements
    let existDistrictOfficeList: string[] = []
    let createDistrictOfficeList: string | any[] = []

    for (let j = 0; j < gesOfficeDistrictListFromCsv.length; j++) {
      const districtOffice = gesOfficeDistrictListFromCsv[j]
      const districtOfficeFullName = `${districtOffice['First Name']} ${districtOffice['Second Name']}`

      // check the officeMember is already exist in database
      const isOfficeMember = await gesOfficeService.getGESOffice({
        where: {
          go_email: districtOffice['Contact email'],
        },
      })

      if (isOfficeMember) {
        existDistrictOfficeList.push(districtOfficeFullName)
      } else {
        const gesDistrictOfficeObj: GesCreationAttributes = {
          go_region: districtOffice['Region'],
          go_district: districtOffice['District'] as string | any,
          go_town: districtOffice['Town'] as string | any,
          go_address: districtOffice['Address'] as string | any,
          go_latitude: districtOffice['Latitude'] as string | any,
          go_longitude: districtOffice['Longitude'] as string | any,
          go_directorName: districtOfficeFullName as string | any,
          go_phoneNumber:
            districtOffice['Contact Number'] === ''
              ? null
              : districtOffice['Contact Number'].length === 12
              ? 0 +
                (separateString(districtOffice['Contact Number'], 3) as
                  | string
                  | any)
              : (separateString(districtOffice['Contact Number'], 3) as
                  | string
                  | any),
          go_email: districtOffice['Contact email'] as string | any,
          go_description: districtOffice['Description'] as string | any,
          go_countryCode: separateString(
            districtOffice['Contact Number'],
            0,
            3,
          ) as number | undefined,
        }
        // create a new districtOffice from csv file
        const districtOfficeCreated = await gesOfficeService.createGESOffice(
          gesDistrictOfficeObj,
        )
        if (districtOfficeCreated) {
          createDistrictOfficeList.push(districtOfficeFullName)
        } else {
          existDistrictOfficeList.push(districtOfficeFullName)
        }
      }
    }

    return successResponse(res, {
      message: 'districtOffice Added Successfully',
      data: {
        createDistrictOfficeList,
        existDistrictOfficeList,
      },
    })
  } catch (error) {
    console.log(error)
    return internalServerErrorResponse(res, {
      message: 'Error in districtOffice insertion',
      error,
    })
  }
}

export const insertgesRegionOffice = async (req: Request, res: Response) => {
  try {
    const gesOfficeRegionListFromCsv = await readJsonFile('RegionOffice.csv')

    // Processing an list as per DB  Requirements
    let existRegionOfficeList: string[] = []
    let createRegionOfficeList: string | any[] = []

    for (let l = 0; l < gesOfficeRegionListFromCsv.length; l++) {
      const regionOffice = gesOfficeRegionListFromCsv[l]
      const regionOfficeFullName = `${regionOffice['First Name']} ${regionOffice['Second Name']}`

      // check the regionOfficeMember is already exist in database
      const isOfficeMember = await gesOfficeService.getGESOffice({
        where: {
          go_email: regionOffice['Contact email'],
        },
      })
      if (isOfficeMember) {
        existRegionOfficeList.push(regionOfficeFullName)
      } else {
        const gesRegionOfficeObj: GesCreationAttributes = {
          go_region: regionOffice['Region'],
          go_town: regionOffice['Town'] as string | any,
          go_address: regionOffice['Address'] as string | any,
          go_latitude: regionOffice['Latitude'] as string | any,
          go_longitude: regionOffice['Longitude'] as string | any,
          go_directorName: regionOfficeFullName as string | any,
          go_phoneNumber:
            regionOffice['Contact Number'] === ''
              ? null
              : regionOffice['Contact Number'].length === 12
              ? 0 +
                (separateString(regionOffice['Contact Number'], 3) as
                  | string
                  | any)
              : (separateString(regionOffice['Contact Number'], 3) as
                  | string
                  | any),
          go_email: regionOffice['Contact email'] as string | any,
          go_description: regionOffice['Description'] as string | any,
          go_countryCode: separateString(
            regionOffice['Contact Number'],
            0,
            3,
          ) as number | undefined,
        }
        // create a new regionOffice from csv file
        const regionOfficeCreated = await gesOfficeService.createGESOffice(
          gesRegionOfficeObj,
        )
        if (regionOfficeCreated) {
          createRegionOfficeList.push(regionOfficeFullName)
        } else {
          existRegionOfficeList.push(regionOfficeFullName)
        }
      }
    }

    return successResponse(res, {
      message: 'regionOffice Added Successfully',
      data: {
        createRegionOfficeList,
        existRegionOfficeList,
      },
    })
  } catch (error) {
    console.log(error)
    return internalServerErrorResponse(res, {
      message: 'Error in regionOffice insertion',
      error,
    })
  }
}
