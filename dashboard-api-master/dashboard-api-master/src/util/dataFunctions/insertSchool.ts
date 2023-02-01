import { readJsonFile } from './convertCsvToJson'
import { Request, Response } from 'express'
import { internalServerErrorResponse, successResponse } from '../apiResponse'
import { kt_schoolCreationAttributes as SchoolCreationAttributes } from '../../db/model/init-models'
import { encryptPassword } from '../encryptPassword'
import { generatePassword } from '../generatePassword'
import { schoolService } from '../../db/services'
import { separateString } from '../common'
export const insertSchool = async (req: Request, res: Response) => {
  try {
    const schoolListFromCSV = await readJsonFile('school.csv')

    // Processing an list as per DB Requirements
    let schoolExist: string[] = []
    let createdSchoolList: string[] = []

    for (let index = 0; index < schoolListFromCSV.length; index++) {
      const school = schoolListFromCSV[index]
      const isSchoolExist = await schoolService.getSchool({
        where: { sc_schoolName: school['Name of School'] },
      })
      const schoolFullName = `${school['First Name']} ${school['Last Name']}`

      if (isSchoolExist) {
        schoolExist.push(school['Name of School'])
      } else {
        const schoolObj: SchoolCreationAttributes = {
          sc_schoolName: school['Name of School'] as string,
          sc_schoolHeadName:
            school['First Name'] == '' || school['Last Name'] == ''
              ? 'schoolHeadName'
              : (schoolFullName as string | any),
          sc_password: encryptPassword(generatePassword()) as string,
          sc_address: school['Address'] as string,
          sc_town: school['Town'] as string,
          sc_latitude: school['Latitude'] as string,
          sc_longitude: school['Longitude'] as string,
          sc_schoolType: school['Category of School'] as string,
          sc_region: (school['Region'] === 'N/A'
            ? null
            : school['Region']) as string,
          sc_district: (school['District'] === 'N/A'
            ? null
            : school['District']) as string,
          sc_circuit: (school['Circuit'] === 'N/A'
            ? null
            : school['Circuit']) as string,
          sc_phoneNumber:
            school['Contact Number'] === ''
              ? null
              : school['Contact Number'].length === 12
              ? 0 +
                (separateString(school['Contact Number'], 3) as string | any)
              : (separateString(school['Contact Number'], 3) as string | any),
          sc_email: school['Contact Email'] as string,
          sc_noOfClassroom:
            school['Number of Classrooms'] === ''
              ? null
              : (school['Number of Classrooms'] as number | any),
          sc_boardingFacilities: (school['Boarding Facilities?'] ===
            'Y') as boolean,
          sc_sanitaryFacilities: (school['Sanitary Facilities?'] ===
            'Y') as boolean,
          sc_scienceLab: (school['Science or Technical Laboratory?'] ===
            'Y') as boolean,
          sc_assemblyHall: (school['Assembly Hall?'] === 'Y') as boolean,
          sc_libraryFacilities: (school['Library Facilities?'] ===
            'Y') as boolean,
          sc_diningFacilities: (school['Dining Facilities?'] ===
            'Y') as boolean,
          sc_schoolBus: (school['School Bus?'] === 'Y') as boolean,
          sc_sportingFacilities: (school['Sporting Facilities?'] ===
            'Y') as boolean,
          sc_staffAccommodation: (school['Staff Accommodation?'] ===
            'Y') as boolean,
          sc_description: school['Description'] as string,
        }
        const createdSchool = await schoolService.createSchool(schoolObj)
        if (createdSchool) {
          createdSchoolList.push(school['Name of School'])
        } else {
          schoolExist.push(school['Name of School'])
        }
      }
    }

    return successResponse(res, {
      message: 'School Added Successfully',
      data: {
        createdSchoolList,
        schoolExist,
      },
    })
  } catch (error: any) {
    console.log(error)
    return internalServerErrorResponse(res, {
      message: 'Error in school insertion',
      error,
    })
  }
}
