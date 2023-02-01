import { Router } from 'express'

import authRoute from './auth.route'
import teamMemberRoute from './adminTeam.route'
import schoolRoute from './school.route'
import teacherRoute from './teacher.route'
import freelanceTeacherRoute from './freelanceTeacher.route'
import gesAuthorityRoute from './authorityMember.route'
import schoolStaffRoute from './schoolStaff.route'
import areaRoute from './area.route'
import gesOfficeRoute from './gesOffice.route'
import gesOfficeStaffRoute from './gesOfficeStaff.route'
import contentRoute from './content.route'
import trainingProgramRoute from './trainingProgram.route'
import contentTeamRoute from './contenTeam.route'
import tutorRoute from './tutor.route'
import studentRoute from './student.route'
import classRoomRoute from './classRoom.route'
import bookRoute from './book.route'
import bookGenreroute from './bookGenre.route'
import contentCategoryRoute from './contentCategory.route'
import publisherRoute from './publisher.route'
import parentRoute from './parent.route'
import trainingParticipantsRoute from './trainingParticipants.route'
import { verifyToken } from '../../middleware/common/token.middleware'

const route = Router()

// Auth Route
route.use('/auth', authRoute)

// Team Member Route
route.use('/admin-team', teamMemberRoute)

// School Route
route.use('/school', [verifyToken], schoolRoute)

// Teacher Route
route.use('/teacher', [verifyToken], teacherRoute)

// Freelance-Teacher Route
route.use('/freelance-teacher', [verifyToken], freelanceTeacherRoute)

// Authority Member Route
route.use('/GES-Authority', [verifyToken], gesAuthorityRoute)

// School-staff Route
route.use('/school-staff', [verifyToken], schoolStaffRoute)

// Manage Areas Route
route.use('/area', [verifyToken], areaRoute)

// GesOffice Route
route.use('/GES-Office', [verifyToken], gesOfficeRoute)

// GesOfficeStaff Route
route.use('/GES-OfficeStaff', [verifyToken], gesOfficeStaffRoute)

// Content Route
route.use('/content', [verifyToken], contentRoute)

// Training Program Route
route.use('/training-program', [verifyToken], trainingProgramRoute)

// Content Team Route
route.use('/content-team', [verifyToken], contentTeamRoute)

// Tutor Management Route
route.use('/tutor', [verifyToken], tutorRoute)

// Student Route
route.use('/student', [verifyToken], studentRoute)

//  ClassRoom Route
route.use('/classroom', [verifyToken], classRoomRoute)

// Book Route
route.use('/book', [verifyToken], bookRoute)

// bookGenre  Route
route.use('/bookGenre', [verifyToken], bookGenreroute)

// contentCategory Route
route.use('/contentCategory', [verifyToken], contentCategoryRoute)

// publisher Route
route.use('/publisher', [verifyToken], publisherRoute)

// publisher Route
route.use('/parent', [verifyToken], parentRoute)

// Assignment Route
route.use('/training-participants', [verifyToken], trainingParticipantsRoute)

export default route
