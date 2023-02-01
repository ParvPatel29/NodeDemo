import { Router } from 'express'
import { verifyToken } from '../../middleware/common/token.middleware'

import authRoute from './auth.route'
import officeStaff from './officeStaff.route'
import studentRoute from './student.route'
import classRoomRoute from './classRoom.route'
import teacherRoute from './teacher.route'
import studentRemarkRoute from './studentRemark.route'
import questionRoute from './question.route'
import teacherLessonRoute from './teacherLesson.route'
import schoolRoute from './school.route'
import examRoute from './exam.route'
import examTimeTableRoute from './examTimetable.route'
import studentAttendanceRoute from './studentAttendance.route'
import notificationRoute from './notification.route'
import calenderRoute from './calender.route'
import termlySchemeRoute from './termlyScheme.route'
import yearlySchemeRoute from './yearlyScheme.route'
import weeklyLessonPlanRoute from './weeklyLessonPlan.route'
import liveSessionRoute from './liveSession.route'
import contentCategoryRoute from './contentCategory.route'
import assignmentRoute from './assignment.route'
import trainingParticipantsRoute from './trainingParticipants.route'
import pastPaperRoute from './pastPaper.route'
import pastQuestionPaper from './pastQuestionPaper.route'
import assignmentQuestionsRoute from './assignmentQuestions.route'
import sendMessageRoute from './sendMessage.route'

const route = Router()

// Auth Route
route.use('/auth', authRoute)

// OfficeStaff Route
route.use('/office-staff', [verifyToken], officeStaff)

// Student Route
route.use('/student', [verifyToken], studentRoute)

// ClassRoom Route
route.use('/classroom', [verifyToken], classRoomRoute)

// Teacher Route
route.use('/teacher', teacherRoute)

// StudentRemark Route
route.use('/studentremark', [verifyToken], studentRemarkRoute)

// Question Route
route.use('/question', [verifyToken], questionRoute)

// TeacherLesson Route
route.use('/lesson', [verifyToken], teacherLessonRoute)

// School Route
route.use('/schoolProfile', [verifyToken], schoolRoute)

// Exam Route
route.use('/exam', [verifyToken], examRoute)

// ExamTimeTable Route
route.use('/examTimeTable', [verifyToken], examTimeTableRoute)

// StudentAttendance
route.use('/studentAttendance', [verifyToken], studentAttendanceRoute)

// StudentAttendance
route.use('/notification', [verifyToken], notificationRoute)

// Event Calender
route.use('/event-calender', [verifyToken], calenderRoute)

// Termly Route
route.use('/termlyScheme', [verifyToken], termlySchemeRoute)

// Yearly Route
route.use('/yearlyScheme', [verifyToken], yearlySchemeRoute)

// WeeklyLessonPlan Route
route.use('/weeklyLessonPlan', [verifyToken], weeklyLessonPlanRoute)

// WeeklyLessonPlan Route
route.use('/liveSession', [verifyToken], liveSessionRoute)

// Send Message Route
route.use('/sendMessage', [verifyToken], sendMessageRoute)

// WeeklyLessonPlan Route
route.use('/contentCategory', [verifyToken], contentCategoryRoute)

// Assignment Route
route.use('/assignment', [verifyToken], assignmentRoute)

// AssignmentQuestions Route
route.use('/assignment-Questions', [verifyToken], assignmentQuestionsRoute)

// Assignment Route
route.use('/training-participants', [verifyToken], trainingParticipantsRoute)

// PastPaper Route
route.use('/pastPaper', [verifyToken], pastPaperRoute)

// PastQuestionPaper Route
route.use('/pastQuestionPaper', [verifyToken], pastQuestionPaper)


export default route
